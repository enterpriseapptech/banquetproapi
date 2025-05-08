import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PAYMENT_CLIENT } from '@shared/contracts';
import { CreatePaymentDto, CreatePaymentMethodDto, PaymentDto, PaymentMethodDto, PAYMENTMETHODPATTERN, PAYMENTPATTERN, UpdatePaymentDto, UpdatePaymentMethodDto } from '@shared/contracts/payments';

@Injectable()
export class PaymentService {
    constructor(
        @Inject(PAYMENT_CLIENT) private readonly paymentClient: ClientProxy
    ) { }

    create(createPaymentDto: CreatePaymentDto) {
        return this.paymentClient.send<PaymentDto, CreatePaymentDto>(PAYMENTPATTERN.CREATE, createPaymentDto)
    }

    findAll(limit: number, offset: number, search?: string) {
        return this.paymentClient.send<{ count: number; docs: PaymentDto[] }, {limit: number, offset: number, search?: string}>(PAYMENTPATTERN.FINDALL, {limit, offset, search})
    }

    findOne(id: string) {
        return this.paymentClient.send<PaymentDto, string>(PAYMENTPATTERN.FINDBYID, id)
    }

    update(id: string, updatePaymentDto: UpdatePaymentDto) {
        return this.paymentClient.send<PaymentDto, { id: string, updatePaymentDto: UpdatePaymentDto }>(PAYMENTPATTERN.UPDATE, {
            id,
            updatePaymentDto
        })
    }

    read(id: string) {
        return this.paymentClient.send<PaymentDto, { id: string}>(PAYMENTPATTERN.UPDATE, { id})
    }

    readAll(userId: string) {
        return this.paymentClient.send<PaymentDto, {userId: string}>(PAYMENTPATTERN.UPDATE, {userId})
    }

    remove(id: string, updaterId: any) {
        return this.paymentClient.send<PaymentDto, { id: string, updaterId: string }>(PAYMENTPATTERN.DELETE, { id, updaterId })
    }

    permanentDelete(id: string) {
        return this.paymentClient.send<PaymentDto, { id: string}>(PAYMENTPATTERN.DELETE, { id})
    }
 
}

@Injectable()
export class PaymentMethodService {
    constructor(
        @Inject(PAYMENT_CLIENT) private readonly paymentMethodClient: ClientProxy
    ) { }

    create(createPaymentMethodDto: CreatePaymentMethodDto) {
        // upload to cloudinary here
        // createPaymentMethodDto.providerLogo = cloduinary.url
        return this.paymentMethodClient.send<PaymentMethodDto, CreatePaymentMethodDto>(PAYMENTMETHODPATTERN.CREATE, createPaymentMethodDto)
    }

    findAll(limit: number, offset: number, search?: string) {
        return this.paymentMethodClient.send<{ count: number; docs: PaymentMethodDto[] }, {limit: number, offset: number, search?: string}>(PAYMENTMETHODPATTERN.FINDALL, {limit, offset, search})
    }

    findOne(id: string) {
        return this.paymentMethodClient.send<PaymentMethodDto, string>(PAYMENTMETHODPATTERN.FINDBYID, id)
    }

    update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto) {
        return this.paymentMethodClient.send<PaymentMethodDto, { id: string, updatePaymentMethodDto: UpdatePaymentMethodDto }>(PAYMENTMETHODPATTERN.UPDATE, {
            id,
            updatePaymentMethodDto
        })
    }

    permanentDelete(id: string) {
        return this.paymentMethodClient.send<PaymentMethodDto, { id: string}>(PAYMENTMETHODPATTERN.PERMANENTDELETE, { id})
    }
}
