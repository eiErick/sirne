export interface Thumbnail {
    title: string;
    date: Date;
    assessment: number;
    code: number;
}

export interface Post extends Thumbnail {
    blog: string;
    endDate: Date | null;
}