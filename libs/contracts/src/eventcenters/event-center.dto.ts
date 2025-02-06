// import { confirmFieldDecorator } from '../../validations/confirm_field.decorator';
import { $Enums } from "@prisma/eventcenters";

export class EventCenterDto {
    id: string;
    service_provider_id: string;
    depositAmount: number;
    totalAmount: number;
    description?: string;
    pricingType: $Enums.PricingType;
    sittingCapacity: number;
    venueLayout?: string;
    amenities: string[];
    images: string[];
    termsOfUse: string;
    cancellationPolicy: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    postal: string;
    status: $Enums.ServiceStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deletedBy?: string;
}
