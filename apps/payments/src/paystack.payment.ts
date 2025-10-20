import axios from "axios";
import { PaymentServiceInterface } from "./payment.interface";
import { InternalServerErrorException } from "@nestjs/common";

export class PaystackPaymentService implements PaymentServiceInterface{
    async generatePaymentUrl(
        invoiceId: string,
        reference: string,
        currency: string,
        amount: number,
        email?: string,
        callback_url?: string
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
                    amountCharged: amount
                }
            }
            const initilizePaystackPayment =  await axios.post('https://api.paystack.co/transaction/initialize', body, {headers})
            console.log({initilizePaystackPayment: initilizePaystackPayment.data.data.authorization_url})
            return initilizePaystackPayment.data.data.authorization_url ;
        } catch (err) {
            console.log({err})
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