import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  public getRequestParams(sortBy: string, page: number, pageSize: number) {
    return new HttpParams()
      .set('sortBy', sortBy)
      .set('pageNo', JSON.stringify(page))
      .set('pageSize', JSON.stringify(pageSize));
  }

 

}
