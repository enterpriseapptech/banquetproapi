import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { $Enums, Prisma } from '../prisma/@prisma/payments';
import { UpdateFeeDto, UpdateSubscriptionPlanDto, FeaturedPlanDto, FeesDto, PaymentDto, SubscriptionPlanDto, CreateFeaturedPlanDto, CreateFeeDto, CreatePaymentDto, CreateSubscriptionPlanDto, FeesType, PaymentReason, IPaymentStatus, Status, UpdatePaymentDto, CreatePaymentMethodDto, PaymentMethodDto, UpdatePaymentMethodDto, CreateInvoiceDto, InvoiceDto, InvoiceStatus, UpdateInvoiceDto, InvoiceItem, BillingAddress, CreateInvoiceDtoForSubscriptions, GeneratePaymentDto, PaymentGateWay } from '@shared/contracts/payments';
import { instanceToPlain } from 'class-transformer';
import { StripePaymentService } from './stripe.payment';
import { PaystackPaymentService } from './paystack.payment';



@Injectable()
export class PaymentsService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly stripePaymentService: StripePaymentService,
        private readonly paystackPaymentService: PaystackPaymentService
    ) { }

    async initiate(generatePaymentDto: GeneratePaymentDto): Promise<string>{
        try {
            const invoice = await this.databaseService.invoice.findUnique({where:{id: generatePaymentDto.invoiceId}})
            if(!invoice){
                throw new NotFoundException({
                    statusCode: 404,
                    message: "Invoice not found",
                    error: "Invoice not found",
                });
            }
            let paymentUrl:string;
            switch (generatePaymentDto.paymentGateWay) {
                case PaymentGateWay.stripe:
                    paymentUrl = await this.stripePaymentService.generatePaymentUrl(
                        invoice.id,
                        invoice.reference,
                        invoice.currency,
                        Number(invoice.amountDue)
                    );
                    break;

                case PaymentGateWay.paystack:
                    paymentUrl = await this.paystackPaymentService.generatePaymentUrl(
                        invoice.id,
                        invoice.reference,
                        invoice.currency,
                        Number(invoice.amountDue),
                        generatePaymentDto.email
                    );
                    break;
                default:
                    break;
            }

            return paymentUrl;
        } catch (error) {

            throw error
        }
        

    }

    async create(createPaymentDto: CreatePaymentDto): Promise<PaymentDto> {
        const newPaymentInput: Prisma.PaymentCreateInput = {
            userId: createPaymentDto.userId,
            paymentMethod: { connect: { id: createPaymentDto.paymentMethodId } },
            amount: createPaymentDto.amount,
            amountCharged: createPaymentDto.amount,
            reference: createPaymentDto.reference,
            paymentAuthorization: createPaymentDto.amount,
            currency: createPaymentDto.currency,
            paymentReason: createPaymentDto.paymentReason,
            status: createPaymentDto.status,
            transactionId: createPaymentDto.transactionId,
            invoice: {connect: {id: createPaymentDto.invoiceId}}
        }

        try {
            // Start a transaction - for an all or fail process of creating a user
            const payment = await this.databaseService.$transaction(async (prisma) => {

                // const invoice =  await prisma.invoice.findUnique({where: {id: createPaymentDto.invoiceId}});
                // const amountDue
                // Create the user
                const payment = await prisma.payment.create({ data: newPaymentInput });
                // update the invoice and also the corresponding service paid for
                return payment; 
            });

            return {
                ...payment,
                amount: Number(payment.amount),
                amountCharged: Number(payment.amountCharged),
                paymentReason: payment.paymentReason as unknown as PaymentReason,
                paymentAuthorization: payment.paymentAuthorization as Record<string, any>,
                status: payment.status as unknown as IPaymentStatus,
                paymentMethod: payment.paymentMethodId
            };

        } catch (error) {
            throw new InternalServerErrorException('sever error could not create payment', {
                cause: new Error(),
                description: 'payment creation failed, please try again'
            });
        }
    }

    async findAll(limit: number, offset: number): Promise<PaymentDto[]> {
        const fees = await this.databaseService.fees.findMany({
            take: limit,
            skip: offset,
            where: {
                deletedAt: null
            },
            orderBy: { name: "asc" },
        });

        return fees.map(fee => this.mapToPaymentDto(fee));;
    }

    async findOne(id: string): Promise<PaymentDto> {

        const payment = await this.databaseService.payment.findUnique({
            where: {
                id: id,
                deletedAt: null
            },
        });

        return {
            ...payment,
            amount: Number(payment.amount),
            amountCharged: Number(payment.amountCharged),
            paymentReason: payment.paymentReason as unknown as PaymentReason,
            paymentAuthorization: payment.paymentAuthorization as Record<string, any>,
            status: payment.status as unknown as IPaymentStatus,
            paymentMethod: payment.paymentMethodId
        };

    }

    async update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<PaymentDto> {
        try {
            const updatePaymentInput: Prisma.PaymentUpdateInput = {
                ...updatePaymentDto,
                paymentAuthorization: updatePaymentDto.paymentAuthorization ?? undefined,
            };

            const payment = await this.databaseService.payment.update({
                where: { id },
                data: updatePaymentInput
            });


            return {
                ...payment,
                amount: Number(payment.amount),
                amountCharged: Number(payment.amountCharged),
                paymentReason: payment.paymentReason as unknown as PaymentReason,
                paymentAuthorization: payment.paymentAuthorization as Record<string, any>,
                status: payment.status as unknown as IPaymentStatus,
                paymentMethod: payment.paymentMethodId
            };

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async remove(id: string, updaterId: string): Promise<PaymentDto> {

        const payment = await this.databaseService.$transaction(async (prisma) => {
            const deletedPayment = await prisma.payment.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    deletedBy: updaterId
                }
            });

            return deletedPayment
        });

        return {
            ...payment,
            amount: Number(payment.amount),
            amountCharged: Number(payment.amountCharged),
            paymentReason: payment.paymentReason as unknown as PaymentReason,
            paymentAuthorization: payment.paymentAuthorization as Record<string, any>,
            status: payment.status as unknown as IPaymentStatus,
            paymentMethod: payment.paymentMethodId
        };

    }

    async permanentDelete(id: string): Promise<PaymentDto> {

        const payment = await this.databaseService.$transaction(async (prisma) => {
            const deletedPayment = await prisma.payment.delete({
                where: { id },
            });
            return deletedPayment
        });

        return {
            ...payment,
            amount: Number(payment.amount),
            amountCharged: Number(payment.amountCharged),
            paymentReason: payment.paymentReason as unknown as PaymentReason,
            paymentAuthorization: payment.paymentAuthorization as Record<string, any>,
            status: payment.status as unknown as IPaymentStatus,
            paymentMethod: payment.paymentMethodId
        };
    }


    /**
     * 
     * Maps a raw event center from the database to EventCenterDto.
     */
    private mapToPaymentDto(payment: any): PaymentDto {
        return {
            ...payment,
            amount: Number(payment.amount),
            amountCharged: Number(payment.amountCharged),
            paymentReason: payment.paymentReason as unknown as PaymentReason,
            paymentAuthorization: payment.paymentAuthorization as Record<string, any>,
            status: payment.status as unknown as IPaymentStatus,
            paymentMethod: payment.paymentMethodId
        }
    }

}

@Injectable()
export class InvoiceService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    // used by created booking to make a first invoice for the booking
    async generate(createInvoiceDto: CreateInvoiceDto): Promise<InvoiceDto> {
        //  validate total
        if(!createInvoiceDto.items){
            throw new InternalServerErrorException('We could not generate invoice, as the items been paid for were not listed', {
                cause: new Error(),
                description: 'We could not generate invoice, as the items been paid for are not listed'
            });
        }

        let itemsTotal = 0;
        createInvoiceDto.items.map((item)=>{itemsTotal += item.amount})
        const discount = itemsTotal * (createInvoiceDto.discount /100)
        if((itemsTotal - discount) !== (createInvoiceDto.total)){
           throw new InternalServerErrorException(`We could not generate invoice, total amount is incorrect for the items. Should be ${itemsTotal - discount}`, {
                cause: new Error(),
                description: 'We could not generate invoice, total amount is incorrect for the items'
            }); 
        }
        const newInvoiceInput: Prisma.InvoiceCreateInput = {
            userId: createInvoiceDto.userId,
            reference: Math.random().toString(16).substring(2, 8),
            bookingId: createInvoiceDto.bookingId,
            items: instanceToPlain(createInvoiceDto.items ) as Prisma.JsonArray,
            amountDue: createInvoiceDto.amountDue,
            currency: createInvoiceDto.currency,
            dueDate: createInvoiceDto.dueDate,
            note: createInvoiceDto.note,
            billingAddress:  instanceToPlain(createInvoiceDto.billingAddress) as Prisma.JsonObject,
            status: "PENDING" as $Enums.InvoiceStatus,
        }

        try {
            // Start a transaction - for an all or fail process of creating a user
            const invoice = await this.databaseService.invoice.create({ data: newInvoiceInput });
            console.log({invoice})   
            return {
                ...invoice,
                items: instanceToPlain(invoice.items) as InvoiceItem[],
                billingAddress: instanceToPlain(invoice.billingAddress) as BillingAddress,
                amountDue: Number(invoice.amountDue),
                status: invoice.status as unknown as InvoiceStatus,
            };

        } catch (error:any) {
            throw error
        }
    }

    // this is used to create another invoice and the amount is to be determined by the service provider strictly
    async create(createInvoiceDto: CreateInvoiceDto): Promise<InvoiceDto> {

        // check invoices to replace if already paid for 
        await this.databaseService.$transaction(async (prisma) => {
            if(createInvoiceDto.replaceInvoice && createInvoiceDto.replaceInvoice.length > 0){
                const invoices = await prisma.invoice.findMany({
                    where: {
                        id: {
                            in: createInvoiceDto.replaceInvoice
                        },
                        status: $Enums.InvoiceStatus.PAID || $Enums.InvoiceStatus.PARTIALLY_PAID
                    }
                });

                if(invoices && invoices.length > 0){
                    throw new BadRequestException('One or More of the invoice you want to replace has been paid for and can not be replaced or deleted', {
                        cause: new Error(),
                        description: 'One or More of the invoice you want to replace has been paid for and can not be replaced or deleted'
                    });
                }
            }
        })
        
        //  validate total
        if(!createInvoiceDto.items){
            throw new InternalServerErrorException('We could not generate invoice, as the items been paid for were not listed', {
                cause: new Error(),
                description: 'We could not generate invoice, as the items been paid for are not listed'
            });
        }

        let itemsTotal = 0;
        createInvoiceDto.items.forEach((item)=>{itemsTotal += item.amount})
        const discount = itemsTotal * (createInvoiceDto.discount / 100)
        if((itemsTotal - discount) !== (createInvoiceDto.total)){
           throw new InternalServerErrorException(`We could not generate invoice, total amount is incorrect for the items. Should be ${itemsTotal - discount}`, {
                cause: new Error(),
                description: 'We could not generate invoice, total amount is incorrect for the items'
            }); 
        }

        const newInvoiceInput: Prisma.InvoiceCreateInput = {
            userId: createInvoiceDto.userId,
            reference: Math.random().toString(16).substring(2, 8),
            bookingId: createInvoiceDto.bookingId,
            items: instanceToPlain(createInvoiceDto.items ) as Prisma.JsonArray,
            amountDue: createInvoiceDto.amountDue,
            currency: createInvoiceDto.currency,
            dueDate: createInvoiceDto.dueDate,
            note: createInvoiceDto.note,
            billingAddress:  instanceToPlain(createInvoiceDto.billingAddress) as Prisma.JsonObject,
            status: "PENDING" as $Enums.InvoiceStatus,
        }

        try {
            // Start a transaction - for an all or fail process of creating a user
            const invoice = await this.databaseService.invoice.create({ data: newInvoiceInput });
            console.log({invoice})   
            return {
                ...invoice,
                items: instanceToPlain(invoice.items) as InvoiceItem[],
                billingAddress: instanceToPlain(invoice.billingAddress) as BillingAddress,
                amountDue: Number(invoice.amountDue),
                status: invoice.status as unknown as InvoiceStatus,
            };

        } catch (error:any) {
            throw error
        }
    }

    async createInvoiceForSubscriptions(createInvoiceDto: CreateInvoiceDtoForSubscriptions): Promise<InvoiceDto> {
        //  validate total
        if(!createInvoiceDto.items){
            throw new InternalServerErrorException('We could not generate invoice, as the items been paid for were not listed', {
                cause: new Error(),
                description: 'We could not generate invoice, as the items been paid for are not listed'
            });
        }

        let itemsTotal = 0;
        createInvoiceDto.items.map((item)=>{itemsTotal += item.amount})
        const discount = itemsTotal * (createInvoiceDto.discount /100)
        if((itemsTotal - discount) !== (createInvoiceDto.total)){
           throw new InternalServerErrorException(`We could not generate invoice, total amount is incorrect for the items. Should be ${itemsTotal - discount}`, {
                cause: new Error(),
                description: 'We could not generate invoice, total amount is incorrect for the items'
            }); 
        }
        const newInvoiceInput: Prisma.InvoiceCreateInput = {
            userId: createInvoiceDto.userId,
            reference: Math.random().toString(16).substring(2, 8),
            subscription: { connect: { id: createInvoiceDto.subscriptionId } },
            items: instanceToPlain(createInvoiceDto.items ) as Prisma.JsonArray,
            amountDue: createInvoiceDto.amountDue,
            currency: createInvoiceDto.currency,
            dueDate: createInvoiceDto.dueDate,
            billingAddress:  instanceToPlain(createInvoiceDto.billingAddress) as Prisma.JsonObject,
            status: $Enums.InvoiceStatus.PENDING
        }

        try {
            // Start a transaction - for an all or fail process of creating a user
            const invoice = await this.databaseService.invoice.create({ data: newInvoiceInput }); 
            return {
                ...invoice,
                items: instanceToPlain(invoice.items) as InvoiceItem[],
                billingAddress: instanceToPlain(invoice.billingAddress) as BillingAddress,
                amountDue: Number(invoice.amountDue),
                status: invoice.status as unknown as InvoiceStatus,
            };

        } catch (error:any) {
            throw error
        }
    }

    async findAll(
        limit: number, 
        offset: number, 
        subscriptionId?: string,
        bookingId?: string, 
        userId?: string, 
        status?: string, 
        currency?: string,
        deleted?: boolean): Promise<any> {
        // when deleted is undefined get all
        const whereClause:any = {}
        if(deleted === undefined) whereClause.deletedAt = undefined
        if(bookingId) whereClause.bookingId = bookingId
        if(userId) whereClause.userId = userId
        if(subscriptionId) whereClause.subscriptionId = subscriptionId
        if(currency) whereClause.currency = currency
        if(status) whereClause.status = status as $Enums.InvoiceStatus
        whereClause.deletedAt = deleted == true ? {not: null}: null

        const [invoices, total] = await this.databaseService.$transaction([
        this.databaseService.invoice.findMany({
            take: limit,
            skip: offset,
            where: whereClause,
            orderBy: { createdAt: 'asc' },
        }),
        this.databaseService.invoice.count({
            where: whereClause,
        }),
        ]);

        return {count: total, data: invoices.map(invoice => this.mapToInvoiceDto(invoice))};
    }

    async findOne(id: string): Promise<InvoiceDto> {

        const invoice = await this.databaseService.invoice.findUnique({
            where: {
                id: id,
                deletedAt: null
            },
            include: {
                payments: true,
                subscription: true

            }
        });

        return {
                ...invoice,
                items: instanceToPlain(invoice.items )as InvoiceItem[],
                billingAddress: instanceToPlain(invoice.billingAddress) as BillingAddress,
                amountDue: Number(invoice.amountDue),
                status: invoice.status as unknown as InvoiceStatus,
            };

    }

    async update(id: string, updateInvoiceDto: UpdateInvoiceDto): Promise<InvoiceDto> {
        try {
            const updateInvoiceInput: Prisma.InvoiceUpdateInput = {
                ...updateInvoiceDto,
                items: updateInvoiceDto.items ? updateInvoiceDto.items as unknown as Prisma.InputJsonValue[] : undefined,
                billingAddress: updateInvoiceDto.billingAddress ? updateInvoiceDto.billingAddress as unknown as Prisma.InputJsonValue : undefined

            };

            const invoice = await this.databaseService.invoice.update({
                where: { id },
                data: updateInvoiceInput
            });


            return {
                ...invoice,
                items: instanceToPlain(invoice.items) as InvoiceItem[],
                billingAddress: instanceToPlain(invoice.billingAddress) as BillingAddress,
                amountDue: Number(invoice.amountDue),
                status: invoice.status as unknown as InvoiceStatus,
            };


        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async remove(id: string, updaterId: string): Promise<InvoiceDto> {

        const invoice = await this.databaseService.$transaction(async (prisma) => {
            
            const invoices = await prisma.invoice.findUnique({
                where: {
                    id,
                    status: $Enums.InvoiceStatus.PAID || $Enums.InvoiceStatus.PARTIALLY_PAID
                }
            });

            if(invoices){
                throw new BadRequestException('The invoice you want to replace has been paid for and can not be replaced or deleted', {
                    cause: new Error(),
                    description: 'One or More of the invoice you want to replace has been paid for and can not be replaced or deleted'
                });
            }
            
            const deletedInvoice = await prisma.invoice.update({
                where: { id, status: { not : $Enums.InvoiceStatus.PAID || $Enums.InvoiceStatus.PARTIALLY_PAID }},
                data: {
                    deletedAt: new Date(),
                    deletedBy: updaterId
                }
            });

            return deletedInvoice
        });

        return {
            ...invoice,
            items: instanceToPlain(invoice.items) as InvoiceItem[],
            billingAddress: instanceToPlain(invoice.billingAddress) as BillingAddress,
            amountDue: Number(invoice.amountDue),
            status: invoice.status as unknown as InvoiceStatus,
        };

    }

    async permanentDelete(id: string): Promise<InvoiceDto> {

        const invoice = await this.databaseService.$transaction(async (prisma) => {
            const deletedInvoice = await prisma.invoice.delete({
                where: { id },
            });
            return deletedInvoice
        });

        return {
            ...invoice,
            items: instanceToPlain(invoice.items) as InvoiceItem[],
            billingAddress: instanceToPlain(invoice.billingAddress) as BillingAddress,
            amountDue: Number(invoice.amountDue),
            status: invoice.status as unknown as InvoiceStatus,
        };
    }


    /**
     * 
     * Maps a raw event center from the database to EventCenterDto.
     */
    private mapToInvoiceDto(invoice: any): InvoiceDto {
        return {
                ...invoice,
                items: instanceToPlain(invoice.items) as InvoiceItem[],
                billingAddress: instanceToPlain(invoice.billingAddress) as BillingAddress,
                amountDue: Number(invoice.amountDue),
                status: invoice.status as unknown as InvoiceStatus,
            };
    }

}

@Injectable()
export class PaymentMethodService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async create(createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethodDto> {
        const newPaymentMethodInput: Prisma.PaymentMethodCreateInput = {
            provider: createPaymentMethodDto.provider,
            createdBy: createPaymentMethodDto.createdBy,
            providerLogo: createPaymentMethodDto.providerLogoUrl,
            status: createPaymentMethodDto.status
        }

        try {
            // Start a transaction - for an all or fail process of creating a user
            const paymentMethod = await this.databaseService.$transaction(async (prisma) => {

                // Create the user
                const paymentMethod = await prisma.paymentMethod.create({ data: newPaymentMethodInput });
                return paymentMethod; // Return created user
            });

            return {
                ...paymentMethod,
                status: paymentMethod.status as unknown as Status
            };

        } catch (error) {
            throw new InternalServerErrorException('sever error could not create payment Method ', {
                cause: new Error(),
                description: 'payment Method creation failed, please try again'
            });
        }
    }

    async findAll(limit: number, offset: number): Promise<PaymentMethodDto[]> {
        const paymentMethods = await this.databaseService.paymentMethod.findMany({
            take: limit,
            skip: offset,
            where: {
                deletedAt: null
            },
            orderBy: { provider: "asc" },
        });

        return paymentMethods.map(paymentMethod => this.mapToPaymentMethod(paymentMethod));;
    }

    async findOne(id: string): Promise<PaymentMethodDto> {

        const paymentMethod = await this.databaseService.paymentMethod.findUnique({
            where: {
                id: id,
                deletedAt: null
            },
        });

        return {
            ...paymentMethod,
            status: paymentMethod.status as unknown as Status
        };

    }

    async update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<PaymentMethodDto> {
        try {
            const updatePaymentMethodInput: Prisma.PaymentMethodUpdateInput = {
                ...updatePaymentMethodDto
            };

            const paymentMethod = await this.databaseService.paymentMethod.update({
                where: { id },
                data: updatePaymentMethodInput
            });


            return {
                ...paymentMethod,
                status: paymentMethod.status as unknown as Status
            };

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async remove(id: string): Promise<PaymentMethodDto> {

        const paymentMethod = await this.databaseService.$transaction(async (prisma) => {
            const deletedFee = await prisma.paymentMethod.update({
                where: { id },
                data: {
                    deletedAt: new Date()
                }
            });

            return deletedFee
        });

        return {
            ...paymentMethod,
            status: paymentMethod.status as unknown as Status
        };

    }

    async permanentDelete(id: string): Promise<PaymentMethodDto> {

        const paymentMethod = await this.databaseService.$transaction(async (prisma) => {
            const deletedPaymentMethod = await prisma.paymentMethod.delete({
                where: { id },
            });
            return deletedPaymentMethod
        });

        return {
            ...paymentMethod,
            status: paymentMethod.status as unknown as Status
        };

    }



    /**
     * 
     * Maps a raw event center from the database to EventCenterDto.
     */
    private mapToPaymentMethod(paymentMethod: any): PaymentMethodDto {
        return {
            ...paymentMethod,
            status: paymentMethod.status as unknown as Status
        };
    }
}

@Injectable()
export class FeesService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async create(createFeeDto: CreateFeeDto): Promise<FeesDto> {
        const newUserInput: Prisma.FeesCreateInput = {
            name: createFeeDto.name as $Enums.FeesType,
            amount: createFeeDto.amount,
            status: createFeeDto.status
        }

        try {
            // Start a transaction - for an all or fail process of creating a user
            const fee = await this.databaseService.$transaction(async (prisma) => {

                // Create the user
                const fee = await prisma.fees.create({ data: newUserInput });
                return fee; // Return created user
            });

            return {
                ...fee,
                amount: Number(fee.amount),
                name: fee.name as unknown as FeesType,
                status: fee.status as unknown as Status
            };

        } catch (error) {
            throw new InternalServerErrorException('sever error could not create fee', {
                cause: new Error(),
                description: 'Fee creation failed, please try again'
            });
        }
    }

    async findAll(limit: number, offset: number): Promise<FeesDto[]> {
        const fees = await this.databaseService.fees.findMany({
            take: limit,
            skip: offset,
            where: {
                deletedAt: null
            },
            orderBy: { name: "asc" },
        });

        return fees.map(fee => this.mapToFeeDto(fee));;
    }

    async findOne(id: string): Promise<FeesDto> {

        const fees = await this.databaseService.fees.findUnique({
            where: {
                id: id,
                deletedAt: null
            },
        });

        return {
            ...fees,
            amount: Number(fees.amount),
            name: fees.name as unknown as FeesType,
            status: fees.status as unknown as Status
        };

    }

    async update(id: string, updateFeeDto: UpdateFeeDto): Promise<FeesDto> {
        try {
            const updateFeeInput: Prisma.FeesUpdateInput = {
                ...updateFeeDto
            };

            const fees = await this.databaseService.fees.update({
                where: { id },
                data: updateFeeInput
            });


            return {
                ...fees,
                amount: Number(fees.amount),
                name: fees.name as unknown as FeesType,
                status: fees.status as unknown as Status
            };

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async remove(id: string, updaterId: string): Promise<FeesDto> {

        const fees = await this.databaseService.$transaction(async (prisma) => {
            const deletedFee = await prisma.fees.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    deletedBy: updaterId
                }
            });

            return deletedFee
        });

        return {
            ...fees,
            amount: Number(fees.amount),
            name: fees.name as unknown as FeesType,
            status: fees.status as unknown as Status
        };

    }

    async permanentDelete(id: string): Promise<FeesDto> {

        const fees = await this.databaseService.$transaction(async (prisma) => {
            const deletedFee = await prisma.fees.delete({
                where: { id },
            });
            return deletedFee
        });

        return {
            ...fees,
            amount: Number(fees.amount),
            name: fees.name as unknown as FeesType,
            status: fees.status as unknown as Status
        };

    }


    /**
     * 
     * Maps a raw event center from the database to EventCenterDto.
     */
    private mapToFeeDto(fees: any): FeesDto {
        return {
            ...fees,
            amount: Number(fees.amount),
            name: fees.name as unknown as FeesType,
            status: fees.status as unknown as Status
        };
    }
}

@Injectable()
export class FeaturedPlanService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async create(createFeaturedPlanDto: CreateFeaturedPlanDto): Promise<FeaturedPlanDto> {
        const newUserInput: Prisma.FeaturedPlansCreateInput = {
            plan: createFeaturedPlanDto.plan,
            amount: createFeaturedPlanDto.amount,
            timeFrame: createFeaturedPlanDto.timeFrame,
            status: createFeaturedPlanDto.status
        }

        try {
            // Start a transaction - for an all or fail process of creating a user
            const featuredPlan = await this.databaseService.$transaction(async (prisma) => {

                // Create the user
                const featuredPlan = await prisma.featuredPlans.create({ data: newUserInput });
                return featuredPlan; // Return created user
            });

            return {
                ...featuredPlan,
                amount: Number(featuredPlan.amount),
                plan: featuredPlan.plan,
                status: featuredPlan.status as unknown as Status
            };

        } catch (error) {
            throw new InternalServerErrorException('sever error could not create fee', {
                cause: new Error(),
                description: 'Fee creation failed, please try again'
            });
        }
    }

    async findAll(limit: number, offset: number): Promise<FeaturedPlanDto[]> {
        const featuredPlans = await this.databaseService.featuredPlans.findMany({
            take: limit,
            skip: offset,
            where: {
                deletedAt: null
            },
            orderBy: { plan: "asc" },
        });

        return featuredPlans.map(fee => this.mapToFeaturedPlans(fee));;
    }

    async findOne(id: string): Promise<FeaturedPlanDto> {

        const featuredPlans = await this.databaseService.featuredPlans.findUnique({
            where: {
                id: id,
                deletedAt: null
            },
        });

        return {
            ...featuredPlans,
            amount: Number(featuredPlans.amount),
            status: featuredPlans.status as unknown as Status
        };

    }

    async update(id: string, updateFeeDto: UpdateFeeDto): Promise<FeaturedPlanDto> {
        try {
            const updateFeeInput: Prisma.FeaturedPlansUpdateInput = {
                ...updateFeeDto
            };

            const featuredPlans = await this.databaseService.featuredPlans.update({
                where: { id },
                data: updateFeeInput
            });


            return {
                ...featuredPlans,
                amount: Number(featuredPlans.amount),
                status: featuredPlans.status as unknown as Status
            };

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async remove(id: string, updaterId: string): Promise<FeaturedPlanDto> {

        const featuredPlans = await this.databaseService.$transaction(async (prisma) => {
            const deletedFee = await prisma.featuredPlans.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    deletedBy: updaterId
                }
            });

            return deletedFee
        });

        return {
            ...featuredPlans,
            amount: Number(featuredPlans.amount),
            status: featuredPlans.status as unknown as Status
        };

    }

    async permanentDelete(id: string): Promise<FeaturedPlanDto> {

        const featuredPlans = await this.databaseService.$transaction(async (prisma) => {
            const deletedFee = await prisma.featuredPlans.delete({
                where: { id },
            });
            return deletedFee
        });

        return {
            ...featuredPlans,
            amount: Number(featuredPlans.amount),
            status: featuredPlans.status as unknown as Status
        };

    }


    /**
   * 
   * Maps a raw event center from the database to EventCenterDto.
   */
    private mapToFeaturedPlans(featuredPlans: any): FeaturedPlanDto {
        return {
            ...featuredPlans,
            amount: Number(featuredPlans.amount),
            status: featuredPlans.status as unknown as Status
        };
    }
}

@Injectable()
export class SubscriptionPlansService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async create(createSubscriptionPlanDto: CreateSubscriptionPlanDto): Promise<SubscriptionPlanDto> {
        const newUserInput: Prisma.SubscriptionPlansCreateInput = {
            plan: createSubscriptionPlanDto.plan,
            amount: createSubscriptionPlanDto.amount,
            timeFrame: createSubscriptionPlanDto.timeFrame,
            status: createSubscriptionPlanDto.status
        }

        try {
            // Start a transaction - for an all or fail process of creating a user
            const featuredPlan = await this.databaseService.$transaction(async (prisma) => {

                // Create the user
                const featuredPlan = await prisma.subscriptionPlans.create({ data: newUserInput });
                return featuredPlan; // Return created user
            });

            return {
                ...featuredPlan,
                amount: Number(featuredPlan.amount),
                plan: featuredPlan.plan,
                status: featuredPlan.status as unknown as Status
            };

        } catch (error) {
            throw new InternalServerErrorException('sever error could not create fee', {
                cause: new Error(),
                description: 'Fee creation failed, please try again'
            });
        }
    }

    async findAll(limit: number, offset: number): Promise<SubscriptionPlanDto[]> {
        const featuredPlans = await this.databaseService.subscriptionPlans.findMany({
            take: limit,
            skip: offset,
            where: {
                deletedAt: null
            },
            orderBy: { plan: "asc" },
        });

        return featuredPlans.map(fee => this.mapToSubscriptionPlans(fee));;
    }

    async findOne(id: string): Promise<SubscriptionPlanDto> {

        const subscriptionPlans = await this.databaseService.subscriptionPlans.findUnique({
            where: {
                id: id,
                deletedAt: null
            },
        });

        return {
            ...subscriptionPlans,
            amount: Number(subscriptionPlans.amount),
            status: subscriptionPlans.status as unknown as Status
        };

    }

    async update(id: string, updateSubscriptionPlanDto: UpdateSubscriptionPlanDto): Promise<SubscriptionPlanDto> {
        try {
            const updateFeeInput: Prisma.SubscriptionPlansUpdateInput = {
                ...updateSubscriptionPlanDto
            };

            const subscriptionPlans = await this.databaseService.subscriptionPlans.update({
                where: { id },
                data: updateFeeInput
            });


            return {
                ...subscriptionPlans,
                amount: Number(subscriptionPlans.amount),
                status: subscriptionPlans.status as unknown as Status
            };

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async remove(id: string, updaterId: string): Promise<SubscriptionPlanDto> {

        const subscriptionPlans = await this.databaseService.$transaction(async (prisma) => {
            const deletedFee = await prisma.subscriptionPlans.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    deletedBy: updaterId
                }
            });

            return deletedFee
        });

        return {
            ...subscriptionPlans,
            amount: Number(subscriptionPlans.amount),
            status: subscriptionPlans.status as unknown as Status
        };

    }

    async permanentDelete(id: string): Promise<SubscriptionPlanDto> {

        const subscriptionPlans = await this.databaseService.$transaction(async (prisma) => {
            const deletedSubscriptionPlans = await prisma.subscriptionPlans.delete({
                where: { id },
            });
            return deletedSubscriptionPlans
        });

        return {
            ...subscriptionPlans,
            amount: Number(subscriptionPlans.amount),
            status: subscriptionPlans.status as unknown as Status
        };

    }


    /**
   * 
   * Maps a raw event center from the database to EventCenterDto.
   */
    private mapToSubscriptionPlans(featuredPlans: any): SubscriptionPlanDto {
        return {
            ...featuredPlans,
            amount: Number(featuredPlans.amount),
            status: featuredPlans.status as unknown as Status
        };
    }
}