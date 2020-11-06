import { Component, OnInit,Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../service/dish.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({ 
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
 
  errMess:String;
   

  constructor(private dishservice:DishService,
    @Inject('BaseURL') public baseURL) { }

  ngOnInit(): void {
    this.dishservice.getDishes()
    .subscribe((dishes)=>(this.dishes=dishes),
    errmess => this.errMess = <any>errmess); 
  }
  

} 
