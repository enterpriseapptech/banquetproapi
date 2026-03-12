export const PAYMENTPATTERN = {
    INITIATE: 'payment.initiate',
    FINDALL: 'payment.findAll',
    FINDBYID: 'payment.findOneById',
    CREATE: 'payment.create',
    UPDATE: 'payment.update',
    DELETE: 'payment.delete',
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
    UPDATE: 'refund.update',
    DELETE: 'refund.delete',
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