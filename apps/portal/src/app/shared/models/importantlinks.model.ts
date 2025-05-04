export interface ImportantLink {
    Title: string;
    Link: string;
    LinkTarget: string;
    SortOrder: number;
    RollupImage: string | null;
    ShowInHome: boolean;
}

export interface ImportantLinks {
    links: ImportantLink[];
}
