import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = "http://localhost:8000/api/category/";
  constructor(private http:HttpClient) { }
  // get all categories from jsonplaceholder // publisher 
  getAllcategoriesData():Observable<any[]>{
    // url : http://localhost:8000/api/category/all"
    return this.http.get<any[]>(this.url+"all");
  }
  // publisher 
  storeNewCategory(newCategory:{name:string, id_manager:number}): Observable<any>{
    // url : http://localhost:8000/api/category/store"
    return this.http.post(this.url+"store",newCategory);
  }
  // publisher 
  deleteCategoryData(id:number): Observable<any>
  {
    // url : http://localhost:8000/api/category/1/delete"
    return  this.http.delete(this.url+id+"/delete");
  }
  // publisher 
  getCategoryByIdData(id:string|null): Observable<any>
  {
    // url : http://localhost:8000/api/category/1/show"
    return  this.http.get(this.url+id+"/show");
  }
  // publisher 
  updateCategoryData(newCategory:{id:any,name:string, id_manager:number}): Observable<any>{
    // url : http://localhost:8000/api/category/1/update"
    return this.http.patch(this.url+newCategory.id+"/update",newCategory);
  }
}
