import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass'],
})
export class EditProductComponent {
  idproduct: any;
  product: any;

  formProduct: FormGroup;

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.formProduct = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      price: [
        '',
        Validators.compose([Validators.required, Validators.min(20)]),
      ],
    });
  }

  ngOnInit(): void {
    this.idproduct = this._activatedRoute.snapshot.params['id'];

    this.getProduct(this.idproduct);
  }

  getProduct(idproduct: any) {
    this._productService.getProduct(idproduct).subscribe({
      next: (data: any) => {
        this.product = data.product;
        for (let input in this.formProduct.controls) {
          this.formProduct.patchValue({ [input]: this.product[input] });
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
      },
    });
  }

  updateProduct() {
    const val = this.formProduct.value;

    this._productService.updateProduct(val, this.idproduct).subscribe({
      next: (data: any) => {
        console.log(data);
        this.product = data.product;
        for (let input in this.formProduct.controls) {
          this.formProduct.patchValue({ [input]: this.product[input] });
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.snackBar.open('Producto editado correctamente', 'Entendido', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      },
    });
  }
}
