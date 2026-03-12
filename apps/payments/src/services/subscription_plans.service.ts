import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateSubscriptionPlanDto, Status, SubscriptionPlanDto, UpdateSubscriptionPlanDto } from "@shared/contracts/payments";
import { PrismaErrorHandler } from "@shared/contracts/prisma.error.handler";
import { DataWithCountDto } from "@shared/contracts/shared";
import { DatabaseService } from "apps/payments/database/database.service";
import { Prisma } from "apps/payments/prisma/@prisma/payments";

@Injectable()
export class SubscriptionPlansService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async create(createSubscriptionPlanDto: CreateSubscriptionPlanDto): Promise<SubscriptionPlanDto> {
        const newUserInput: Prisma.SubscriptionPlansCreateInput = {
            plan: createSubscriptionPlanDto.plan.trim().toLowerCase(),
            amount: createSubscriptionPlanDto.amount,
            timeFrame: createSubscriptionPlanDto.timeFrame,
            status: createSubscriptionPlanDto.status
        }

        try {
            // Start a transaction - for an all or fail process of creating a user
            const subscriptionPlan = await this.databaseService.$transaction(async (prisma) => {

                // Create the user
                const subscriptionPlan = await prisma.subscriptionPlans.create({ data: newUserInput });
                return subscriptionPlan; // Return created user
            });

            return {
                ...subscriptionPlan,
                amount: Number(subscriptionPlan.amount),
                plan: subscriptionPlan.plan,
                status: subscriptionPlan.status as unknown as Status
            };

        } catch (error) {
            PrismaErrorHandler.handle(error, Prisma);
            throw new InternalServerErrorException('sever error could not create fee', {
                cause: new Error(),
                description: 'Subscription plan creation failed, please try again'
            });
        }
    }

    async findAll(limit: number, offset: number): Promise<DataWithCountDto<SubscriptionPlanDto>> {
        try {
            const [subscriptionPlans, count] = await this.databaseService.$transaction([
                this.databaseService.subscriptionPlans.findMany({
                    take: limit,
                    skip: offset,
                    where: {
                    deletedAt: null,
                    },
                    orderBy: { plan: "asc" },
                }),

                this.databaseService.subscriptionPlans.count({
                    where: {
                    deletedAt: null,
                    },
                }),
                ]);

         
        return {count, data: subscriptionPlans.map(fee => this.mapToSubscriptionPlans(fee))};
        } catch (error) {
            PrismaErrorHandler.handle(error, Prisma);
            throw new InternalServerErrorException('Could not get subscription plans, please try again', {
                cause: new Error(),
                description: 'Could not get subscription plans, please try again'
            });
        }
        
    }

    async findOne(id: string): Promise<SubscriptionPlanDto> {

        const subscriptionPlans = await this.databaseService.subscriptionPlans.findUnique({
            where: {
                id: id,
                deletedAt: null
            },
        });

        return {
            ...subscriptionPlans,
            amount: Number(subscriptionPlans.amount),
            status: subscriptionPlans.status as unknown as Status
        };

    }

    async update(id: string, updateSubscriptionPlanDto: UpdateSubscriptionPlanDto): Promise<SubscriptionPlanDto> {
        try {
            const updateFeeInput: Prisma.SubscriptionPlansUpdateInput = {
                ...updateSubscriptionPlanDto
            };

            const subscriptionPlans = await this.databaseService.subscriptionPlans.update({
                where: { id },
                data: updateFeeInput
            });


            return {
                ...subscriptionPlans,
                amount: Number(subscriptionPlans.amount),
                status: subscriptionPlans.status as unknown as Status
            };

        } catch (error) {
            PrismaErrorHandler.handle(error, Prisma);
            throw new InternalServerErrorException('Could not update subscription plan, please try again', {
                cause: new Error(),
                description: 'Could not update subscription plan, please try again'
            });
        }
    }

    async remove(id: string, updaterId: string): Promise<SubscriptionPlanDto> {

        const subscriptionPlans = await this.databaseService.$transaction(async (prisma) => {
            const deletedFee = await prisma.subscriptionPlans.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    deletedBy: updaterId
                }
            });

            return deletedFee
        });

        return {
            ...subscriptionPlans,
            amount: Number(subscriptionPlans.amount),
            status: subscriptionPlans.status as unknown as Status
        };

    }

    async permanentDelete(id: string): Promise<SubscriptionPlanDto> {

        const subscriptionPlans = await this.databaseService.$transaction(async (prisma) => {
            const deletedSubscriptionPlans = await prisma.subscriptionPlans.delete({
                where: { id },
            });
            return deletedSubscriptionPlans
        });

        return {
            ...subscriptionPlans,
            amount: Number(subscriptionPlans.amount),
            status: subscriptionPlans.status as unknown as Status
        };

    }


    /**
   * 
   * Maps a raw event center from the database to EventCenterDto.
   */
    private mapToSubscriptionPlans(featuredPlans: any): SubscriptionPlanDto {
        return {
            ...featuredPlans,
            amount: Number(featuredPlans.amount),
            status: featuredPlans.status as unknown as Status
        };
    }
}

