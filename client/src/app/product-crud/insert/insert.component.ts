import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Brands } from 'src/app/models/brands';
import { IProduct } from 'src/app/models/products';
import { Types } from 'src/app/models/types';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent {
  product : IProduct | undefined ;
  @Input() initialValue: any; // Giá trị khởi tạo từ component cha
  updateForm: FormGroup = new FormGroup({
  
  });
  typeIdSelectd : number = 0;
  brandIdSelected : number = 0;
  brandList : Brands[] | undefined;
  typeList : Types[] | undefined;
  imageSrc: string | ArrayBuffer | null = null

  constructor(private shopSevice : ShopService,private fb: FormBuilder,private activatedRoute : ActivatedRoute) {
   
    
  }
  ngOnInit(): void {
    this.loadProduct();
    this.loadBrand();
    this.loadType();
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      file: [],
      productTypeId: [1, Validators.required],
      productBrandId: [1, Validators.required], 
    
    });
  }
  getFile(event: any) {
    const file = event.target.files[0]
    this.updateForm.patchValue({ file })
    this.updateForm.get('file')?.updateValueAndValidity()
    const reader = new FileReader();
    reader.onload = _ => this.imageSrc = reader.result;
    reader.readAsDataURL(file);
  }
  loadProduct(){
    // get product infomation from API
    // add (!) de chac chan la co params
    this.shopSevice.getProductById(+this.activatedRoute.snapshot.paramMap.get('id')!).subscribe(
      {
        next: (p: any) => {
          this.product = p;
        },
        error: (err: any) => {
          console.error(err);
        }
      }
    )
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.updateForm.value.name!);
    formData.append('description', this.updateForm.value.description!);
    formData.append('price', this.updateForm.value.price!.toString()); // Chuyển đổi thành chuỗi nếu cần
    formData.append('productTypeId', this.updateForm.value.productTypeId!);
    formData.append('productBrandId', this.updateForm.value.productBrandId!);
    
  
    if (this.updateForm.value.file) {
      const file = this.updateForm.value.file as File;
      formData.append('file', file);
    }
  
    this.shopSevice.createProduct(formData).subscribe({
      next: () => {
        this.updateForm.reset();
        this.loadProduct();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  loadBrand(){
    this.shopSevice.getBrands().subscribe({
      next: (response: any) => this.brandList = [{id : 0 , name : 'All'}, ...response],
      error: (err: any) => console.log(err)
      
    });
  }
  loadType(){
    this.shopSevice.getTypes().subscribe({
      next: (response: any) => this.typeList = [{id : 0 , name : 'All'}, ...response],
  
      error: (err: any) => console.log(err)
    })
  }
}
