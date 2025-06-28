export interface ServiceItemDto {
  Id: number;
  Title: string;
  TitleEn: string;
  Description: string;
  DescriptionEn: string;
  CategoryId: number | null;
  Location: string;
  LocationEn: string;
  Image: string;
  Rating: number;
  Highlighted: boolean;
  CreatedDate: string;
  IsActive: boolean;
  DisplayOrder: number;
  Price: number | null;
}
