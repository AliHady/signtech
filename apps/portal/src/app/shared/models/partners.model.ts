export interface Partner {
    Title: string;
    Image: string | null;
    Link: string;
    LinkTarget: string;
    SortOrder: number;
    ShowInHome: boolean;
}

export type Partners = Partner[];
