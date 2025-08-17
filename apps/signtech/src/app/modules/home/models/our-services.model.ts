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
  Offers: string;
  OffersEn: string;
  Targets: string;
  TargetsEn: string;
  Delivery: string;
  DeliveryEn: string;
  Ensure: string;
  EnsureEn: string;
}

export interface ServicesResponse {
  TotalItems: number;
  TotalPages: number;
  CurrentPage: number;
  PageSize: number;
  Items: ServiceItemDto[];
}
