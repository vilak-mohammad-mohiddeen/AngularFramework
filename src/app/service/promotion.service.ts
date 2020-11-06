import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import {PROMOTIONS} from '../shared/promotions';
import { Observable,of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {baseURL} from '../shared/baseurl';
import {HttpClient} from '@angular/common/http';
import {map,catchError} from 'rxjs/operators';
import {ProcessHTTPMsgService} from '../service/process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient,
    private processhttpmsg : ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions').pipe(catchError(this.processhttpmsg.handleError));
  }

  getPromotion(id: string):Observable< Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id).pipe(catchError(this.processhttpmsg.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true').pipe(map(dishes=>dishes[0]))
    .pipe(catchError(this.processhttpmsg.handleError));
  }
}
