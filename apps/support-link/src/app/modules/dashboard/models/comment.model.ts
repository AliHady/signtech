export interface CommentItem {
  Id: string;
  UserId: string;
  UserName: string;
  Content: string;
  CreatedDate: string;
}

export interface CommentResponse {
  TotalCount: number;
  PageIndex: number;
  PageSize: number;
  Items: CommentItem[];
}