export interface ExperienceType {
  _id: string;
  companyImage?: string;
  companyLink?: string;
  companyName: string;
  companyShortName: string;
  description: string;
  endDate?: Date | null | string;
  isCurrent: boolean;
  isRemote: boolean;
  jobTitle: string;
  skills: string[];
  startDate: Date | string;
}
