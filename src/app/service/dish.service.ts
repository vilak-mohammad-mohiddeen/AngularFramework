import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {DISHES} from '../shared/dishes';
import {of, Observable} from 'rxjs';
import {delay} from 'rxjs/Operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map,catchError} from 'rxjs/operators';
import {baseURL} from '../shared/baseurl';
import { ProcessHTTPMsgService } from '../service/process-httpmsg.service';
import { TagContentType } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class DishService {
   dishes:Dish[];
   dish:Dish;

  constructor(private http:HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>( baseURL + 'dishes/').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: String): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }
  putDish(dish :Dish) :Observable<Dish>{
    const httpOptions={
      headers : new HttpHeaders({
        'Content-Type' :'application/json'
      }
      )
    }
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id,dish,httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
