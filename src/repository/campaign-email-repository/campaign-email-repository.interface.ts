// to response from query but migth have little transform logic (ex. convert status from number to string)
// import { CampaignEmail } from '@prisma/client';

// import { CampaignEmailStatus } from './campaign-repository.enum';


// export type CampaignEmailInfo = CampaignEmail;


export interface CreateCampaignEmailArgs {
	refId: number;
}

export type CampaignEmailListType = {  subject: string };

export interface CampaignEmailEntity {
	id: number;
	templateId: number | null;
	campaignId: number;
	emails: string[];	
	subject: string;
	emailContent: string;
	status: string;
}

export interface CampaignEmailLogEntity {
	id: number;	
	email: string;	// 'a@g.com, b@g.com'
	subject: string;
	emailContent: string;	
}
  

// import { Optional } from '@prisma/client/runtime/library';
// export type CommentDetailInfo = Optional<Comment, 'isDisplay' | 'level'> & {
// 	account: Account;
// 	children?: CommentDetailInfo[];
// 	isAccountCampaignEmail?: boolean;
// };

// export type IdeaInfoReview = Idea & {
// 	account: Account;
// 	ideaAttachments: Pick<IdeaAttachment, 'id' | 'url'>[];
// 	achievements: Pick<Achievement, 'id' | 'name'>[];
// 	category: Pick<Category, 'id' | 'name' | 'keyword'>;
// } & ReviewSummaryInfo;