export interface SliderItemDto {
  Title: string;
  ContentSummary: string;
  SliderImage: string | null;
  SliderLink: string | null;
  IsOpenInNewTab: boolean;
  SortOrder: number; 
}

export interface SliderResponse {
  Items: SliderItemDto[];
  TotalItems: number;
  TotalPages: number;
} 