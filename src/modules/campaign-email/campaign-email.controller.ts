import { Body, Controller, Get, Post } from '@nestjs/common';
// import {ListHomeCampaignEmailDto} from  './dto'

import { CampaignEmailService } from './campaign-email.service';
import { CampaignEmailList } from './campaign-email.interface';
import { CreateCampaignRequestDto, CreateCampaignResponseDto, ListCampaignEmailResponseDto } from './dto';

@Controller('campaign')
export class CampaignEmailController {
    // @NotRequireAuthorization()
    constructor(private campaignEmailService: CampaignEmailService) {}

	@Get('/')
	async get(
		// @User() userAuthPayload: AuthenticationToken,
	): Promise<ListCampaignEmailResponseDto[]> {
		return await this.campaignEmailService.findall()
	}

	@Post('send')
	async sendCampaign(
	  @Body() dto: CreateCampaignRequestDto,
	): Promise<CreateCampaignResponseDto[]> {
	  return this.campaignEmailService.createAndSendCampaign(dto);
	}

}
