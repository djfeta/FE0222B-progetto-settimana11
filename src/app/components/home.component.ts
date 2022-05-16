import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as Service from '../models/products.service';

@Component({
  template: `
    <div *ngIf="!products" class="spinner-border text-primary" role="status"></div>
    <div class="d-flex flex-wrap justify-content-center">
      <div
        *ngFor="let product of products"
        class="card text-center my-2 mx-2"
        style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">{{ product.price }} €</p>
          <a href="#" class="btn btn-primary" (click)="addToCart(product)">Acquista</a>
          <a href="#" class="ms-2 btn btn-light" [routerLink]="['', product.id]">Dettagli</a>
        </div>
      </div>
    </div>`,
  styles: [],
})
export class HomeComponent implements OnInit {
  public products!: Service.Product[];

  constructor(private Service: Service.ProductsService) {}

  ngOnInit(): void {
    if (this.Service.products) {
      this.products = this.Service.products;
    } else {
      this.Service.fetchProducts();
      this.Service.productsLoaded.subscribe((products) => {
        this.products = products as Service.Product[];
      });
    }
  }

  addToCart(product: Service.Product) {
    this.Service.cart.push(product);
  }
}
