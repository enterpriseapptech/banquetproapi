import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCateringDto, UpdateCateringDto, CateringDto, CATERINGPATTERN, ManyCateringDto, ManyRequestCateringDto } from '@shared/contracts/catering';
import { CATERING_CLIENT } from '@shared/contracts';

@Injectable()
export class CateringService {
    constructor(
      @Inject(CATERING_CLIENT) private readonly cateringClient: ClientProxy
    ) { }

    create(createCateringDto: CreateCateringDto) {
        return this.cateringClient.send<CateringDto, CreateCateringDto>(CATERINGPATTERN.CREATE, createCateringDto)
    }

    findAll(limit: number, offset: number, serviceProvider?: string, city? : string, state?: string, country?: string) {
      return this.cateringClient.send<ManyCateringDto, ManyRequestCateringDto>(CATERINGPATTERN.FINDALL,
            {   limit,
                offset,
                serviceProvider,
                city,
                state,
                country,
            })
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
}
