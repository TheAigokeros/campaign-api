import { IsOptional, IsString } from 'class-validator';
// campaign.dto.ts
export class UpdateCampaignEmailDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;
}
