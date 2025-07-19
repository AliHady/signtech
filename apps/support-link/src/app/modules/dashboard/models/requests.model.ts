export interface RequestsItem {
  Id: number;
  Title: string;
  TrackingId: string;
  Status: string;
  Description: string;
  Price: string;
  RequestDate: string;
  Category: string;
}

export interface RequestsResponse {
  TotalCount: number;
  PageIndex: number;
  PageSize: number;
  Items: RequestsItem[];
}
