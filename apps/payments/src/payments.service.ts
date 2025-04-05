import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { $Enums, Prisma } from '@prisma/payments';
import { CreateFeaturedPlanDto, CreateFeeDto, CreateSubscriptionPlanDto, FeesType, Status } from '@shared/contracts/payments/create-payments.dto';
import { FeaturedPlanDto, FeesDto, SubscriptionPlanDto } from '@shared/contracts/payments/payments.dto';
import { UpdateFeeDto, UpdateSubscriptionPlanDto } from '@shared/contracts/payments/update-payments.dto';

@Injectable()
export class PaymentsService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class FeesService {
  constructor(
    private readonly databaseService: DatabaseService
  ) { }

  async create(createFeeDto: CreateFeeDto): Promise<FeesDto> {
    const newUserInput: Prisma.FeesCreateInput = {
      name: createFeeDto.name as $Enums.FeesType,
      amount: createFeeDto.amount,
      status: createFeeDto.status
    }

    try {
      // Start a transaction - for an all or fail process of creating a user
      const fee = await this.databaseService.$transaction(async (prisma) => {

        // Create the user
        const fee = await prisma.fees.create({ data: newUserInput });
        return fee; // Return created user
      });

      return {
        ...fee,
        amount: Number(fee.amount),
        name: fee.name as unknown as FeesType,
        status: fee.status as unknown as Status
      };

    } catch (error) {
      throw new InternalServerErrorException('sever error could not create fee', {
        cause: new Error(),
        description: 'Fee creation failed, please try again'
      });
    }
  }

  async findAll(limit: number, offset: number): Promise<FeesDto[]> {
    const fees = await this.databaseService.fees.findMany({
      take: limit,
      skip: offset,
      where: {
        deletedAt: null
      },
      orderBy: { name: "asc" },
    });

    return fees.map(fee => this.mapToFeeDto(fee));;
  }

  async findOne(id: string): Promise<FeesDto> {

    const fees = await this.databaseService.fees.findUnique({
      where: {
        id: id,
        deletedAt: null
      },
    });

    return{
      ...fees,
        amount: Number(fees.amount),
        name: fees.name as unknown as FeesType,
        status: fees.status as unknown as Status
    };

  }

  async update(id: string, updateFeeDto: UpdateFeeDto): Promise<FeesDto> {
    try {
      const updateFeeInput: Prisma.FeesUpdateInput = {
        ...updateFeeDto
      };

      const fees = await this.databaseService.fees.update({
        where: { id },
        data: updateFeeInput
      });


      return {
        ...fees,
        amount: Number(fees.amount),
        name: fees.name as unknown as FeesType,
        status: fees.status as unknown as Status
      };

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string, updaterId: string): Promise<FeesDto> {

    const fees = await this.databaseService.$transaction(async (prisma) => {
      const deletedFee = await prisma.fees.update({
        where: { id },
        data: {
          deletedAt: new Date(),
          deletedBy: updaterId
        }
      });

      return deletedFee
    });

    return {
      ...fees,
      amount: Number(fees.amount),
      name: fees.name as unknown as FeesType,
      status: fees.status as unknown as Status
    };

  }

  async permanentDelete(id: string): Promise<FeesDto> {

    const fees = await this.databaseService.$transaction(async (prisma) => {
      const deletedFee = await prisma.fees.delete({
        where: { id },
      });
      return deletedFee
    });

    return {
      ...fees,
      amount: Number(fees.amount),
      name: fees.name as unknown as FeesType,
      status: fees.status as unknown as Status
    };

  }


  /**
   * 
   * Maps a raw event center from the database to EventCenterDto.
   */
  private mapToFeeDto(fees: any): FeesDto {
        return{
          ...fees,
          amount: Number(fees.amount),
          name: fees.name as unknown as FeesType,
          status: fees.status as unknown as Status
        };
      }
}


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
      // Start a transaction - for an all or fail process of creating a user
      const featuredPlan = await this.databaseService.$transaction(async (prisma) => {

        // Create the user
        const featuredPlan = await prisma.featuredPlans.create({ data: newUserInput });
        return featuredPlan; // Return created user
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
      where: {
        deletedAt: null
      },
      orderBy: { plan: "asc" },
    });

    return featuredPlans.map(fee => this.mapToFeaturedPlans(fee));;
  }

  async findOne(id: string): Promise<FeaturedPlanDto> {

    const featuredPlans = await this.databaseService.featuredPlans.findUnique({
      where: {
        id: id,
        deletedAt: null
      },
    });

    return {
      ...featuredPlans,
      amount: Number(featuredPlans.amount),
      status: featuredPlans.status as unknown as Status
    };

  }

  async update(id: string, updateFeeDto: UpdateFeeDto): Promise<FeaturedPlanDto> {
    try {
      const updateFeeInput: Prisma.FeaturedPlansUpdateInput = {
        ...updateFeeDto
      };

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
        data: {
          deletedAt: new Date(),
          deletedBy: updaterId
        }
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
      const deletedFee = await prisma.featuredPlans.delete({
        where: { id },
      });
      return deletedFee
    });

    return {
      ...featuredPlans,
      amount: Number(featuredPlans.amount),
      status: featuredPlans.status as unknown as Status
    };

  }


    /**
   * 
   * Maps a raw event center from the database to EventCenterDto.
   */
    private mapToFeaturedPlans(featuredPlans: any): FeaturedPlanDto {
      return {
        ...featuredPlans,
        amount: Number(featuredPlans.amount),
        status: featuredPlans.status as unknown as Status
      };
    }
}

@Injectable()
export class SubscriptionPlansService {
  constructor(
    private readonly databaseService: DatabaseService
  ) { }

  async create(createSubscriptionPlanDto: CreateSubscriptionPlanDto): Promise<SubscriptionPlanDto> {
    const newUserInput: Prisma.FeaturedPlansCreateInput = {
      plan: createSubscriptionPlanDto.plan,
      amount: createSubscriptionPlanDto.amount,
      timeFrame: createSubscriptionPlanDto.timeFrame,
      status: createSubscriptionPlanDto.status
    }

    try {
      // Start a transaction - for an all or fail process of creating a user
      const featuredPlan = await this.databaseService.$transaction(async (prisma) => {

        // Create the user
        const featuredPlan = await prisma.subscriptionPlans.create({ data: newUserInput });
        return featuredPlan; // Return created user
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

  async findAll(limit: number, offset: number): Promise<SubscriptionPlanDto[]> {
    const featuredPlans = await this.databaseService.subscriptionPlans.findMany({
      take: limit,
      skip: offset,
      where: {
        deletedAt: null
      },
      orderBy: { plan: "asc" },
    });

    return featuredPlans.map(fee => this.mapToSubscriptionPlans(fee));;
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
      throw new InternalServerErrorException(error);
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