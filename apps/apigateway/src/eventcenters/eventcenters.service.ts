import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {  CreateEventCenterDto, CreateServiceSubscriptionDto, UpdateEventCenterDto, EventCenterDto, EVENTCENTERPATTERN, EVENTCENTERSUBSCRIPTIONPATTERN, ManyEventCentersDto, ManyRequestEventCenterDto, ServiceSubscriptionDto } from '@shared/contracts/eventcenters';
import { EVENT_CENTER_CLIENT } from '@shared/contracts';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class EventcentersService {
    constructor(
        @Inject(EVENT_CENTER_CLIENT) private readonly eventClient: ClientProxy,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    create(createEventcenterDto: CreateEventCenterDto) {
       return this.eventClient.send<EventCenterDto, CreateEventCenterDto>(EVENTCENTERPATTERN.CREATEEVENTCENTER, createEventcenterDto)
    }

    findAll(limit: number, offset: number, serviceProvider?: string, city? : string, location?: string, search?: string) {
        return this.eventClient.send<ManyEventCentersDto, ManyRequestEventCenterDto>(EVENTCENTERPATTERN.FINDALLEVENTCENTER,
            {   limit,
                offset,
                serviceProvider,
                city,
                location,
                search
            })
    }

    findAllWithUnique(ids: string[]) {
        return this.eventClient.send<EventCenterDto[], string[]>(EVENTCENTERPATTERN.FINDALLBYUNIQUEEVENTCENTER,
            ids)
    }

    

    findOne(id: string) {
        return this.eventClient.send<EventCenterDto, string>(EVENTCENTERPATTERN.FINDONEBYID, id)
    }

    update(id: string, updateEventcenterDto: UpdateEventCenterDto) {
        return this.eventClient.send<EventCenterDto, { id: string, updateEventcenterDto: UpdateEventCenterDto }>(EVENTCENTERPATTERN.UPDATEEVENTCENTER, {
            id,
            updateEventcenterDto
        })
    }

    remove(id: string, updaterId: any) {
        return this.eventClient.send<EventCenterDto, { id: string, updaterId: string }>(EVENTCENTERPATTERN.DELETEEVENTCENTER, { id, updaterId })
    }

    createSubscription(dto: CreateServiceSubscriptionDto) {
        return this.eventClient.send<ServiceSubscriptionDto, CreateServiceSubscriptionDto>(EVENTCENTERSUBSCRIPTIONPATTERN.CREATE, dto);
    }

    findAllSubscriptions(limit: number, offset: number, serviceId?: string) {
        return this.eventClient.send<{ count: number; docs: ServiceSubscriptionDto[] }, { limit: number; offset: number; serviceId?: string }>(EVENTCENTERSUBSCRIPTIONPATTERN.FINDALL, { limit, offset, serviceId });
    }

    findOneSubscription(id: string) {
        return this.eventClient.send<ServiceSubscriptionDto, string>(EVENTCENTERSUBSCRIPTIONPATTERN.FINDBYID, id);
    }

    activateSubscriptionByInvoiceId(invoiceId: string) {
        return this.eventClient.send<ServiceSubscriptionDto, string>(EVENTCENTERSUBSCRIPTIONPATTERN.ACTIVATEBYINVOICEID, invoiceId);
    }
}
