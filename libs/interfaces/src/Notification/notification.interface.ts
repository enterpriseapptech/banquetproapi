import { NotificationTemplateNames } from "@shared/contracts/shared";

export interface  NotificationData  {
        subject?: string;
        message: string;
        templatePath?: string;
        recipientId?: string;
        recipientName?: string;
        recipientEmail?: string;
        templateVariables?: Record<string, string>;
        templateName: NotificationTemplateNames,
};
export interface NotificationInterface {
    type: 'EMAIL' | 'IN_APP' | 'SMS';
    data: NotificationData
}


