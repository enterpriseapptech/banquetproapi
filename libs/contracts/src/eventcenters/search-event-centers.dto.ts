import { IsOptional, IsString, IsNumber, IsArray, IsEnum } from 'class-validator';
import { EventType } from './create-event-center.dto';

export class SearchServiceProviderDto {
    @IsOptional()
    @IsString()
    state?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    amenities?: string;

    @IsOptional()
    @IsArray()
    @IsEnum(EventType, { each: true })
    eventTypes?: EventType[];

    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsNumber()
    offset?: number;
}
