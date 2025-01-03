import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ApiIntService {

  public apiUrl = 'http://localhost:3000';

  constructor( private http : HttpClient){}

  getData(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res : any) => {
      return res;
    }))
  }

  updateData(data : any, id: number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res : any)=> {
      return res;
    }))
  }

  postData(data : any){
    return this.http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res :any)=>{
      return res;
    }))
  }

  delete(id : number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res : any)=>{
      return res;
  }))
}


}
