import { Component } from '@angular/core';
import { HeaderComponent } from '../../template/header/header.component';
import { FooterComponent } from "../../template/footer/footer.component";
import { NavbarComponent } from "../../template/navbar/navbar.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../service/news.service';
import { response } from 'express';
import { CategoryService } from '../../service/category.service';
import { EditorService } from '../../service/editor.service';


@Component({
  selector: 'app-addnews',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NavbarComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './addnews.component.html',
  styleUrl: './addnews.component.css'
})
export class AddnewsComponent {
  result={success:false, message:""};
  selectedFile!: File;
  addNewsForm:FormGroup;
  allEditors:any = [];
  allCategories:any = [];
  ngOnInit(): void {
    this.getAllEditors();
    this.getAllCategories();
  }
  constructor(private newsService:NewsService, private categoryService:CategoryService, private editorService:EditorService ){
    this.addNewsForm = new FormGroup({
      title:new FormControl('',[
        Validators.required
      ]),
      content:new FormControl('',[
        Validators.required
      ]),
      id_editor:new FormControl('',[
        Validators.required
      ]),
      id_category:new FormControl('',[
        Validators.required
      ]),
      mainImage:new FormControl(null,[
        Validators.required
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
  getAllCategories(){
    this.categoryService.getAllcategoriesData().subscribe(
      response=>{
        this.allCategories = response;
      },
      error=>{
        console.error('حدث خطأ:', error);
      }
    );
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
 }
  addNews(){
    const newNews = {title:this.addNewsForm.value.title, "content":this.addNewsForm.value.content, "id_editor":this.addNewsForm.value.id_editor, "id_category":this.addNewsForm.value.id_category,"main_image":this.selectedFile};
    this.newsService.addNewsToServer(newNews).subscribe(
      response=>{
        this.result = response;
      },
      error=>{
        console.error('حدث خطأ:', error)
      }
    );
  }
}
