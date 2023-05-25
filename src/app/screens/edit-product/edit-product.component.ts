import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, finalize, forkJoin } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { CategoryService } from 'src/app/services/category/category.service';
import { ColorService } from 'src/app/services/color/color.service';
import { FormService } from 'src/app/services/form/form.service';
import { ProductService } from 'src/app/services/product/product.service';
// Interfaces
import {
  ProductDetailsFull,
  ProductSizeWithId,
} from 'src/app/interfaces/Product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  dbProductDetails: ProductDetailsFull[];
  id: number;
  editProductForm$: Observable<InputBase<string>[]>;

  constructor(
    private formService: FormService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private colorService: ColorService,
    private categoryService: CategoryService
  ) {
    const { sizes, colors, categories, brands, product } =
      this.route.snapshot.data['updateProductsResolver'];

    this.dbProductDetails = [...product.productDetails];

    delete product.productImages;
    this.editProductForm$ = this.formService.editProductForm(
      product,
      sizes,
      brands,
      colors,
      categories
    );

    this.id = product.product.id;
  }

  ngOnInit(): void {
    const { product, sizes, brands } =
      this.route.snapshot.data['updateProductsResolver'];

    this.translate.onLangChange.subscribe((langObj) => {
      const colors$ = this.colorService.getColors(langObj.lang);
      const categories$ = this.categoryService.getCategories(langObj.lang);

      forkJoin([colors$, categories$]).subscribe(([colors, categories]) => {
        this.editProductForm$ = this.formService.editProductForm(
          product,
          sizes,
          brands,
          colors,
          categories
        );
      });
    });
  }

  onSubmit(data: any) {
    const updatedDetails = [...data.productDetails];

    const sizesIdToRemove: string[] = [];
    const sizesToAdd: object[] = [];
    const sizesToEdit: object[] = [];

    // Check taglie da aggiungere e editare
    updatedDetails.forEach((details: any) => {
      // Se una taglia negli updatedDetails non è presente nel db, è da aggiungere nel db
      details.product_id = this.id;
      const index = this.dbProductDetails.findIndex((item: any) => {
        // Se una taglia negli updatedDetails è presente nel db, è da verificare che non sia stata aggiornata
        if (item.size === details.size) {
          if (
            details.quantity !== item.quantity ||
            details.sellingPrice !== item.sellingPrice
          ) {
            sizesToEdit.push({ id: item.id, details });
          }
        }

        return item.size === details.size;
      });
      if (index === -1) sizesToAdd.push(details);
    });

    // Check taglie da eliminare
    this.dbProductDetails.forEach((details: any) => {
      // Se una taglia del db non è presente in updatedDetails, è da eliminare dal db
      const index = updatedDetails.findIndex((item: any) => {
        return item.size === details.size;
      });
      if (index === -1) sizesIdToRemove.push(details.id);
    });

    const product: any = {
      isListed: 1,
      imagePreview: '/nopreview',
    };

    for (let key in data) {
      if (key !== 'productDetails' && key !== 'productImages') {
        product[key] = data[key];
      }
    }

    const editedProduct: any = {
      product,
      productImages: data.productImages,
    };

    // API taglie
    if (sizesIdToRemove && sizesIdToRemove.length > 0) {
      sizesIdToRemove.forEach((item: any) => {
        this.productService.deleteProductSize(item).subscribe();
      });
    }

    if (sizesToAdd && sizesToAdd.length > 0) {
      sizesToAdd.forEach((item: any) => {
        this.productService.addProductDetails(item).subscribe();
      });
    }

    if (sizesToEdit && sizesToEdit.length > 0) {
      sizesToEdit.forEach((item: any) => {
        this.productService
          .updateProductDetails(item.details, item.id)
          .subscribe();
      });
    }

    // Edit informazioni prodotto e immagini
    this.productService
      .updateProduct(editedProduct, this.id)
      .pipe(
        finalize(() =>
          this.router.navigate([`dashboard/products/detail-product/${this.id}`])
        )
      )
      .subscribe();
  }
}
