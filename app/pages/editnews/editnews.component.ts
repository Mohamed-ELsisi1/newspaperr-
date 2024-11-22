import { Component } from '@angular/core';
import { FooterComponent } from "../../template/footer/footer.component";
import { NavbarComponent } from "../../template/navbar/navbar.component";
import { HeaderComponent } from "../../template/header/header.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../service/news.service';
import { CategoryService } from '../../service/category.service';
import { EditorService } from '../../service/editor.service';

@Component({
  selector: 'app-editnews',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, HeaderComponent, RouterLink, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './editnews.component.html',
  styleUrl: './editnews.component.css'
})
export class EditnewsComponent {
  editNewsForm:FormGroup;
  result={success:false, message:""};
  selectedFile!: File;
  allEditors:any = [];
  allCategories:any = [];
  id: string | null = null; // get id 
  constructor(private newsService:NewsService, private categoryService:CategoryService, private editorService:EditorService, private route: ActivatedRoute){
    this.editNewsForm = new FormGroup({
      title:new FormControl('', [
        Validators.required
      ]),
      content:new FormControl('', [
        Validators.required
      ]),
      id_editor:new FormControl('', [
        Validators.required
      ]),
      id_category:new FormControl('', [
        Validators.required
      ]),
      mainImage:new FormControl(null, [
        Validators.required
      ]),
    });
  }
  ngOnInit(){
    // get id here 
    this.route.paramMap.subscribe(
      params=>{
        this.id = params.get('id');
      }
    );
    this.getAllEditors();
    this.getAllCategories();
    this.getNews();
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
  
  getNews(){
    this.newsService.getNewsIdData(this.id).subscribe(
      response=>{
        this.editNewsForm.patchValue(response);
      },
      error=>{
        console.error('حدث خطأ:', error)
      }
    );
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  updateNewsById()
  {
    const newNews = {id:this.id,title:this.editNewsForm.value.title, "content":this.editNewsForm.value.content, "id_editor":this.editNewsForm.value.id_editor, "id_category":this.editNewsForm.value.id_category,"main_image":this.selectedFile};
    this.newsService.updateNewsData(newNews).subscribe(
      response=>{
        this.result = response;
      },
      error=>{
        console.error('حدث خطأ:', error)
      }
    );
  }
}
