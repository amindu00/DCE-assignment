export interface IListUsers {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: any,
    support: { url: string, text: string }
}