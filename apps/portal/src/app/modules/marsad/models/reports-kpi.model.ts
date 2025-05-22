export interface KpiDetail {
    Title: string;
    Value: number;
}

export interface KpiReport {
    Summary: string;
    SummaryEn: string;
    Growth: string;
    GrowthEn: string;
    Key: string;
    Details: KpiDetail[];
    Id: number;
    Title: string;
    TitleEn: string;
}

export interface KpiReportsResponse {
    reports: KpiReport[];
}
