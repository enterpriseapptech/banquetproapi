import { IsOptional, IsString, IsNumber } from 'class-validator';

export class SearchServiceProviderDto {
    @IsOptional()
    @IsString()
    state?: string; // Optional filter by state

    @IsOptional()
    @IsString()
    country?: string; // Optional filter by country

    @IsOptional()
    @IsString()
    name?: string; // Optional search by name (partial match)

    @IsOptional()
    @IsString()
    amenities?: string; // Optional filter by amenities (comma-separated list)

    @IsOptional()
    @IsNumber()
    limit?: number; // Number of records to retrieve (default: 10)

    @IsOptional()
    @IsNumber()
    offset?: number; // Offset for pagination (default: 0)
}
