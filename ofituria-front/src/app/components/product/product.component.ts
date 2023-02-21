import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass'],
})
export class ProductComponent {
  idproduct: any;
  product:any;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this.idproduct = this._activatedRoute.snapshot.params['id'];

    this.getProduct(this.idproduct);
  }

  getProduct(idproduct: any) {
    this._productService.getProduct(idproduct).subscribe({
      next: (data: any) => {
        console.log(data);
        this.product = data.product;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {

      },
    });
  }

}
