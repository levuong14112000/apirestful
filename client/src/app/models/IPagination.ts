import { IProduct } from "./products";


export interface IPagination {
    pageNumber: number;
   pageSize: number;
   totalCount: number;
   data: IProduct[];
}