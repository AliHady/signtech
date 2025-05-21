export interface BannerItemDto {
  Title: string;
  ContentSummary: string;
  BannerImage: string | null;
  BannerLink: string | null;
  IsOpenInNewTab: boolean;
  SortOrder: number;
}

export interface BannerResponse {
  Items: BannerItemDto[];
  TotalItems: number;
  TotalPages: number;
} 