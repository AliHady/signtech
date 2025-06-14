export interface FooterModel {
    Title: string;
    Image: string | null;
    Link: string;
    LinkTarget: string;
    SortOrder: number;
}

export type Footer = FooterModel[];
