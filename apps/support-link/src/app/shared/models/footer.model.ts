export interface FooterSubMenu {
  Id: number;
  Title: string;
  TitleEn: string;
  Url: string | null;
  DisplayOrder: number;
  FooterMenuId: number;
  FooterMenu: any;
}

export interface FooterModel {
  Id: number;
  Title: string;
  TitleEn: string;
  DisplayOrder: number;
  footerMenuId: number;
  SubMenus: FooterSubMenu[];
}