import { Injectable } from "@nestjs/common";
import { PaymentServiceInterface } from "./payment.interface";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";
import { PaymentReason } from "@shared/contracts/payments";

@Injectable()
export class StripePaymentService implements PaymentServiceInterface{
    #stripeSecret: string

    constructor(private configService: ConfigService){
        this.#stripeSecret = this.configService.get<string>("STRIPE_SECRET")
    }

    async generatePaymentUrl(
        invoiceId: string,
        reference: string,
        currency: string,
        amount: number,
        paymentReason: PaymentReason,
        email?: string,
    ): Promise<string> {
        const stripe = new Stripe(this.#stripeSecret, {})

        const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100 , // ₦50 (in kobo)
        currency: currency.toLowerCase(),
        automatic_payment_methods: { enabled: true },
        receipt_email: email,
        metadata: {
            invoiceId,
            reference,
            amountCharged: amount,
            paymentReason
        }
        });

        return paymentIntent.client_secret;

    }

    async savePayment(): Promise<void> {
        return await Promise.resolve(); 
    }
}

