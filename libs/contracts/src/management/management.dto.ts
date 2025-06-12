export class AppSettingDto {
    notifyOnRequest: boolean;
    notifyCertifiedOnly: boolean;
    visibleToCertifiedOnly: boolean;
}

export class CountryDto {
    id: string;
    name: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
    states?: StateDto[];
}



export class StateDto {
    id: string;
    name: string;
    code?: string;
    countryId: string;
    createdAt: Date;
    updatedAt: Date;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
}
