import { Expose } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

// campaign.dto.ts
export class ListHomeCampaignEmailDto {
    @IsString()
    name: string;
}

export class ListCampaignEmailResponseDto{
    @IsString()
    @Expose()
    name: string;

    // @IsString()
    // // @Expose()
    // subject: string;
}


export class DetailCampaignEmailDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;
}