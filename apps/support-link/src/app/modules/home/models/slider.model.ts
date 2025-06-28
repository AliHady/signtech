export interface SliderItemDto {
  Id: number;
  Image: string; 
  Title: string;
  Description: string;
  Link: string;
  DisplayOrder: number;
}

export interface SliderResponse {
  Items: SliderItemDto[];
  TotalItems: number;
  TotalPages: number;
}