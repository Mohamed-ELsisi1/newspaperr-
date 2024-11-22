import { Component } from '@angular/core';
import { HeaderComponent } from "../../template/header/header.component";
import { NavbarComponent } from "../../template/navbar/navbar.component";
import { FooterComponent } from "../../template/footer/footer.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../service/category.service';
import { EditorService } from '../../service/editor.service';

@Component({
  selector: 'app-addcategory',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, FooterComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css'
})
export class AddcategoryComponent {
  addCategoryForm:FormGroup;
  allEditors:any = [];
  result={success:false, message:""};
  ngOnInit(): void {
    this.getAllEditors();
  }
  constructor(private categoryService:CategoryService, private editorService:EditorService)
  {
    this.addCategoryForm = new FormGroup({
      name:new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      id_manager:new FormControl('',[
        Validators.required
      ])
    });
  }
  getAllEditors(){
    this.editorService.getAllEditorsData().subscribe(
      response=>{
        this.allEditors = response;
      },
      error=>{
        console.error('حدث خطأ:', error);
      }
    );
  }
  addCategory(){
    // get editor data from form 
    const newCategory = {name:this.addCategoryForm.value.name, id_manager:this.addCategoryForm.value.id_manager};
    this.categoryService.storeNewCategory(newCategory).subscribe(
      response=>{
        //console.log(response);
        this.result = response;
      },
      error=>{
        console.error('حدث خطأ:', error)
      }
    );
  }
}
