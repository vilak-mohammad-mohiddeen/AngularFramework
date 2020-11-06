import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../service/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../service/promotion.service';
import {LeaderService} from '../service/leader.service';
import {Leader} from '../shared/leader';
import { flyInOut , expand} from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ] 
})
export class HomeComponent implements OnInit {

  dish:Dish;
  promotion:Promotion;
  lead:Leader;
  errMess1:String;
  errMess2:String;
  errMess3:String;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService:LeaderService,
    @Inject('BaseURL') public baseURL) { }

  ngOnInit(): void {
    this.dishservice.getFeaturedDish()
    .subscribe((dish)=>(this.dish=dish),errmess => this.errMess1= <any>errmess);
    this.promotionservice.getFeaturedPromotion()
    .subscribe((promotion)=>(this.promotion=promotion),errmess => this.errMess2 = <any>errmess);
    this.leaderService.getFeaturedLeader()
    .subscribe((lead)=>(this.lead=lead),errmess => this.errMess3 = <any>errmess);
  }

}
