/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'apps/payments/database/database.service';
import { $Enums } from 'apps/payments/prisma/@prisma/payments';
import { Decimal } from '@prisma/client/runtime/library';
import { CreateWithdrawalDto, Currency, UpdateWithdrawalDto, WithdrawalStatus } from '@shared/contracts/payments';
import { WithdrawalDto } from '@shared/contracts/payments';
import { WalletService } from './wallet.service';

@Injectable()
export class WithdrawalService {
    private readonly logger = new Logger(WithdrawalService.name);

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly walletService: WalletService,
    ) { }

    // // async create(dto: CreateWithdrawalDto): Promise<WithdrawalDto> {
    // //     return this.databaseService.$transaction(async (prisma) => {
    // //         const wallet = await this.walletService.findWalletByUserId(dto.userId, prisma);
    // //         const amount = new Decimal(dto.amount);

    // //         if (new Decimal(wallet.balance).lt(amount)) {
    // //             throw new BadRequestException('Insufficient wallet balance for withdrawal');
    // //         }

    // //         const reference = `WDR-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // //         const withdrawal = await prisma.withdrawal.create({
    // //             data: {
    // //                 walletId: wallet.id,
    // //                 userId: dto.userId,
    // //                 amount,
    // //                 currency: (dto.currency as $Enums.Currency) ?? $Enums.Currency.NGN,
    // //                 bankDetails: dto.bankDetails,
    // //                 status: $Enums.WithdrawalStatus.PENDING,
    // //                 reference,
    // //             },
    // //         });

    // //         // Debit wallet immediately (funds held pending payout)
    // //         await this.walletService.creditOrDebit(
    // //             prisma, wallet.id, $Enums.WalletTxType.DEBIT,
    // //             amount, $Enums.WalletTxReason.WITHDRAWAL,
    // //             { withdrawalId: withdrawal.id, description: `Withdrawal to bank account` },
    // //         );

    // //         this.logger.log(`Withdrawal created | withdrawalId=${withdrawal.id} userId=${dto.userId} amount=${amount}`);
    // //         return this.mapToDto(withdrawal);
    // //     });
    // // }

    // async findAll(limit: number, offset: number, userId?: string): Promise<{ count: number; docs: WithdrawalDto[] }> {
    //     const where: any = {};
    //     if (userId) where.userId = userId;

    //     const [withdrawals, count] = await this.databaseService.$transaction([
    //         this.databaseService.withdrawal.findMany({
    //             where, take: limit, skip: offset, orderBy: { createdAt: 'desc' },
    //         }),
    //         this.databaseService.withdrawal.count({ where }),
    //     ]);

    //     return { count, docs: withdrawals.map(w => this.mapToDto(w)) };
    // }

    // async findOne(id: string): Promise<WithdrawalDto> {
    //     const withdrawal = await this.databaseService.withdrawal.findUnique({ where: { id } });
    //     if (!withdrawal) throw new NotFoundException('Withdrawal not found');
    //     return this.mapToDto(withdrawal);
    // }

    // // async update(id: string, dto: UpdateWithdrawalDto): Promise<WithdrawalDto> {
    // //     return this.databaseService.$transaction(async (prisma) => {
    // //         const withdrawal = await prisma.withdrawal.findUnique({ where: { id } });
    // //         if (!withdrawal) throw new NotFoundException('Withdrawal not found');

    // //         // If withdrawal fails, refund back to wallet
    // //         if (dto.status === WithdrawalStatus.FAILED && withdrawal.status !== $Enums.WithdrawalStatus.FAILED) {
    // //             const wallet = await this.walletService.findWalletByUserId(withdrawal.userId, prisma);
    // //             await this.walletService.creditOrDebit(
    // //                 prisma, wallet.id, $Enums.WalletTxType.CREDIT,
    // //                 new Decimal(withdrawal.amount), $Enums.WalletTxReason.WITHDRAWAL,
    // //                 { withdrawalId: id, description: 'Withdrawal failed — funds returned' },
    // //             );
    // //             this.logger.warn(`Withdrawal failed, funds returned | withdrawalId=${id}`);
    // //         }

    // //         const updated = await prisma.withdrawal.update({
    // //             where: { id },
    // //             data: { status: dto.status as $Enums.WithdrawalStatus },
    // //         });

    // //         return this.mapToDto(updated);
    // //     });
    // // }

    // private mapToDto(w: any): WithdrawalDto {
    //     return {
    //         ...w,
    //         amount: Number(w.amount),
    //         currency: w.currency as unknown as Currency,
    //         status: w.status as unknown as WithdrawalStatus,
    //         bankDetails: w.bankDetails as Record<string, any>,
    //     };
    // }
}
