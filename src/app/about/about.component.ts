import { Component, OnInit ,Inject} from '@angular/core';
import {Leader} from '../shared/leader';
import {LeaderService} from '../service/leader.service';
import { flyInOut, expand } from '../animations/app.animation';
import { baseURL } from '../shared/baseurl';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

leader:Leader[];

  constructor(private leaderService:LeaderService,
    @Inject('BaseURL') public baseURL) { }

  ngOnInit(): void{
    this.leaderService.getLeaders()
    .subscribe((leader)=>(this.leader=leader));

  }

}
