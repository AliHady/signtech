export interface EServiceLink {
  Title: string;
  ContentSummary: string | null;
  Image: string | null;
  Link: string;
  SortOrder: number;
  ShowInHome: boolean;
}

export interface EServiceLinksResponse {
  TotalItems: number;
  TotalPages: number;
  CurrentPage: number;
  PageSize: number;
  Items: EServiceLink[];
}
