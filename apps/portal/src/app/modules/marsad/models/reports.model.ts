export interface Report {
    ReportId: string;
    ReportTitle: string;
    ReportTitleEn: string | null;
    ReportDesc: string;
    ReportDescEn: string | null;
    Link: string;
    HasPrivilege: boolean;
}

export interface ReportCategory {
    Desc: string | null;
    DescEn: string | null;
    Reports: Report[];
    Id: number;
    Title: string;
    TitleEn: string | null;
}

export type ReportsResponse = ReportCategory[];
