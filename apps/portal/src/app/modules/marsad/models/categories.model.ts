export interface Category {
    Desc: string | null;
    DescEn: string | null;
    TotalCount: number;
    Id: number;
    Title: string;
    TitleEn: string | null;
}

export interface CategoryGroup {
    Categories: Category[];
    Id: number;
    Title: string;
    TitleEn: string | null;
}

export type CategoriesResponse = CategoryGroup[];
