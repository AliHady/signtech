export interface EventItem {
  Title: string;
  URL: string;
  SortOrder: number;
  CreateDate: string;
  EventImage: string;
  RollupImage: string;
  EventStart: string;
  EventEnd: string;
  ContentSummary: string;
  EventLocation: string;
  AboutEvent: string;
}

export interface EventsResponse {
  TotalItems: number;
  TotalPages: number;
  CurrentPage: number;
  PageSize: number;
  Items: EventItem[];
}
