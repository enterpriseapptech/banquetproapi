import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'apps/payments/database/database.service';
import { $Enums } from 'apps/payments/prisma/@prisma/payments';
import { Decimal } from '@prisma/client/runtime/library';
import {
    CreateWalletDto, Currency,
    PayInvoiceDto,  WalletTxReason,  WalletTxType, WalletType,
} from '@shared/contracts/payments';
import { WalletDto, WalletTransactionDto } from '@shared/contracts/payments';
import { InvoiceService } from './invoice.service';
import { DataWithCountDto, UserType } from '@shared/contracts/shared';
import { PrismaErrorHandler } from '@shared/contracts/prisma.error.handler';
import { Prisma } from 'apps/payments/prisma/@prisma/payments';

@Injectable()
export class WalletService {
    private readonly logger = new Logger(WalletService.name);

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly invoiceService: InvoiceService,
    ) { }

    // ─── Internal helpers ────────────────────────────────────────────────

    /** Fetch any wallet by id within an optional transaction */
    private async getWallet(walletId: string, prisma?: any) {
        const db = prisma ?? this.databaseService;
        const wallet = await db.wallet.findUnique({ where: { id: walletId } });
        if (!wallet) throw new NotFoundException('Wallet not found');
        return wallet;
    }

    /** Find or create the single PLATFORM wallet */
    async getPlatformWallet(prisma?: any) {
        const db = prisma ?? this.databaseService;
        let platform = await db.wallet.findFirst({ where: { type: $Enums.WalletType.PLATFORM } });
        if (!platform) {
            platform = await db.wallet.create({
                data: { type: $Enums.WalletType.PLATFORM, balance: new Decimal(0), currency: $Enums.Currency.NGN },
            });
            this.logger.log('Platform wallet created');
        }
        return platform;
    }

    /**
     * Low-level credit or debit within an active Prisma transaction.
     * Returns the WalletTransaction record.
     */
    private async creditOrDebit(
        prisma: any,
        walletId: string,
        walletBalance: Decimal,
        type: $Enums.WalletTxType,
        amount: Decimal,
        reason: $Enums.WalletTxReason,
        meta: { 
            invoiceId?: string; 
            paymentId?: string; 
            refundId?: string; 
            withdrawalId?: string; 
            description?: string
        } = {},
    ) {
       
        const balanceBefore = walletBalance;
        let balanceAfter: Decimal;

        if (type === $Enums.WalletTxType.CREDIT) {
            balanceAfter = balanceBefore.plus(amount);
        } else {
            balanceAfter = balanceBefore.minus(amount);
            if (balanceAfter.lt(0)) {
                throw new BadRequestException('Insufficient wallet balance');
            }
        }

        await prisma.wallet.update({
            where: { id: walletId },
            data: { balance: balanceAfter },
        });

        return prisma.walletTransaction.create({
            data: {
                walletId,
                type,
                reason,
                amount,
                balanceBefore,
                balanceAfter,
                description: meta.description,
                invoiceId: meta.invoiceId,
                paymentId: meta.paymentId,
                refundId: meta.refundId,
                withdrawalId: meta.withdrawalId,
            },
        });
    }

    // ─── Public operations ───────────────────────────────────────────────

    /** Create a USER wallet — called when a new CUSTOMER or SERVICE_PROVIDER is created */
    async create(dto: CreateWalletDto): Promise<WalletDto> {
        const existing = await this.databaseService.wallet.findUnique({ where: { userId: dto.userId } });
        if (existing) {
            this.logger.warn(`Wallet already exists for userId=${dto.userId}`);
            return this.mapToDto(existing);
        }

        const wallet = await this.databaseService.wallet.create({
            data: {
                userId: dto.userId,
                type: $Enums.WalletType.USER,
                balance: new Decimal(0),
                currency: (dto.currency as $Enums.Currency) ?? $Enums.Currency.NGN,
            },
        });
        this.logger.log(`Wallet created | walletId=${wallet.id} userId=${dto.userId}`);
        return this.mapToDto(wallet);
    }

    /** Get wallet for a user — creates one if it doesn't exist yet */
    async findorCreateWalletByUserId(userId: string, userType?: UserType, prisma?: DatabaseService): Promise<WalletDto> {
        const db = prisma ?? this.databaseService;
        // only providers or customers can have wallet
        if(userType !== UserType.SERVICE_PROVIDER && userType !== UserType.CUSTOMER){
            return null
        }

        let wallet = await db.wallet.findUnique({
            where: { userId },
        });

        if (!wallet) {
            this.logger.log(`No wallet found for userId=${userId} — creating one`);
            wallet = await db.wallet.create({
                data: {
                    userId,
                    type: $Enums.WalletType.USER,
                    balance: new Decimal(0),
                    currency: $Enums.Currency.NGN,
                },
            });
        }
        return this.mapToDto(wallet);
    }

        /** Get wallet for a user — creates one if it doesn't exist yet */
    async findWalletByUserId(userId: string, prisma?: DatabaseService): Promise<WalletDto> {
        try {
            const db = prisma ?? this.databaseService;
            const wallet = await db.wallet.findUnique({
                where: { userId },
            });

            return this.mapToDto(wallet); 
        } catch (error) {
            return null
        }
        
    }


    /** List transactions for the platform wallet (admin use) */
    async getPlatformTransactions(limit: number, offset: number): Promise<DataWithCountDto<WalletTransactionDto>> {
        try {
            const platformWallet = await this.getPlatformWallet();
            const [txs, count] = await this.databaseService.$transaction([
                this.databaseService.walletTransaction.findMany({
                    where: { walletId: platformWallet.id },
                    orderBy: { createdAt: 'desc' },
                    take: limit,
                    skip: offset,
                }),
                this.databaseService.walletTransaction.count({ where: { walletId: platformWallet.id } }),
            ]);
            return { count, data: txs.map(t => this.mapToTxDto(t)) };
        } catch (error: any) {
            PrismaErrorHandler.handle(error, Prisma);
            this.logger.error({
                message: `Failed to fetch platform transactions with limit=${limit} offset=${offset}`,
                ...error,
            });
            return { count: 0, data: [] };
        }
    }

    /** List wallet transactions for a user */
    async getTransactionsByUserId(userId: string, limit: number, offset: number, prisma?: DatabaseService): Promise<DataWithCountDto<WalletTransactionDto>> {
        try {
            const db = prisma ?? this.databaseService;
            const [txs, count] = await db.$transaction([
                db.walletTransaction.findMany({
                    where: {wallet: {
                        userId: userId,
                        },
                    },
                        orderBy: { createdAt: 'desc' },
                        take: limit,
                        skip: offset,
                }),
                db.walletTransaction.count({ where: { wallet: {
                        userId: userId,
                    }, } }),
            ]);

            return { count, data: txs.map(t => this.mapToTxDto(t)) };
       } catch (error: any) {
          PrismaErrorHandler.handle(error, Prisma)
          this.logger.log({
            message: `An error occurred while getting user ${userId} transactions with limit ${limit} and offset ${offset}`,
            ...error
          })
          return { count: 0, data: []};
       }
        
    }



    /**
     * Apply wallet funds to an invoice via wallet transactions only (no Payment record).
     * Debits the customer wallet, credits service charge to platform, credits SP or holds in escrow.
     * Must be called inside an active Prisma transaction.
     */
    async applyToBookingInvoice(
        prisma: any,
        invoice: any,
        creditedAmount: Decimal,
    ): Promise<{ invoiceStatus: string }> {
        const remaining = await this.invoiceService.calculateRemainingAmount(invoice.id, prisma);

        if (remaining.lte(0)) {
            this.logger.log(`Invoice already fully paid | invoiceId=${invoice.id}`);
            return { invoiceStatus: 'PAID' };
        }

        // Apply the lesser of what was credited and what remains
        const applyAmount = creditedAmount.gt(remaining) ? remaining : creditedAmount;

        // Check actual wallet balance after the credit
        const customerWallet = await this.findWalletByUserId(invoice.userId, prisma);
        const walletBalance = new Decimal(customerWallet.balance);
        const actualApply = walletBalance.lt(applyAmount) ? walletBalance : applyAmount;

        if (actualApply.lte(0)) {
            this.logger.warn(`Insufficient wallet balance to apply to invoice | invoiceId=${invoice.id} userId=${invoice.userId}`);
            return { invoiceStatus: invoice.status };
        }

        const holdInEscrow = process.env.HOLD_PAYMENT_IN_ESCROW_WALLET === 'true';

        // Service charge is always paid in full
        const appliedServiceCharge = invoice.items.find((item) => item.item == "service charge").amount
        const spAmount = actualApply.minus(appliedServiceCharge);

        // Debit customer wallet (INVOICE_PAYMENT — source of truth for remaining amount)
        await this.creditOrDebit(
            prisma, 
            customerWallet.id,
            walletBalance, 
            $Enums.WalletTxType.DEBIT,
            actualApply, 
            $Enums.WalletTxReason.INVOICE_PAYMENT,
            { invoiceId: invoice.id },
        );

        // Credit service charge to platform wallet
        const platformWallet = await this.getPlatformWallet(prisma);
        if (appliedServiceCharge.gt(0)) {
            await this.creditOrDebit(
                prisma, 
                platformWallet.id, 
                platformWallet.balance, 
                $Enums.WalletTxType.CREDIT,
                appliedServiceCharge, 
                $Enums.WalletTxReason.SERVICE_CHARGE,
                { invoiceId: invoice.id },
            );
        }

        // Distribute SP portion
        if (spAmount.gt(0)) {
            if (holdInEscrow) {
                await this.creditOrDebit(
                    prisma, 
                    platformWallet.id, 
                    platformWallet.balance, 
                    $Enums.WalletTxType.CREDIT,
                    spAmount, 
                    $Enums.WalletTxReason.ESCROW_HOLD,
                    { invoiceId: invoice.id },
                );
            } else if (invoice.serviceProviderId) {
                try {
                    const spWallet = await this.findorCreateWalletByUserId(invoice.serviceProviderId, UserType.SERVICE_PROVIDER, prisma);
                    await this.creditOrDebit(
                        prisma, 
                        spWallet.id, 
                        new Decimal(spWallet.balance), 
                        $Enums.WalletTxType.CREDIT,
                        spAmount, $Enums.WalletTxReason.ESCROW_RELEASE,
                        { invoiceId: invoice.id },
                    );
                } catch {
                    this.logger.warn(`SP wallet not found for ${invoice.serviceProviderId}, holding in platform`);
                    await this.creditOrDebit(
                        prisma, 
                        platformWallet.id, 
                        platformWallet.balance, 
                        $Enums.WalletTxType.CREDIT,
                        spAmount, 
                        $Enums.WalletTxReason.ESCROW_HOLD,
                        { invoiceId: invoice.id },
                    );
                }
            } else {
                await this.creditOrDebit(
                    prisma, 
                    platformWallet.id, 
                    platformWallet.balance, 
                    $Enums.WalletTxType.CREDIT,
                    spAmount, 
                    $Enums.WalletTxReason.ESCROW_HOLD,
                    { invoiceId: invoice.id },
                );
            }
        }

        // Determine new invoice status
        const newRemaining = remaining.minus(actualApply);
        let invoiceStatus: string;
        if (actualApply.gt(remaining)) {
            invoiceStatus = 'OVER_PAID';
        } else if (newRemaining.lte(0)) {
            invoiceStatus = 'PAID';
        } else {
            invoiceStatus = 'PARTIALLY_PAID';
        }

        await prisma.invoice.update({
            where: { id: invoice.id },
            data: { status: invoiceStatus as any },
        });

        this.logger.log(`Invoice payment applied via wallet | invoiceId=${invoice.id} applied=${actualApply} status=${invoiceStatus}`);
        return { invoiceStatus };
    }


        /**
     * Apply wallet funds to an invoice via wallet transactions only (no Payment record).
     * Debits the customer wallet, credits service charge to platform, credits SP or holds in escrow.
     * Must be called inside an active Prisma transaction.
     */
    async applyToSubscriptionInvoice(
        prisma: any,
        invoice: any,
    ): Promise<{ invoiceStatus: string }> {

        const remaining = await this.invoiceService.calculateRemainingAmount(invoice.id, prisma);

        if (remaining.lte(0) || Number(remaining) <= 0) {
            this.logger.log(`Invoice already fully paid | invoiceId=${invoice.id}`);
            return { invoiceStatus: 'PAID' };
        }

        const serviceProviderWallet = await this.findWalletByUserId(invoice.userId, prisma);
        const platformWallet = await this.getPlatformWallet(prisma);

        const walletBalance = new Decimal(serviceProviderWallet.balance);

        //Single clamp: what we can actually apply
        const amountToApply = Decimal.min(remaining, walletBalance);

        if (amountToApply.lte(0)) {
            this.logger.warn(
                `Nothing to apply in apply to subscription invoice| 
                invoiceId=${invoice.id} userId=${invoice.userId}`
            );
            return { invoiceStatus: invoice.status };
        }

        // Move money
        await this.creditOrDebit(
            prisma,
            serviceProviderWallet.id,
            walletBalance,
            $Enums.WalletTxType.DEBIT,
            amountToApply,
            $Enums.WalletTxReason.INVOICE_PAYMENT,
            { invoiceId: invoice.id },
        );

        await this.creditOrDebit(
            prisma,
            platformWallet.id,
            platformWallet.balance,
            $Enums.WalletTxType.CREDIT,
            amountToApply,
            $Enums.WalletTxReason.INVOICE_PAYMENT,
            { invoiceId: invoice.id },
        );

        // Determine status
        const newRemaining = remaining.minus(amountToApply);

        const invoiceStatus =
            newRemaining.lte(0) ? 'PAID' : 'PARTIALLY_PAID';

        await prisma.invoice.update({
            where: { id: invoice.id },
            data: { status: invoiceStatus as any },
        });

        this.logger.log(
            `Invoice payment applied in applyToSubscriptionInvoice |
             invoiceId=${invoice.id} 
             amount=${amountToApply} 
             status=${invoiceStatus}`
        );

        return { invoiceStatus };
    }

    /** Credit a wallet */
    async creditWallet(userId: string, amount: number, reason: $Enums.WalletTxReason,
         paymentId: string, prisma?: Prisma.TransactionClient): Promise<WalletTransactionDto> {
        const db = prisma ?? this.databaseService
        const wallet = await db.wallet.findUnique({
            where:{
                userId
            }
        })
        
        const tx = await this.creditOrDebit(
                                prisma, 
                                wallet.id, 
                                wallet.balance, 
                                $Enums.WalletTxType.CREDIT,
                                new Decimal(amount), 
                                reason, 
                                { paymentId },
                            );

        this.logger.log(`Wallet credited | walletId=${wallet.id} amount=${amount} reason=${reason}`);
        return this.mapToTxDto(tx);
    }

    /** debit a wallet */
    async debitWallet(userId: string, amount: number, reason: $Enums.WalletTxReason,
         paymentId: string, prisma?: Prisma.TransactionClient): Promise<WalletTransactionDto> {
        const db = prisma ?? this.databaseService
        const wallet = await db.wallet.findUnique({
            where:{
                userId
            }
        })
        
        const tx = await this.creditOrDebit(
                                prisma, 
                                wallet.id, 
                                wallet.balance, 
                                $Enums.WalletTxType.DEBIT,
                                new Decimal(amount), 
                                reason, 
                                { paymentId },
                            );

        this.logger.log(`Wallet credited | walletId=${wallet.id} amount=${amount} reason=${reason}`);
        return this.mapToTxDto(tx);
    }
    /**
     * Pay an invoice directly from the customer's wallet balance.
     * Distributes funds via wallet transactions (service charge → platform, SP/escrow).
     */
    async payInvoice(dto: PayInvoiceDto): Promise<{ invoiceId: string; invoiceStatus: string }> {
        const invoice = await this.databaseService.invoice.findUnique({ where: { id: dto.invoiceId } });
        if (!invoice) throw new NotFoundException('Invoice not found');

        if (invoice.userId !== dto.userId) {
            throw new BadRequestException('This invoice does not belong to you');
        }

        if (invoice.status === $Enums.InvoiceStatus.PAID) {
            throw new BadRequestException('This invoice has already been paid');
        }

        return this.databaseService.$transaction(async (prisma) => {
            const remaining = await this.invoiceService.calculateRemainingAmount(invoice.id, prisma);

            if (remaining.lte(0)) {
                throw new BadRequestException('This invoice has already been paid');
            }

            const { invoiceStatus } = await this.applyToBookingInvoice(prisma, invoice, remaining);

            this.logger.log(`Invoice paid via wallet | invoiceId=${dto.invoiceId} userId=${dto.userId}`);
            return { invoiceId: dto.invoiceId, invoiceStatus };
        });
    }

    /**
     * SERVICEREQUEST invoice payment distribution.
     *
     * Called after the customer wallet has already been credited (TOPUP).
     * Steps:
     *   1. Debit customer wallet for the invoice amount (INVOICE_PAYMENT)
     *   2. Credit platform with the service charge portion (SERVICE_CHARGE)
     *   3. Credit Service Provider wallet with the remainder, or hold on platform if escrow is enabled
     *      or SP wallet cannot be found (ESCROW_HOLD / ESCROW_RELEASE)
     *   4. Update invoice status (PAID / PARTIALLY_PAID / OVER_PAID)
     *
     * Must be called inside an active Prisma transaction.
     */
    async applyServiceRequestPayment(
        prisma: any,
        invoice: any,
        incomingAmount: Decimal,
    ): Promise<{ invoiceStatus: string }> {
        const invoiceRemaining = await this.invoiceService.calculateRemainingAmount(invoice.id, prisma);

        if (invoiceRemaining.lte(0)) {
            this.logger.log(`Service request invoice already fully paid | invoiceId=${invoice.id}`);
            return { invoiceStatus: 'PAID' };
        }

        // Never apply more than what is still owed on the invoice
        const amountToApply = incomingAmount.gt(invoiceRemaining) ? invoiceRemaining : incomingAmount;

        // Fetch live customer wallet balance (reflects the TOPUP that just completed)
        const customerWallet = await prisma.wallet.findUnique({ where: { userId: invoice.userId } });
        if (!customerWallet) throw new NotFoundException('Customer wallet not found');
        const customerBalance = new Decimal(customerWallet.balance);

        // Cannot debit more than the customer currently holds
        const effectiveDebit = customerBalance.lt(amountToApply) ? customerBalance : amountToApply;

        if (effectiveDebit.lte(0)) {
            this.logger.warn(`Insufficient balance for service request invoice | invoiceId=${invoice.id} userId=${invoice.userId}`);
            return { invoiceStatus: invoice.status };
        }

        // Safe service charge extraction — zero when item is absent
        const serviceChargeItem = (invoice.items as any[]).find((item: any) => item.item === 'service charge');
        const serviceChargeAmount = serviceChargeItem ? new Decimal(serviceChargeItem.amount) : new Decimal(0);
        const serviceProviderPortionAmount = effectiveDebit.minus(serviceChargeAmount);

        // Step 1 — Debit customer wallet
        await this.creditOrDebit(
            prisma,
            customerWallet.id,
            customerBalance,
            $Enums.WalletTxType.DEBIT,
            effectiveDebit,
            $Enums.WalletTxReason.INVOICE_PAYMENT,
            { invoiceId: invoice.id },
        );

        const platformWallet = await this.getPlatformWallet(prisma);
        let platformBalance = new Decimal(platformWallet.balance);

        // Step 2 — Credit service charge to platform
        if (serviceChargeAmount.gt(0)) {
            await this.creditOrDebit(
                prisma,
                platformWallet.id,
                platformBalance,
                $Enums.WalletTxType.CREDIT,
                serviceChargeAmount,
                $Enums.WalletTxReason.SERVICE_CHARGE,
                { invoiceId: invoice.id },
            );
            platformBalance = platformBalance.plus(serviceChargeAmount);
        }

        // Step 3 — Distribute SP portion
        if (serviceProviderPortionAmount.gt(0)) {
            const holdInEscrow = process.env.HOLD_PAYMENT_IN_ESCROW_WALLET === 'true';
            const hasServiceProvider = !!invoice.serviceProviderId;

            if (holdInEscrow || !hasServiceProvider) {
                await this.creditOrDebit(
                    prisma,
                    platformWallet.id,
                    platformBalance,
                    $Enums.WalletTxType.CREDIT,
                    serviceProviderPortionAmount,
                    $Enums.WalletTxReason.ESCROW_HOLD,
                    { invoiceId: invoice.id },
                );
            } else {
                try {
                    const spWallet = await this.findorCreateWalletByUserId(invoice.serviceProviderId, UserType.SERVICE_PROVIDER, prisma);
                    await this.creditOrDebit(
                        prisma,
                        spWallet.id,
                        new Decimal(spWallet.balance),
                        $Enums.WalletTxType.CREDIT,
                        serviceProviderPortionAmount,
                        $Enums.WalletTxReason.ESCROW_RELEASE,
                        { invoiceId: invoice.id },
                    );
                } catch {
                    this.logger.warn(`SP wallet not found for serviceProviderId=${invoice.serviceProviderId} — holding in platform escrow`);
                    await this.creditOrDebit(
                        prisma,
                        platformWallet.id,
                        platformBalance,
                        $Enums.WalletTxType.CREDIT,
                        serviceProviderPortionAmount,
                        $Enums.WalletTxReason.ESCROW_HOLD,
                        { invoiceId: invoice.id },
                    );
                }
            }
        }

        // Step 4 — Persist invoice status
        const newRemaining = invoiceRemaining.minus(effectiveDebit);
        let invoiceStatus: string;
        if (effectiveDebit.gt(invoiceRemaining)) {
            invoiceStatus = 'OVER_PAID';
        } else if (newRemaining.lte(0)) {
            invoiceStatus = 'PAID';
        } else {
            invoiceStatus = 'PARTIALLY_PAID';
        }

        await prisma.invoice.update({ where: { id: invoice.id }, data: { status: invoiceStatus as any } });
        this.logger.log(`Service request payment applied |
             invoiceId=${invoice.id} debit=${effectiveDebit}
              serviceCharge=${serviceChargeAmount} 
              spPortion=${serviceProviderPortionAmount} status=${invoiceStatus}`);
        return { invoiceStatus };
    }

    /**
     * Release escrowed funds to the SP — called when booking is marked COMPLETED.
     * Only runs when HOLD_PAYMENT_IN_ESCROW_WALLET=true.
     */
    // async releaseEscrow(dto: ReleaseEscrowDto): Promise<WalletTransactionDto> {
    //     if (process.env.HOLD_PAYMENT_IN_ESCROW_WALLET !== 'true') {
    //         throw new BadRequestException('Escrow is not enabled');
    //     }

    //     return this.databaseService.$transaction(async (prisma) => {
    //         // Find the ESCROW_HOLD transaction for this invoice on the platform wallet
    //         const escrowTx = await prisma.walletTransaction.findFirst({
    //             where: {
    //                 invoiceId: dto.invoiceId,
    //                 reason: $Enums.WalletTxReason.ESCROW_HOLD,
    //                 type: $Enums.WalletTxType.CREDIT,
    //             },
    //         });

    //         if (!escrowTx) {
    //             throw new NotFoundException('No escrow hold found for this invoice');
    //         }

    //         const alreadyReleased = await prisma.walletTransaction.findFirst({
    //             where: { invoiceId: dto.invoiceId, reason: $Enums.WalletTxReason.ESCROW_RELEASE },
    //         });

    //         if (alreadyReleased) {
    //             throw new BadRequestException('Escrow already released for this invoice');
    //         }

    //         const platformWallet = await this.getPlatformWallet(prisma);
    //         const spWallet = await this.findWalletByUserId(dto.serviceProviderId, prisma);
    //         const releaseAmount = new Decimal(escrowTx.amount);

    //         // Debit platform wallet
    //         await this.creditOrDebit(
    //             prisma, platformWallet.id, $Enums.WalletTxType.DEBIT,
    //             releaseAmount, $Enums.WalletTxReason.ESCROW_RELEASE,
    //             { invoiceId: dto.invoiceId },
    //         );

    //         // Credit SP wallet
    //         const spTx = await this.creditOrDebit(
    //             prisma, spWallet.id, $Enums.WalletTxType.CREDIT,
    //             releaseAmount, $Enums.WalletTxReason.ESCROW_RELEASE,
    //             { invoiceId: dto.invoiceId },
    //         );

    //         this.logger.log(`Escrow released | invoiceId=${dto.invoiceId} spUserId=${dto.serviceProviderId} amount=${releaseAmount}`);
    //         return this.mapToTxDto(spTx);
    //     });
    // }

  

    // ─── Mappers ────────────────────────────────────────────────────────

    mapToDto(wallet: any): WalletDto {
        return {
            ...wallet,
            balance: Number(wallet.balance),
            type: wallet.type as unknown as WalletType,
            currency: wallet.currency as unknown as Currency,
            transactions: wallet.transactions?.map((t: any) => this.mapToTxDto(t)),
        };
    }

    mapToTxDto(tx: any): WalletTransactionDto {
        return {
            ...tx,
            amount: Number(tx.amount),
            balanceBefore: Number(tx.balanceBefore),
            balanceAfter: Number(tx.balanceAfter),
            type: tx.type as unknown as WalletTxType,
            reason: tx.reason as unknown as WalletTxReason,
        };
    }
}
