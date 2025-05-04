export interface NavMenuItem {
    Id: number;
    Text: string;
    Url: string;
    DocumentType: 'genericPage' | 'mainSiteList';
    Items: NavMenuItem[] | null;
    HasChilrens: boolean;
}

export type NavMenu = NavMenuItem[];
