import { BilingualModel } from "./bilingual.model";

export interface RequestItem {
  Id: string;
  Service: BilingualModel;
  Description: string;
  Priority: BilingualModel;
  ContactDate: string;
  ContactTime: BilingualModel;
  CreatedByName: string;
  CreatedDate: string;
  Category: BilingualModel;
  Price: number;
  Status: BilingualModel;
}

export interface RequestsResponse {
  TotalCount: number;
  PageIndex: number;
  PageSize: number;
  Items: RequestItem[];
}