
import { ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common';
import { Prisma } from "../prisma/@prisma/management";
import { DatabaseService } from '../database/database.service';
import { CreateCountryDto, CreateStateDto,  CreateAppSettingDto } from '@shared/contracts/management/create-management.dto';
import { AppSettingDto, CountryDto,  StateDto } from '@shared/contracts/management/management.dto';
import { UpdateAppSettingDto, UpdateCountryDto, UpdateStateDto } from '@shared/contracts/management/update-management.dto';

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
export class CountryService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async create(createCountryDto: CreateCountryDto): Promise<CountryDto> {
       

        try {
             const newCountryInput: Prisma.CountryCreateInput = {
                name: createCountryDto.name,
                code: createCountryDto.code,
                currency: createCountryDto.currency,
                currencyCode: createCountryDto.currencyCode,
                currencySymbol: createCountryDto.currencySymbol,
                updatedBy: createCountryDto.updatedBy
            }
            
            const country = await this.databaseService.country.create({ data: newCountryInput });
            return country; 
        } catch (error) {
            // console.log({error})
            throw new InternalServerErrorException('sever error could not create country', {
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
    
    
    async findMany(
        ids: string[],
    ): Promise< CountryDto[]> {
        const whereClause: any = {deletedAt: null, id: { in:ids} };
        // Fetch paginated services with applied filters
        const states = await this.databaseService.state.findMany({
            where: whereClause,
        });
        return states ;
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

