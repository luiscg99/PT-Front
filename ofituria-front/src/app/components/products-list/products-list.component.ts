import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.sass'],
})
export class ProductsListComponent {
  products: any;

  formAddProduct: FormGroup;

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.formAddProduct = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      price: [
        '',
        Validators.compose([Validators.required]),
      ],
    });
  }

  ngOnInit() {
    this.getProductos();
  }

  getProductos(): void {
    this._productService.getProductos().subscribe({
      next: (data: any) => {
        console.log(data);

        this.products = data.products;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  }

  createProduct() {
    console.log(this.formAddProduct.value);

    this._productService.createProduct(this.formAddProduct.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.products = data.products;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.snackBar.open('Producto añadido correctamente', 'Entendido', {
          duration: 3000,
          verticalPosition: 'top',
        });
        this.formAddProduct.reset();
        this.modalService.dismissAll();
      },
    });
  }

  deleteProduct(idproduct: any) {

    this._productService.deleteProduct(idproduct).subscribe({
      next: (data: any) => {
        console.log(data);
        this.products = data.products;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.snackBar.open('Producto eliminado correctamente', 'Entendido', {
          duration: 13000,
          verticalPosition: 'bottom'
        });
        this.modalService.dismissAll();
      },
    });
  }

  viewProduct(id: any): void {
    this._router.navigate(['product', id]);
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-add-product' });
  }
}
