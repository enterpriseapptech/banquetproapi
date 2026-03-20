export const CACHE_KEYS = {

    // ─── Event Centers ────────────────────────────────────────────────────────
    EVENTCENTERS_ALL:       'eventcenters:all',
    EVENTCENTERS_BOOKMARKS: 'eventcenters:bookmarks',
    EVENTCENTER_UNIQUE:     'eventcenters:unique',
    EVENTCENTER_ONE:        (id: string) => `eventcenters:one:${id}`,

    // ─── Catering ─────────────────────────────────────────────────────────────
    CATERING_ALL:       'catering:all',
    CATERING_BOOKMARKS: 'catering:bookmarks',
    CATERING_UNIQUE:    'catering:unique',
    CATERING_ONE:       (id: string) => `catering:one:${id}`,

    // ─── Booking ──────────────────────────────────────────────────────────────
    BOOKINGS_ALL: 'bookings:all',
    BOOKING_ONE:  (id: string) => `bookings:one:${id}`,

    // ─── Request Quotes ───────────────────────────────────────────────────────
    REQUEST_QUOTES_ALL: 'request-quotes:all',
    REQUEST_QUOTE_ONE:  (id: string) => `request-quotes:one:${id}`,

    // ─── Time Slots ───────────────────────────────────────────────────────────
    TIMESLOTS_ALL: 'timeslots:all',
    TIMESLOT_ONE:  (id: string) => `timeslots:one:${id}`,

    // ─── Payments ─────────────────────────────────────────────────────────────
    PAYMENTS_ALL: 'payments:all',
    PAYMENT_ONE:  (id: string) => `payments:one:${id}`,

    // ─── Payment Methods ──────────────────────────────────────────────────────
    PAYMENT_METHODS_ALL: 'payment-methods:all',
    PAYMENT_METHOD_ONE:  (id: string) => `payment-methods:one:${id}`,

    // ─── Invoices ─────────────────────────────────────────────────────────────
    INVOICES_ALL: 'invoices:all',
    INVOICE_ONE:  (id: string) => `invoices:one:${id}`,

    // ─── Subscription Plans ───────────────────────────────────────────────────
    SUBSCRIPTION_PLANS_ALL: 'subscription-plans:all',
    SUBSCRIPTION_PLAN_ONE:  (id: string) => `subscription-plans:one:${id}`,

    // ─── Featured Plans ───────────────────────────────────────────────────────
    FEATURED_PLANS_ALL: 'featured-plans:all',
    FEATURED_PLAN_ONE:  (id: string) => `featured-plans:one:${id}`,

    // ─── Fees ─────────────────────────────────────────────────────────────────
    FEES_ALL: 'fees:all',
    FEE_ONE:  (id: string) => `fees:one:${id}`,

    // ─── Refunds ──────────────────────────────────────────────────────────────
    REFUNDS_ALL: 'refunds:all',
    REFUND_ONE:  (id: string) => `refunds:one:${id}`,

    // ─── Disputes ─────────────────────────────────────────────────────────────
    DISPUTES_ALL: 'disputes:all',
    DISPUTE_ONE:  (id: string) => `disputes:one:${id}`,

    // ─── Subscriptions ────────────────────────────────────────────────────────
    SUBSCRIPTIONS_ALL: 'subscriptions:all',
    SUBSCRIPTION_ONE:  (id: string) => `subscriptions:one:${id}`,

    // ─── Users ────────────────────────────────────────────────────────────────
    USERS_ALL:    'users:all',
    USERS_UNIQUE: 'users:unique',
    USER_ONE:     (id: string) => `users:one:${id}`,

    // ─── Notifications ────────────────────────────────────────────────────────
    NOTIFICATIONS_ALL: 'notifications:all',
    NOTIFICATION_ONE:  (id: string) => `notifications:one:${id}`,

    // ─── Reviews ──────────────────────────────────────────────────────────────
    REVIEWS_ALL: 'reviews:all',
    REVIEW_ONE:  (id: string) => `reviews:one:${id}`,

    // ─── Management: Countries ────────────────────────────────────────────────
    COUNTRIES_ALL: 'countries:all',
    COUNTRY_ONE:   (id: string) => `countries:one:${id}`,

    // ─── Management: States ───────────────────────────────────────────────────
    STATES_ALL:  'states:all',
    STATES_MANY: (countryId: string) => `states:many:${countryId}`,
    STATE_ONE:   (id: string) => `states:one:${id}`,

    // ─── Management: App Settings ─────────────────────────────────────────────
    APP_SETTINGS_ALL: 'app-settings:all',
    APP_SETTING_ONE:  (id: string) => `app-settings:one:${id}`,

} as const;
