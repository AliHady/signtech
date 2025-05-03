export interface NavigationItem {
    DocumentType: string;
    Id: number;
    Items: NavigationItem[] | null;
    Text: string;
    Url: string;
}

export interface NavigationMenu {
    NavigationItems: NavigationItem[];
} 

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
    ShowInHome: boolean;
  }
  
  export interface NewsResponse {
    TotalItems: number;
    TotalPages: number;
    CurrentPage: number;
    PageSize: number;
    Items: News[];
  } 

  export interface NavigationListItemDto {
    DocumentType: string;
    Id: number;
    Items: NavigationListItemDto[] | null;
    Text: string;
    Url: string;
  }

  export interface NavigationMenuResponse {
    NavigationItems: NavigationListItemDto[];
  }
  
  
  