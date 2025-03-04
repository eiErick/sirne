export interface Thumbnail {
    title: string;
    date: Date;
    assessment: number;
    code: string;
}

export interface Post extends Thumbnail {
    blog: string;
    endDate: Date | null;
}