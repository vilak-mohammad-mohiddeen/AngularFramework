import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Feedback} from '../shared/feedback';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import {catchError} from 'rxjs/operators';
import {ProcessHTTPMsgService} from '../service/process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    public http:HttpClient, 
    public processHTTPMsgService :ProcessHTTPMsgService) { }

  submitFeedback(gotfeedback :Feedback):Observable<Feedback>{
    const httpOptions={
      headers:new HttpHeaders({
        'ContentType':'application/json'
      })
    }
    return this.http.post<Feedback>(baseURL + 'feedback/',gotfeedback,httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));;
    
  }
}
