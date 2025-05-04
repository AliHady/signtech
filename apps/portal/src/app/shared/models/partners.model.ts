export interface Partner {
    Title: string;
    PartnerImage: string | null;
    PartnerLink: string;
    LinkTarget: string;
    SortOrder: number;
    ShowInHome: boolean;
}

export type Partners = Partner[];
