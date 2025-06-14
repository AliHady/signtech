export interface HeaderItem {
    Id: number;
    Title: string;
    TitleEn: string;
    Url: string;
    SubMenus: HeaderItem[] | null;
}

export type Header = HeaderItem[];
