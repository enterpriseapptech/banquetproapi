export interface PaymentServiceInterface {
    generatePaymentUrl(): Promise<string> // payment url
    savePayment(): Promise<void>
}