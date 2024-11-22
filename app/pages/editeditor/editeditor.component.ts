import { Component } from '@angular/core';
import { HeaderComponent } from "../../template/header/header.component";
import { NavbarComponent } from "../../template/navbar/navbar.component";
import { FooterComponent } from "../../template/footer/footer.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditorService } from '../../service/editor.service';
import { response } from 'express';

@Component({
  selector: 'app-editeditor',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, FooterComponent, RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './editeditor.component.html',
  styleUrl: './editeditor.component.css'
})
export class EditeditorComponent {
  EditEditorForm:FormGroup;
  id: string | null = null; // get id 
  result={success:false, message:""};
  constructor(private editorService:EditorService, private route:ActivatedRoute){
    this.EditEditorForm = new FormGroup({
      name:new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      salary:new FormControl('',[
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
    this.getEditor();
  }
  getEditor(){
    this.editorService.getEditorByIdData(this.id).subscribe(
      response=>{
        //console.log(response);
        // set data into your form 
        this.EditEditorForm.patchValue(response);
      },
      error=>{
        console.error('حدث خطأ:', error)
      }
    );
  }
  updateEditorById()
  {
    // get editor data from form 
    const newEditor = {name:this.EditEditorForm.value.name, salary:this.EditEditorForm.value.salary, id:this.id};
    this.editorService.updateEditorData(newEditor).subscribe(
      response=>{
        this.result = response;
      },
      error=>{
        console.error('حدث خطأ:', error)
      }
    );
  }
}
