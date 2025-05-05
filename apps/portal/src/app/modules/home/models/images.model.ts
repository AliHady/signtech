export interface ImageGalleryItem {
  Title: string;
  Details: string;
  URL: string;
  CreateDate: string;
  AlbumImage: string;
  AlbumImages: string[];
}

export interface ImageGalleryResponse {
  TotalItems: number;
  TotalPages: number;
  CurrentPage: number;
  PageSize: number;
  Items: ImageGalleryItem[];
}
