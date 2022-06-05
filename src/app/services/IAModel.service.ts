import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IAModelService  {
   lengthAllIAModeles : number ; 
   AllIAModeles : any[]=[] ;
   
  constructor(private http: HttpClient) { }

  private urlAddFile ="http://localhost:8281/IAModel/add" ; 
  addFile(file : File , idAdminDigital: number ): Observable<any> {
  return this.http.post(`${this.urlAddFile}/${idAdminDigital}` ,file );
}


private urlGetAll="http://localhost:8281/IAModel/all"
getAllFiles(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.urlGetAll}`, {});
}

private urlDeleteById="http://localhost:8281/IAModel/delete"
deleteById(idIAModel : number): Observable<any> {
    return this.http.delete<any>(`${this.urlDeleteById}/${idIAModel}`, {});
}


}