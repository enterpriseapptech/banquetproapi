import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCateringDto, UpdateCateringDto, CateringDto, CATERINGPATTERN, CATERINGREFUNDPOLICYPATTERN, ManyCateringDto, ManyRequestCateringDto } from '@shared/contracts/catering';
import { RefundPolicyDto, UpsertRefundPolicyDto } from '@shared/contracts/payments';
import { CATERING_CLIENT } from '@shared/contracts';
import { UpdateServiceSubscriptionDto } from '@shared/contracts/shared';

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


    updateSubscription(updateServiceSubscriptionDto: UpdateServiceSubscriptionDto) {
        const { serviceId, subscriptionStatus, subscriptionPlanId, timeframe } = updateServiceSubscriptionDto;
        return this.cateringClient.emit<void, UpdateServiceSubscriptionDto>(CATERINGPATTERN.UPDATESUBSCRIPTION,
            {   serviceId,
                subscriptionStatus,
                subscriptionPlanId,
                timeframe,
            }
        );
    }

    upsertRefundPolicy(cateringId: string, dto: UpsertRefundPolicyDto) {
        return this.cateringClient.send<RefundPolicyDto, { cateringId: string } & UpsertRefundPolicyDto>(
            CATERINGREFUNDPOLICYPATTERN.UPSERT, { cateringId, ...dto },
        );
    }

    getRefundPolicy(cateringId: string) {
        return this.cateringClient.send<RefundPolicyDto | null, string>(
            CATERINGREFUNDPOLICYPATTERN.FINDBYSERVICEID, cateringId,
        );
    }
}
