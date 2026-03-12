import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'apps/payments/database/database.service';
import { Prisma } from 'apps/payments/prisma/@prisma/payments';
import { FeaturedPlanDto, Status, UpdateFeeDto, CreateFeaturedPlanDto } from '@shared/contracts/payments';

@Injectable()
export class FeaturedPlanService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async create(createFeaturedPlanDto: CreateFeaturedPlanDto): Promise<FeaturedPlanDto> {
        const newUserInput: Prisma.FeaturedPlansCreateInput = {
            plan: createFeaturedPlanDto.plan,
            amount: createFeaturedPlanDto.amount,
            timeFrame: createFeaturedPlanDto.timeFrame,
            status: createFeaturedPlanDto.status
        }

        try {
            const featuredPlan = await this.databaseService.$transaction(async (prisma) => {
                const featuredPlan = await prisma.featuredPlans.create({ data: newUserInput });
                return featuredPlan;
            });

            return {
                ...featuredPlan,
                amount: Number(featuredPlan.amount),
                plan: featuredPlan.plan,
                status: featuredPlan.status as unknown as Status
            };

        } catch (error) {
            throw new InternalServerErrorException('sever error could not create fee', {
                cause: new Error(),
                description: 'Fee creation failed, please try again'
            });
        }
    }

    async findAll(limit: number, offset: number): Promise<FeaturedPlanDto[]> {
        const featuredPlans = await this.databaseService.featuredPlans.findMany({
            take: limit,
            skip: offset,
            where: { deletedAt: null },
            orderBy: { plan: "asc" },
        });

        return featuredPlans.map(fee => this.mapToFeaturedPlans(fee));
    }

    async findOne(id: string): Promise<FeaturedPlanDto> {
        const featuredPlans = await this.databaseService.featuredPlans.findUnique({
            where: { id: id, deletedAt: null },
        });

        return {
            ...featuredPlans,
            amount: Number(featuredPlans.amount),
            status: featuredPlans.status as unknown as Status
        };
    }

    async update(id: string, updateFeeDto: UpdateFeeDto): Promise<FeaturedPlanDto> {
        try {
            const updateFeeInput: Prisma.FeaturedPlansUpdateInput = { ...updateFeeDto };

            const featuredPlans = await this.databaseService.featuredPlans.update({
                where: { id },
                data: updateFeeInput
            });

            return {
                ...featuredPlans,
                amount: Number(featuredPlans.amount),
                status: featuredPlans.status as unknown as Status
            };

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async remove(id: string, updaterId: string): Promise<FeaturedPlanDto> {
        const featuredPlans = await this.databaseService.$transaction(async (prisma) => {
            const deletedFee = await prisma.featuredPlans.update({
                where: { id },
                data: { deletedAt: new Date(), deletedBy: updaterId }
            });
            return deletedFee
        });

        return {
            ...featuredPlans,
            amount: Number(featuredPlans.amount),
            status: featuredPlans.status as unknown as Status
        };
    }

    async permanentDelete(id: string): Promise<FeaturedPlanDto> {
        const featuredPlans = await this.databaseService.$transaction(async (prisma) => {
            const deletedFee = await prisma.featuredPlans.delete({ where: { id } });
            return deletedFee
        });

        return {
            ...featuredPlans,
            amount: Number(featuredPlans.amount),
            status: featuredPlans.status as unknown as Status
        };
    }

    private mapToFeaturedPlans(featuredPlans: any): FeaturedPlanDto {
        return {
            ...featuredPlans,
            amount: Number(featuredPlans.amount),
            status: featuredPlans.status as unknown as Status
        };
    }
}
