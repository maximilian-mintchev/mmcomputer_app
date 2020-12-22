import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  SAMPLEPOOL_API = 'http://localhost:9090/api';
  heroesUrl = this.SAMPLEPOOL_API + '/heroes';

  constructor(private httpClient: HttpClient) { }

  getHeroes(): Observable<any> {
    // return of(this.audioFiles);

    return this.httpClient.get(this.heroesUrl);

  }
}
