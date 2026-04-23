export const PAYMENTPATTERN = {
    INITIATE: 'payment.initiate',
    FINDALL: 'payment.findAll',
    FINDBYID: 'payment.findOneById',
    CREATE: 'payment.create',
    UPDATE: 'payment.update',
    DELETE: 'payment.delete',
    // webhook-dispatched flows
    FAILED_PAYMENT: 'payment.failedPayment',
    WALLET_FUNDING: 'payment.walletFunding',
    SERVICE_REQUEST: 'payment.serviceRequest',
    PLATFORM_PAYMENTS: 'payment.platformPayments',
}

export const PAYMENTMETHODPATTERN = {
    FINDALL: 'paymentmethod.findAll',
    FINDBYID: 'paymentmethod.findOneById',
    CREATE: 'paymentmethod.create',
    UPDATE: 'paymentmethod.update',
    DELETE: 'paymentmethod.delete',
    PERMANENTDELETE: 'paymentmethod.permanentdelete'
}

export const DISPUTEPATTERN = {
    FINDALL: 'dispute.findAll',
    FINDBYID: 'dispute.findOneById',
    CREATE: 'dispute.create',
    UPDATE: 'dispute.update',
    RESOLVE: 'dispute.resolve',
    DELETE: 'dispute.delete',
}

export const INVOICEPATTERN = {
    FINDALL: 'invoice.findAll',
    FINDBYID: 'invoice.findOneById',
    CREATE: 'invoice.create',
    CREATESECONDINVOICE: 'invoice.createSecondInvoice',
    CREATESERVICESUBSCRIPTIONINVOICE: 'invoice.createServiceSubscriptionInvoice',
    BOOKINGGENERATE: 'invoice.bookingGenerate',
    UPDATE: 'invoice.update',
    DELETE: 'invoice.delete',
}

export const REFUNDPATTERN = {
    FINDALL: 'refund.findAll',
    FINDBYID: 'refund.findOneById',
    CREATE: 'refund.create',
    APPROVE: 'refund.approve',
    DECLINE: 'refund.decline',
    UPDATE: 'refund.update',
    DELETE: 'refund.delete',
}

export const WALLETPATTERN = {
    CREATE: 'wallet.create',              // internal: create wallet on user creation
    FINDBYUSERID: 'wallet.findByUserId',
    TOPUP: 'wallet.topup',               // create wallet-funding invoice + initiate payment
    PAYINVOICE: 'wallet.payInvoice',     // pay invoice from wallet balance
    TRANSACTIONS: 'wallet.transactions', // list wallet transactions
    PLATFORM_TRANSACTIONS: 'wallet.platformTransactions', // list platform wallet transactions (admin)
    RELEASEESCROW: 'wallet.releaseEscrow', // release held funds to SP on booking complete
}

export const WITHDRAWALPATTERN = {
    CREATE: 'withdrawal.create',
    FINDALL: 'withdrawal.findAll',
    FINDBYID: 'withdrawal.findOneById',
    UPDATE: 'withdrawal.update',
}

export const FEESPATTERN = {
    FINDALL: 'fees.findAll',
    FINDBYID: 'fees.findOneById',
    CREATE: 'fees.create',
    UPDATE: 'fees.update',
    DELETE: 'fees.delete',
}

export const FEATUREDPLANSPATTERN = {
    FINDALL: 'featuredplan.findAll',
    FINDBYID: 'featuredplan.findOneById',
    CREATE: 'featuredplan.create',
    UPDATE: 'featuredplan.update',
    DELETE: 'featuredplan.delete',
}

export const SUBSCRIPTIONPLANSPATTERN = {
    FINDALL: 'subscriptionplan.findAll',
    FINDBYID: 'subscriptionplan.findOneById',
    CREATE: 'subscriptionplan.create',
    UPDATE: 'subscriptionplan.update',
    DELETE: 'subscriptionplan.delete',
}

export const SUBSCRIPTIONPATTERN = {
    FINDALL: 'subscription.findAll',
    FINDBYID: 'subscription.findOneById',
    CREATE: 'subscription.create',
    UPDATE: 'subscription.update',
    DELETE: 'subscription.delete',
}
