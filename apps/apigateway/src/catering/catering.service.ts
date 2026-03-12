import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCateringDto, CreateServiceSubscriptionDto, UpdateCateringDto, CateringDto, CATERINGPATTERN, CATERINGSUBSCRIPTIONPATTERN, ManyCateringDto, ManyRequestCateringDto, ServiceSubscriptionDto } from '@shared/contracts/catering';
import { CATERING_CLIENT } from '@shared/contracts';

@Injectable()
export class CateringService {
    constructor(
      @Inject(CATERING_CLIENT) private readonly cateringClient: ClientProxy
    ) { }

    create(createCateringDto: CreateCateringDto) {
        return this.cateringClient.send<CateringDto, CreateCateringDto>(CATERINGPATTERN.CREATE, createCateringDto)
    }

    findAll(limit: number, offset: number, serviceProvider?: string, city? : string, state?: string, country?: string, search?: string) {
      return this.cateringClient.send<ManyCateringDto, ManyRequestCateringDto>(CATERINGPATTERN.FINDALL,
            {   limit,
                offset,
                serviceProvider,
                city,
                state,
                country,
                search
            })
    }

    
    findAllWithUnique(ids: string[]) {
        return this.cateringClient.send<CateringDto[], string[]>(CATERINGPATTERN.FINDALLBYUNIQUEEVENTCENTER,
            ids)
    }
    
    findOne(id: string) {
        return this.cateringClient.send<CateringDto, string>(CATERINGPATTERN.FINDONEBYID, id)
    }

    update(id: string, updateCateringDto: UpdateCateringDto) {
        return this.cateringClient.send<CateringDto, { id: string, updateCateringDto: UpdateCateringDto }>(CATERINGPATTERN.UPDATE, {
            id,
            updateCateringDto
        })
    }

    remove(id: string, updaterId: any) {
        return this.cateringClient.send<CateringDto, { id: string, updaterId: string }>(CATERINGPATTERN.DELETE, { id, updaterId })
    }

    createSubscription(dto: CreateServiceSubscriptionDto) {
        return this.cateringClient.send<ServiceSubscriptionDto, CreateServiceSubscriptionDto>(CATERINGSUBSCRIPTIONPATTERN.CREATE, dto);
    }

    findAllSubscriptions(limit: number, offset: number, serviceId?: string) {
        return this.cateringClient.send<{ count: number; docs: ServiceSubscriptionDto[] }, { limit: number; offset: number; serviceId?: string }>(CATERINGSUBSCRIPTIONPATTERN.FINDALL, { limit, offset, serviceId });
    }

    findOneSubscription(id: string) {
        return this.cateringClient.send<ServiceSubscriptionDto, string>(CATERINGSUBSCRIPTIONPATTERN.FINDBYID, id);
    }

    activateSubscriptionByInvoiceId(invoiceId: string) {
        return this.cateringClient.send<ServiceSubscriptionDto, string>(CATERINGSUBSCRIPTIONPATTERN.ACTIVATEBYINVOICEID, invoiceId);
    }
}
