export interface ConsultingStudiesItem {
  Id: number;
  NameAr: string;
  StudySubject: string;
  StudyType: string;
  Description: string;
  PrivacyType: string;
  StudyDate: string;
}

export interface ConsultingStudiesResponse {
  TotalCount: number;
  PageIndex: number;
  PageSize: number;
  Items: ConsultingStudiesItem[];
}

export interface ConsultingStudyResponse extends ConsultingStudiesItem {
  BudgetItemNo: number;
  CompanyName: string;
  ContractName: string;
  ContractNo: number;
  Keywords: string;
  MainSubject: string;
  Sector: string;
}
