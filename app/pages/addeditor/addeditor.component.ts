import { Component } from '@angular/core';
import { HeaderComponent } from "../../template/header/header.component";
import { NavbarComponent } from "../../template/navbar/navbar.component";
import { FooterComponent } from "../../template/footer/footer.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditorService } from '../../service/editor.service';
import { response } from 'express';

@Component({
  selector: 'app-addeditor',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, FooterComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './addeditor.component.html',
  styleUrl: './addeditor.component.css'
})
export class AddeditorComponent {
  addEditorForm:FormGroup;
  result={success:false, message:""};
  constructor(private editorService:EditorService){
    this.addEditorForm = new FormGroup({
      name:new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      salary:new FormControl('',[
        Validators.required
      ])
    });
  }

  addEditor(){
    // get editor data from form 
    const newEditor = {name:this.addEditorForm.value.name, salary:this.addEditorForm.value.salary};
    this.editorService.storeNewEditor(newEditor).subscribe(
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
