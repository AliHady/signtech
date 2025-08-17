import { BilingualModel } from "./bilingual.model";

export interface ProfileResponse {
  Id: string;
  Email: string;
  FirstName: string;
  LastName: string;
  MobileNumber: string;
  Image: string;
  Role: BilingualModel;
  Country: BilingualModel;
  City: BilingualModel;
}