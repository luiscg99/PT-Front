import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'products-list', pathMatch: 'full' },
  {
    path: 'product/:id',
    component: ProductComponent,
  },
  {
    path: 'products-list',
    component: ProductsListComponent,
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
