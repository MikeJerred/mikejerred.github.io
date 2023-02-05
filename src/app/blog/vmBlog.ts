export interface IVmBlog {
    blogId: number;
    headline: string;
    updatedDate: number;
    markdown: string;
    prevBlog?: IVmBlog;
    nextBlog?: IVmBlog;
}
