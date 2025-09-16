import { PaymentServiceInterface } from "./payment.interface";

export class StripePaymentService implements PaymentServiceInterface{
    async generatePaymentUrl(): Promise<string> {
       return '' 
    }

    async savePayment(): Promise<void> {
        return await Promise.resolve(); 
    }
}