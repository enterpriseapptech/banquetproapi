export interface NotificationInterface {
    type: 'EMAIL' | 'IN_APP' | 'SMS';
    recipientId: string;
    data: {
        subject?: string; // Email subject
        message: string;  // Email or in-app message content
        recipientEmail?: string; // Optional email
        url?: string;     // Optional link (e.g., for email verification)
    };
}
