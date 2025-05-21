export interface Partner {
    Title: string;
    Image: string | null;
    Link: string;
    LinkTarget: string;
    SortOrder: number;
}

export type Partners = Partner[];
