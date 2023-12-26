import { RouterModule, Routes } from "@angular/router";
import { ProductCrudComponent } from "./product-crud.component";
import { InsertComponent } from "./insert/insert.component";
import { UpdateComponent } from "./update/update.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";





export const ProductCrudRoutes: Routes = [
    {path: '', component : ProductCrudComponent},
    {path: 'insert', component: InsertComponent},
    {path: 'update/:id', component: UpdateComponent},
  
];