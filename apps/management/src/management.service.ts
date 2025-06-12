
import { ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common';
import { Prisma, $Enums } from "@prisma/management";
import { DatabaseService } from '../database/database.service';
import { CreateServiceCategoryDto, FeesType, CreateServiceDto, Status, CreateServiceSubCategoryDto, CreateFeeDto, CreateFeaturedPlanDto, CreateCountryDto, CreateStateDto, CreateCityDto, CreateAppSettingDto } from '@shared/contracts/management/create-management.dto';
import { AppSettingDto, CityDto, CountryDto, FeaturedPlanDto, FeesDto, ServiceCategoryDto, ServiceDto, ServiceSubCategoryDto, StateDto } from '@shared/contracts/management/management.dto';
import { UpdateAppSettingDto, UpdateCityDto, UpdateCountryDto, UpdateFeeDto, UpdateServiceCategoryDto, UpdateServiceDto, UpdateServiceSubCategoryDto, UpdateStateDto } from '@shared/contracts/management/update-management.dto';

@Injectable()
export class AppSettingService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async create(createAppSettingDto: CreateAppSettingDto): Promise<AppSettingDto> {
        const newAppSettingInput: Prisma.AppSettingsCreateInput = {
            notifyCertifiedOnly: createAppSettingDto.notifyCertifiedOnly,
            notifyOnRequest: createAppSettingDto.notifyOnRequest,
            visibleToCertifiedOnly: createAppSettingDto.visibleToCertifiedOnly
        }

        try {
            const appSettings = await this.databaseService.appSettings.create({ data: newAppSettingInput });
              
            return appSettings;

        } catch (error) {
            throw new InternalServerErrorException('sever error could not create service category', {
                cause: new Error(),
                description: 'Service category creation failed, please try again'
            });
        }
    }

    async find(): Promise<AppSettingDto> {
        const appSetting = await this.databaseService.appSettings.findFirst();
        return appSetting;

    }

    async update(id: string, updateAppSettingDto: UpdateAppSettingDto): Promise<AppSettingDto> {
        try {
            const updateAppSettingInput: Prisma.AppSettingsUpdateInput = {
                ...updateAppSettingDto,
            };

            const appSetting = await this.databaseService.appSettings.update({
                where: { id },
                data: updateAppSettingInput
            });


            return appSetting;

        } catch (error) {
            throw new ConflictException(error);
        }
    }

}

@Injectable()
export class ServiceCategoryService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async create(createServiceCategoryDto: CreateServiceCategoryDto): Promise<ServiceCategoryDto> {
        const newUserInput: Prisma.ServiceCategoryCreateInput = {
            name: createServiceCategoryDto.name,
            description: createServiceCategoryDto.description,
        }

        try {
            // Start a transaction - for an all or fail process of creating a user
            const serviceCategory = await this.databaseService.$transaction(async (prisma) => {

                // Create the user
                const serviceCategory = await prisma.serviceCategory.create({ data: newUserInput });
                return serviceCategory; // Return created user
            });

            return serviceCategory;

        } catch (error) {
            throw new InternalServerErrorException('sever error could not create service category', {
                cause: new Error(),
                description: 'Service category creation failed, please try again'
            });
        }
    }

    async findAll(limit: number, offset: number, deletedAt?: boolean): Promise<ServiceCategoryDto[]> {
        const whereClause: any = {};

        if (deletedAt) {
            whereClause.deletedAt = { not: null };
        }

        const serviceCategories = await this.databaseService.serviceCategory.findMany({
            take: limit,
            skip: offset,
            where: whereClause,
        });

        return serviceCategories;
    }

    async findOne(id: string): Promise<ServiceCategoryDto> {

        const serviceCategory = await this.databaseService.serviceCategory.findUnique({
            where: {
                id: id
            },
            include: {
                serviceSubCategory: true
            }
        });

        return serviceCategory;

    }

    async update(id: string, updateServiceCategoryDto: UpdateServiceCategoryDto): Promise<ServiceCategoryDto> {
        try {
            const updateServiceCategoryInput: Prisma.ServiceCategoryUpdateInput = {
                ...updateServiceCategoryDto,
            };

            const serviceCategory = await this.databaseService.serviceCategory.update({
                where: { id },
                data: updateServiceCategoryInput
            });


            return serviceCategory;

        } catch (error) {
            throw new ConflictException(error);
        }
    }

    async remove(id: string, updaterId: string): Promise<ServiceCategoryDto> {

        const deletedServiceCategory = await this.databaseService.$transaction(async (prisma) => {
            const deletedServiceCategory = await prisma.serviceCategory.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    deletedBy: updaterId
                }
            });

            return deletedServiceCategory
        });
        return deletedServiceCategory;

    }

    async permanentDelete(id: string): Promise<ServiceCategoryDto> {

        const deletedServiceCategory = await this.databaseService.$transaction(async (prisma) => {
            const deletedServiceCategory = await prisma.serviceCategory.delete({
                where: { id },
            });

            return deletedServiceCategory
        });

        return deletedServiceCategory;

    }
}

@Injectable()
export class ServiceSubCategoryService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async create(createServiceSubCategoryDto: CreateServiceSubCategoryDto): Promise<ServiceSubCategoryDto> {
        const newUserInput: Prisma.ServiceSubCategoryCreateInput = {
            subCategoryName: createServiceSubCategoryDto.subCategoryName,
            description: createServiceSubCategoryDto.description,
            serviceCategory: { connect: { id: createServiceSubCategoryDto.serviceCategoryId } }
        }

        try {
            // Start a transaction - for an all or fail process of creating a user
            const serviceCategory = await this.databaseService.$transaction(async (prisma) => {

                // Create the user
                const serviceCategory = await prisma.serviceSubCategory.create({ data: newUserInput });
                return serviceCategory; // Return created user
            });

            return serviceCategory;

        } catch (error) {
            console.log(error)
            // throw new InternalServerErrorException('sever error could not create service category', {
            //     cause: new Error(),
            //     description: 'Service category creation failed, please try again'
            // });
        }
    }

    async findAll(limit: number, offset: number, deletedAt?: boolean): Promise<ServiceSubCategoryDto[]> {
        const whereClause: any = {};

        if (deletedAt) {
            whereClause.deletedAt = { not: null }
        }

        const serviceCategories = await this.databaseService.serviceSubCategory.findMany({
            take: limit,
            skip: offset,
            where: whereClause,
        });

        return serviceCategories;
    }

    async findOne(id: string): Promise<ServiceSubCategoryDto> {

        const serviceCategory = await this.databaseService.serviceSubCategory.findUnique({
            where: {
                id: id
            },
            include: {
                services: true
            }
        });

        return serviceCategory;

    }

    async update(id: string, updateServiceSubCategoryDto: UpdateServiceSubCategoryDto): Promise<ServiceSubCategoryDto> {
        try {
            const updateServiceSubCategoryInput: Prisma.ServiceSubCategoryUpdateInput = {
                ...updateServiceSubCategoryDto
            };

            const serviceSubCategory = await this.databaseService.serviceSubCategory.update({
                where: { id },
                data: updateServiceSubCategoryInput
            });


            return serviceSubCategory;

        } catch (error) {
            throw new ConflictException(error);
        }
    }

    async remove(id: string, updaterId: string): Promise<ServiceSubCategoryDto> {

        const deletedServiceSubCategory = await this.databaseService.$transaction(async (prisma) => {
            const deletedServiceSubCategory = await prisma.serviceSubCategory.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    deletedBy: updaterId
                }
            });

            return deletedServiceSubCategory
        });

        return deletedServiceSubCategory;

    }

    async permanentDelete(id: string): Promise<ServiceSubCategoryDto> {

        const deletedServiceSubCategory = await this.databaseService.$transaction(async (prisma) => {
            const deletedServiceSubCategory = await prisma.serviceSubCategory.delete({
                where: { id },
            });
            return deletedServiceSubCategory
        });

        return deletedServiceSubCategory;

    }
}

@Injectable()
export class ServiceService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async create(createServiceDto: CreateServiceDto): Promise<ServiceDto> {
        const newUserInput: Prisma.ServiceCreateInput = {
            serviceName: createServiceDto.serviceName,
            description: createServiceDto.description,
            tags: createServiceDto.tags,
            subCategory: { connect: { id: createServiceDto.serviceSubCategoryId } }
        }

        try {
            // Start a transaction - for an all or fail process of creating a user
            const service = await this.databaseService.$transaction(async (prisma) => {

                // Create the user
                const service = await prisma.service.create({ data: newUserInput });
                return service; // Return created user
            });

            return service;

        } catch (error) {
            throw new InternalServerErrorException('sever error could not create service', {
                cause: new Error(),
                description: 'Service creation failed, please try again'
            });
        }
    }

    // async findAll(limit: number, offset: number, deletedAt?: boolean): Promise<ServiceDto[]> {
    //     const whereClause: any = {};

    //     if (deletedAt) {
    //         whereClause.deletedAt = {not: null}
    //     }
    //     const services = await this.databaseService.service.findMany({
    //         take: limit,
    //         skip: offset,
    //         where: whereClause,
    //         orderBy: { serviceName: "asc" },
    //     });

    //     return services;
    // }

    async findAll(
        limit: number,
        offset: number,
        deletedAt?: boolean,
        search?: string,
        filterByServiceCategory?: string,
        filterByServiceSubCategory?: string,
        filterByTags?: string[],
    ): Promise<{ count: number; docs: ServiceDto[] }> {
        const whereClause: any = {};
    
        if (deletedAt) {
            whereClause.deletedAt = { not: null };
        }
    
        // Search by service name or category/subcategory name or tags
        if (search) {
            whereClause.OR = [
                { serviceName: { contains: search, mode: "insensitive" } },
                { subCategory: { subCategoryName: { contains: search, mode: "insensitive" } } },
                { subCategory: {serviceCategory: { name: { contains: search, mode: "insensitive" } } }},
                { tags: { hasSome: [search] } },  // Searching inside tags array
            ];
        }
    
        // Filters by service category name
        if (filterByServiceCategory) {
            whereClause.subCategory = {
                serviceCategoryId: filterByServiceCategory,
            };
        }
    
        // Filters by service subcategory name
        if (filterByServiceSubCategory) {
            whereClause.serviceSubCategoryId = filterByServiceSubCategory;
        }
    
        // Filters by tags
        if (filterByTags && filterByTags.length > 0) {
            whereClause.tags = { hasSome: filterByTags };
        }
    
        // Get count of matching records
        const count = await this.databaseService.service.count({
            where: whereClause,
        });
    
        // Fetch paginated services with applied filters
        const services = await this.databaseService.service.findMany({
            take: limit,
            skip: offset,
            where: whereClause,
            orderBy: { serviceName: "asc" },
            include: {
                subCategory: true,
            },
        });
    
        return { count, docs: services };
    }
    

    async findOne(id: string): Promise<ServiceDto> {

        const service = await this.databaseService.service.findUnique({
            where: {
                id: id,
                deletedAt: null
            },
        });

        return service;

    }

    async update(id: string, updateServiceDto: UpdateServiceDto): Promise<ServiceDto> {
        try {
            const updateServiceInput: Prisma.ServiceUpdateInput = {
                ...updateServiceDto
            };

            const service = await this.databaseService.service.update({
                where: { id },
                data: updateServiceInput
            });


            return service;

        } catch (error) {
            throw new ConflictException(error);
        }
    }

    async remove(id: string, updaterId: string): Promise<ServiceDto> {

        const deletedService = await this.databaseService.$transaction(async (prisma) => {
            const deletedService = await prisma.service.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    deletedBy: updaterId
                }
            });

            return deletedService
        });

        return deletedService;

    }

    async permanentDelete(id: string): Promise<ServiceDto> {

        const deletedService = await this.databaseService.$transaction(async (prisma) => {
            const deletedService = await prisma.service.delete({
                where: { id },
            });
            return deletedService
        });

        return deletedService;

    }
}

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

        return {
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
        return {
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

        return {
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
        return {
            ...fees,
            amount: Number(fees.amount),
            name: fees.name as unknown as FeesType,
            status: fees.status as unknown as Status
        };
    }
}


@Injectable()
export class CountryService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async create(createCountryDto: CreateCountryDto): Promise<CountryDto> {
        
        const newCountryInput: Prisma.CountryCreateInput = {
            name: createCountryDto.name,
            code: createCountryDto.code,
            currency: createCountryDto.currency,
            currencyCode: createCountryDto.currencyCode,
            currencySymbol: createCountryDto.currencySymbol,
            updatedBy: createCountryDto.updatedBy
        }

        try {
            // Start a transaction - for an all or fail process of creating a user
            const country = await this.databaseService.$transaction(async (prisma) => {
                const country = await prisma.country.create({ data: newCountryInput });
                return country; // Return created user
            });

            return country;

        } catch (error) {
            console.log({error})
            throw new InternalServerErrorException('sever error could not create service', {
                cause: new Error(),
                description: error.message
            });
        }
    }


    async findAll(
        limit: number,
        offset: number,
        deletedAt?: boolean,
        search?: string,
    ): Promise<{ count: number; docs: CountryDto[] }> {
        const whereClause: any = {};
    
        if (deletedAt) {
            whereClause.deletedAt = { not: null };
        }
    
        // Search by service name or category/subcategory name or tags
        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { code: { contains: search, mode: "insensitive" } },
            ];
        }
    
    
        // Get count of matching records
        const count = await this.databaseService.country.count({
            where: whereClause,
        });
    
        // Fetch paginated services with applied filters
        const countries = await this.databaseService.country.findMany({
            take: limit,
            skip: offset,
            where: whereClause,
            orderBy: { name: "asc" },
        });
    
        return { count, docs: countries };
    }
    

    async findOne(id: string): Promise<CountryDto> {

        const country = await this.databaseService.country.findUnique({
            where: {
                id: id,
                deletedAt: null,
            },
             include: {
                states: true    
            },
        });

        return country;

    }

    async update(id: string, updateCountryDto: UpdateCountryDto): Promise<CountryDto> {
        try {
            const updateCountryInput: Prisma.CountryUpdateInput = {
                ...updateCountryDto
            };

            const country = await this.databaseService.country.update({
                where: { id },
                data: updateCountryInput
            });


            return country;

        } catch (error) {
            throw new ConflictException(error);
        }
    }

    async remove(id: string, updaterId: string): Promise<CountryDto> {

        const deletedCountry = await this.databaseService.$transaction(async (prisma) => {
            const deletedCountry = await prisma.country.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    deletedBy: updaterId
                }
            });

            return deletedCountry
        });

        return deletedCountry;

    }

    async permanentDelete(id: string): Promise<CountryDto> {

        const deletedCountry = await this.databaseService.$transaction(async (prisma) => {
            const deletedCountry = await prisma.country.delete({
                where: { id },
            });
            return deletedCountry
        });

        return deletedCountry;

    }
}


@Injectable()
export class StateService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async create(createStateDto: CreateStateDto): Promise<StateDto> {
        const newStateInput: Prisma.StateCreateInput = {
            name: createStateDto.name,
            code: createStateDto.code,
            updatedBy: createStateDto.updatedBy,
            country: { connect: { id: createStateDto.countryId } }
        }

        try {
            // Start a transaction - for an all or fail process of creating a user
            const State = await this.databaseService.$transaction(async (prisma) => {

                // Create the user
                const State = await prisma.state.create({ data: newStateInput });
                return State; // Return created user
            });

            return State;

        } catch (error) {
            throw new InternalServerErrorException('sever error could not create service', {
                cause: new Error(),
                description: 'State creation failed, please try again'
            });
        }
    }


    async findAll(
        limit: number,
        offset: number,
        deletedAt?: boolean,
        search?: string,
    ): Promise<{ count: number; docs: StateDto[] }> {
        const whereClause: any = {};
    
        if (deletedAt) {
            whereClause.deletedAt = { not: null };
        }
    
        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { code: { contains: search, mode: "insensitive" } },
                { country: { name: { contains: search, mode: "insensitive" } }},
                { country: { code: { contains: search, mode: "insensitive" } }},

            ];
        }
    
    
        // Get count of matching records
        const count = await this.databaseService.state.count({
            where: whereClause,
        });
    
        // Fetch paginated services with applied filters
        const states = await this.databaseService.state.findMany({
            take: limit,
            skip: offset,
            where: whereClause,
            orderBy: { name: "asc" },
        });
    
        return { count, docs: states };
    }
    

    async findOne(id: string): Promise<StateDto> {

        const State = await this.databaseService.state.findUnique({
            where: {
                id: id,
                deletedAt: null,
            },
             include: {
                country: true    
            },
        });

        return State;

    }

    async update(id: string, updateStateDto: UpdateStateDto): Promise<StateDto> {
        try {
            const updateStateInput: Prisma.StateUpdateInput = {
                ...updateStateDto
            };

            const State = await this.databaseService.state.update({
                where: { id },
                data: updateStateInput
            });


            return State;

        } catch (error) {
            throw new ConflictException(error);
        }
    }

    async remove(id: string, updaterId: string): Promise<StateDto> {

        const deletedState = await this.databaseService.$transaction(async (prisma) => {
            const deletedState = await prisma.state.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    deletedBy: updaterId
                }
            });

            return deletedState
        });

        return deletedState;

    }

    async permanentDelete(id: string): Promise<StateDto> {

        const deletedState = await this.databaseService.$transaction(async (prisma) => {
            const deletedState = await prisma.state.delete({
                where: { id },
            });
            return deletedState
        });

        return deletedState;

    }
}


@Injectable()
export class CityService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async create(createCityDto: CreateCityDto): Promise<CityDto> {
        const newCityInput: Prisma.CityCreateInput = {
            name: createCityDto.name,
            updatedBy: createCityDto.updatedBy,
            state: { connect: { id: createCityDto.stateId } }
        }

        try {
            // Start a transaction - for an all or fail process of creating a user
            const City = await this.databaseService.$transaction(async (prisma) => {

                // Create the user
                const City = await prisma.city.create({ data: newCityInput });
                return City; // Return created user
            });

            return City;

        } catch (error) {
            throw new InternalServerErrorException('sever error could not create service', {
                cause: new Error(),
                description: 'City creation failed, please try again'
            });
        }
    }


    async findAll(
        limit: number,
        offset: number,
        deletedAt?: boolean,
        search?: string,
    ): Promise<{ count: number; docs: CityDto[] }> {
        const whereClause: any = {};
    
        if (deletedAt) {
            whereClause.deletedAt = { not: null };
        }
    
        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { code: { contains: search, mode: "insensitive" } },
                { country: { name: { contains: search, mode: "insensitive" } }},
                { country: { code: { contains: search, mode: "insensitive" } }},

            ];
        }
    
    
        // Get count of matching records
        const count = await this.databaseService.city.count({
            where: whereClause,
        });
    
        // Fetch paginated services with applied filters
        const Citys = await this.databaseService.city.findMany({
            take: limit,
            skip: offset,
            where: whereClause,
            orderBy: { name: "asc" },
        });
    
        return { count, docs: Citys };
    }
    

    async findOne(id: string): Promise<CityDto> {

        const City = await this.databaseService.city.findUnique({
            where: {
                id: id,
                deletedAt: null,
            },
            include: {
                state: {
                    include: {
                        country: true
                    }
                }
            }
        });

        return City;

    }

    async update(id: string, updateCityDto: UpdateCityDto): Promise<CityDto> {
        try {
            const updateCityInput: Prisma.CityUpdateInput = {
                ...updateCityDto
            };

            const City = await this.databaseService.city.update({
                where: { id },
                data: updateCityInput,
                include: {
                    state: {
                        include: {
                            country: true
                        }
                    }
                }
                
            });


            return City;

        } catch (error) {
            throw new ConflictException(error);
        }
    }

    async remove(id: string, updaterId: string): Promise<CityDto> {

        const deletedCity = await this.databaseService.$transaction(async (prisma) => {
            const deletedCity = await prisma.city.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    deletedBy: updaterId
                }
            });

            return deletedCity
        });

        return deletedCity;

    }

    async permanentDelete(id: string): Promise<CityDto> {

        const deletedCity = await this.databaseService.$transaction(async (prisma) => {
            const deletedCity = await prisma.city.delete({
                where: { id },
            });
            return deletedCity
        });

        return deletedCity;

    }
}

