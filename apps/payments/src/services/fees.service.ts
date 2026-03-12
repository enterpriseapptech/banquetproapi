import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'apps/payments/database/database.service';
import { $Enums, Prisma } from 'apps/payments/prisma/@prisma/payments';
import { FeesDto, FeesType, Status, UpdateFeeDto, CreateFeeDto } from '@shared/contracts/payments';

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
            const fee = await this.databaseService.$transaction(async (prisma) => {
                const fee = await prisma.fees.create({ data: newUserInput });
                return fee;
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
            where: { deletedAt: null },
            orderBy: { name: "asc" },
        });

        return fees.map(fee => this.mapToFeeDto(fee));
    }

    async findOne(id: string): Promise<FeesDto> {
        const fees = await this.databaseService.fees.findUnique({
            where: { id: id, deletedAt: null },
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
            const updateFeeInput: Prisma.FeesUpdateInput = { ...updateFeeDto };

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
                data: { deletedAt: new Date(), deletedBy: updaterId }
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
            const deletedFee = await prisma.fees.delete({ where: { id } });
            return deletedFee
        });

        return {
            ...fees,
            amount: Number(fees.amount),
            name: fees.name as unknown as FeesType,
            status: fees.status as unknown as Status
        };
    }

    private mapToFeeDto(fees: any): FeesDto {
        return {
            ...fees,
            amount: Number(fees.amount),
            name: fees.name as unknown as FeesType,
            status: fees.status as unknown as Status
        };
    }
}
