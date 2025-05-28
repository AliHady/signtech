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
