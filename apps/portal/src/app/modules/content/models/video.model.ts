export interface VideoItem {
    Title: string;
    URL: string;
    CreateDate: string;
    VideoImage: string;
    VideoFile: string;
}

export interface VideoResponse {
    TotalItems: number;
    TotalPages: number;
    CurrentPage: number;
    PageSize: number;
    Items: VideoItem[];
}
