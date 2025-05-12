export interface ImportantLink {
    Title: string;
    Link: string;
    LinkTarget: string;
    SortOrder: number;
    RollupImage: string | null;
    ShowInHome: boolean;
}

export interface ImportantLinks {
    TotalItems: number;
    TotalPages: number;
    CurrentPage: number;
    PageSize: number;
    Items: ImportantLink[];
}
