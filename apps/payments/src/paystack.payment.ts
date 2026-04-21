import axios from "axios";
import { PaymentServiceInterface } from "./payment.interface";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { PaymentReason } from "@shared/contracts/payments";

export class PaystackPaymentService implements PaymentServiceInterface{
    private readonly logger = new Logger(PaystackPaymentService.name);

    async generatePaymentUrl(
        invoiceId: string,
        reference: string,
        currency: string,
        amount: number,
        paymentReason: PaymentReason,
        email?: string,
        callback_url?: string,
        userId?: string,
    ): Promise<string> {
        try {
            const headers = {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
            };

            const body = {
                amount: amount * 100,
                email,
                currency,
                callback_url, // where Paystack redirects after payment
                metadata: {
                    invoiceId,
                    reference,
                    amountCharged: amount,
                    paymentReason,
                    userId,
                }
            }
            const initilizePaystackPayment =  await axios.post('https://api.paystack.co/transaction/initialize', body, {headers})
            this.logger.log(`Paystack payment URL generated | invoiceId=${invoiceId} ref=${reference} amount=${amount} ${currency}`);
            return initilizePaystackPayment.data.data.authorization_url ;
        } catch (err) {
            this.logger.error(`Paystack payment initiation failed | invoiceId=${invoiceId} ref=${reference} | ${err?.message}`);
            throw new InternalServerErrorException({
                statusCode: err.response.status || 500,
                message: `${err.response.statusText}: ${err.message }`|| "Internal Server Error from Paystack",
                error: err.response.error || "Sever error",
            });
        }
        
    }

    async savePayment(): Promise<void> {
        return await Promise.resolve(); 
    }
}