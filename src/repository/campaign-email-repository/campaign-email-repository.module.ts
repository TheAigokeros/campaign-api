import { Global, Module } from '@nestjs/common';
import { CampaignEmailRepositoryServiceProvider } from './campaign-email-repository.constant';
import { CampaignEmailRepositoryService } from './campaign-email-repository.service';
import { PrismaModule } from '@/common/modules/prisma/prisma.module';

@Global()
@Module({
	imports: [PrismaModule],
	providers: [
		CampaignEmailRepositoryService,
		{
			provide: CampaignEmailRepositoryServiceProvider,
			useExisting: CampaignEmailRepositoryService,
		},
	],
	exports: [CampaignEmailRepositoryServiceProvider],
})
export class CampaignEmailRepositoryModule {}
