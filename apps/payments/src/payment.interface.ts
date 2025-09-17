export interface PaymentServiceInterface {
    generatePaymentUrl(
        invoiceId: string,
        reference: string,
        currency: string,
        amount: number,
        email?: string,
    ): Promise<string> // payment url
    savePayment(): Promise<void>
}