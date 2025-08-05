import { BilingualModel } from "./bilingual.model";

export interface Attachment {
  Id: string;
  FileName: string;
  ContentType: string;
  Content: string;
}

export interface StatusHistoryItem {
  Status: BilingualModel;
  ChangedBy: string;
  ChangedDate: string;
}

export interface RequestDetails {
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
  StatusHistory: StatusHistoryItem[];
  Attachments: Attachment[];
}