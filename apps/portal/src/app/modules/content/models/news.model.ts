export interface News {
  Id: number;
  Title: string;
  ShortTitle: string;
  ContentSummary: string;
  Content: string | null;
  NewsImage: string;
  RollupImage: string;
  NewsLink: string;
  NewsDate: string | null;
  NewsHigriDate: string;
  SortOrder: number;
}

export interface NewsResponse {
  TotalItems: number;
  TotalPages: number;
  CurrentPage: number;
  PageSize: number;
  Items: News[];
}


