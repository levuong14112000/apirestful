import { Routes } from "@angular/router";
import { ShopComponent } from "./shop.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";


export const ShopRoute: Routes = [
    {path: '', component: ShopComponent},
    {path: 'product/:id', component: ProductDetailComponent}
];