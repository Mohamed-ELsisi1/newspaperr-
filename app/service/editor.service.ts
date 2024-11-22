import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private url = "http://localhost:8000/api/editor/";
  constructor(private http:HttpClient) { }
  // get all editors from jsonplaceholder // publisher 
  getAllEditorsData():Observable<any[]>{
      // url : http://localhost:8000/api/editor/all"
      return this.http.get<any[]>(this.url+"all");
  }
  // publisher 
  storeNewEditor(newEditor:{name:string, salary:number}): Observable<any>{
    // url : http://localhost:8000/api/editor/store"
    return this.http.post(this.url+"store",newEditor);
  }
  // publisher 
  deleteEditorData(id:number): Observable<any>
  {
    // url : http://localhost:8000/api/editor/1/delete"
    return  this.http.delete(this.url+id+"/delete");
  }
  // publisher 
  getEditorByIdData(id:string|null): Observable<any>
  {
    // url : http://localhost:8000/api/editor/1/show"
    return  this.http.get(this.url+id+"/show");
  }
  // publisher 
  updateEditorData(newEditor:{id:any,name:string, salary:number}): Observable<any>{
    // url : http://localhost:8000/api/editor/1/update"
    return this.http.patch(this.url+newEditor.id+"/update",newEditor);
  }
}
