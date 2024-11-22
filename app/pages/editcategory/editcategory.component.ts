import { Component } from '@angular/core';
import { HeaderComponent } from "../../template/header/header.component";
import { NavbarComponent } from "../../template/navbar/navbar.component";
import { FooterComponent } from "../../template/footer/footer.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../service/category.service';
import { EditorService } from '../../service/editor.service';

@Component({
  selector: 'app-editcategory',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, FooterComponent, RouterLink,FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './editcategory.component.html',
  styleUrl: './editcategory.component.css'
})
export class EditcategoryComponent {
  editCategoryForm:FormGroup;
  id: string | null = null; // get id 
  allEditors:any = [];
  result={success:false, message:""};
  ngOnInit(): void {
    this.getAllEditors();
    // get id here 
    this.route.paramMap.subscribe(
      params=>{
        this.id = params.get('id');
      }
    );
    this.getCategory();
  }
  constructor(private categoryService:CategoryService, private route:ActivatedRoute, private editorService:EditorService)
  {
    this.editCategoryForm = new FormGroup({
      name:new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      id_manager:new FormControl('',[
        Validators.required,
      ]),
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
  getCategory(){
    this.categoryService.getCategoryByIdData(this.id).subscribe(
      response=>{
        //console.log(response);
        // set data into your form 
        this.editCategoryForm.patchValue(response);
      },
      error=>{
        console.error('حدث خطأ:', error)
      }
    );
  }
  updateCategoryById()
  {
    // get editor data from form 
    const newCategory = {name:this.editCategoryForm.value.name, id_manager:this.editCategoryForm.value.id_manager, id:this.id};
    this.categoryService.updateCategoryData(newCategory).subscribe(
      response=>{
        this.result = response;
      },
      error=>{
        console.error('حدث خطأ:', error)
      }
    );
  }
}
