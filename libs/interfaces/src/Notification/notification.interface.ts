export interface NotificationInterface {
    type: 'EMAIL' | 'IN_APP' | 'SMS';
    data: {
        subject?: string; // Email subject
        message: string;  // Email or in-app message content
        templatePath?: string; // html template path
        recipientName?: string;
        recipientEmail?: string; // Optional email
        code?: string; 
        url?: string;     // Optional link (e.g., for email verification)
    };
}


