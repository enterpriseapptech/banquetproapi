import { Injectable } from "@nestjs/common";
import { PaymentServiceInterface } from "./payment.interface";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";

@Injectable()
export class StripePaymentService implements PaymentServiceInterface{
    #stripeSecret: string

    constructor(private configService: ConfigService){
        this.#stripeSecret = this.configService.get<string>("STRIPE_SECRET")
    }

    async generatePaymentUrl(): Promise<string> {
        const stripe = new Stripe(this.#stripeSecret, {})
        const YOUR_DOMAIN = 'http://www.banquetpro.com';
        const session = await stripe.checkout.sessions.create({
            line_items: [
            {
                // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                price: '{{PRICE_ID}}',
                quantity: 1,
            },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success.html`,
            cancel_url: `${YOUR_DOMAIN}/cancel.html`,
        });
       return session.url 
    }

    async savePayment(): Promise<void> {
        return await Promise.resolve(); 
    }
}

