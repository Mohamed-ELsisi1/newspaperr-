import { Component } from '@angular/core';
import { HeaderComponent } from "../../template/header/header.component";
import { NavbarComponent } from "../../template/navbar/navbar.component";
import { FooterComponent } from "../../template/footer/footer.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-allcategories',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, FooterComponent, CommonModule, RouterLink],
  templateUrl: './allcategories.component.html',
  styleUrl: './allcategories.component.css'
})
export class AllcategoriesComponent {
  result={success:false, message:""};
  allCategories:any = [];
  ngOnInit(): void {
    this.getAllCategories();
  }
  public constructor(private categoryService:CategoryService){}
  
  getAllCategories(){
    this.categoryService.getAllcategoriesData().subscribe(
      response=>{
        this.allCategories = response;
        console.log(response);
      },
      error=>{
        console.error('حدث خطأ:', error);
      }
    );
  }
  deleteCategory(id:number)
  {
    this.categoryService.deleteCategoryData(id).subscribe(
      response=>{
        this.result = response;
      },
      error=>{
        console.error('حدث خطأ:', error);
      }
    );
    confirm("are you sure to delete");
  }
}
