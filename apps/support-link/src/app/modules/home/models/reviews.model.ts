export interface ReviewsResponse {
  Id: number;
  ProfileId: string;
  Rating: number;
  Comment: string;
  Highlighted: boolean;
  CreatedDate: string;
  FullName: string;
  Country: string;
  City: string;
  Image: string;
}