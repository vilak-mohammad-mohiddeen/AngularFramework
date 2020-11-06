import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import { Observable,of } from 'rxjs';
import {delay} from 'rxjs/operators';
import {baseURL} from '../shared/baseurl';
import {HttpClient} from '@angular/common/http';
import {map,catchError} from 'rxjs/operators';
import {ProcessHTTPMsgService} from '../service/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  leader:Leader[]=LEADERS;

  constructor(private http :HttpClient,
    private processhttpmsg :ProcessHTTPMsgService) { }
  getLeaders():Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL + 'leadership');
  }
  getFeaturedLeader():Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership?featured=true').pipe(map(leaders=>leaders[0]))
    .pipe(catchError(this.processhttpmsg.handleError));
  }
}
