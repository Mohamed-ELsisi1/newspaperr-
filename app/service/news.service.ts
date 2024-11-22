import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private url = "http://localhost:8000/api/news/";
  constructor(private http:HttpClient) { }
  // publisher
  getAllNewsData():Observable<any[]>{
    return this.http.get<any[]>(this.url+"all");
  }
  // publisher 
  addNewsToServer(news: { title: string; content:string; id_editor:string; id_category:string; main_image: File}): Observable<any> {
    var formsData = new FormData();
    formsData.append("title",news.title);
    formsData.append("content",news.content);
    formsData.append("id_editor",news.id_editor);
    formsData.append("id_category",news.id_category);
    formsData.append("main_image",news.main_image);
    return this.http.post(this.url+"store", formsData);
  }
  // publisher 
  deleteNewsData(id:number): Observable<any>
  {
    return  this.http.delete(this.url+id+"/delete");
  }
  // publisher 
  getNewsIdData(id:string|null): Observable<any>
  {
    return  this.http.get(this.url+id+"/show");
  }
  // publisher 
  updateNewsData(newNews: {id:any; title: string; content:string; id_editor:string; id_category:string; main_image: File}): Observable<any>{
    var formsData = new FormData();
    formsData.append("id",newNews.id);
    formsData.append("title",newNews.title);
    formsData.append("content",newNews.content);
    formsData.append("id_editor",newNews.id_editor);
    formsData.append("id_category",newNews.id_category);
    formsData.append("main_image",newNews.main_image);
    return this.http.patch(this.url+newNews.id+"/update",formsData);
  }
}
