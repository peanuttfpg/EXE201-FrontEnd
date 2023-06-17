export type Blog = {
    id: number;
    title: string;
    content: string;
    publicDate: Date;
    createdDate: Date;
    status: string;
    images: BlogImage[];
};

export type BlogImage = {
    id: number;
    url: string;
}