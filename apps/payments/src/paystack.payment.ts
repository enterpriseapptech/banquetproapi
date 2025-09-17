import axios from "axios";
import { PaymentServiceInterface } from "./payment.interface";

export class PaystackPaymentService implements PaymentServiceInterface{
    async generatePaymentUrl(
        invoiceId: string,
        reference: string,
        currency: string,
        amount: number,
        email?: string,
    ): Promise<string> {
        const headers = {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
        };

        const body = {
            amount: amount * 100,
            email,
            currency,
            metadata: {
                invoiceId,
                reference,
                amountCharged: amount
            }
        }
        const initilizePaystackPayment =  await axios.post('https://api.paystack.co/transaction/initialize', body, {headers})
       return initilizePaystackPayment.data.data.authorization_url ;
    }

    async savePayment(): Promise<void> {
        return await Promise.resolve(); 
    }
}