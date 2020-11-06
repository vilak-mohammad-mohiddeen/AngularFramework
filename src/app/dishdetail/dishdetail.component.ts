import { Component, OnInit, ViewChild,Inject} from '@angular/core';

import {Dish} from '../shared/dish';
import {Params ,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {DishService} from '../service/dish.service';
import { switchMap } from 'rxjs/Operators';
import {routes} from '../app-routing/routes';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Comment} from '../shared/comment'; 
import { visibility ,flyInOut} from '../animations/app.animation';




@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations:[
    visibility(),
    flyInOut()
   
  ]
})
export class DishdetailComponent implements OnInit {

  @ViewChild('fform') commentFormDirective;
  
  dish:Dish;
  dishcopy:Dish;
  dishIds:String[];
  prev:String;
  next:String;
  comment:Comment;
  comForm:FormGroup;
  visibility='shown';
 
  errMess:String;
 
  formErrors={
    'author' : '',
    'comment' : ''
  };
  tempojson={
    'author':'',
    'comment':''
  }

  validationMessages={
    'author':{
        'required':'Author name is required',
        'minlength':'Author name must be at least 2 characters long.'
    },
    'comment':{
      'required':'Comment is required'
    }
  };


  constructor(private dishservice:DishService,
    private route:ActivatedRoute,
    private location:Location,
    public fb:FormBuilder,
    @Inject('BaseURL') public baseURL ) { 
      this.createCommenting();
    } 

  ngOnInit(): void {
    this.dishservice.getDishIds()
    .subscribe((dishIds)=>(this.dishIds=dishIds));
   
    this.route.params.pipe(switchMap((params :Params)=>{this.visibility='hidden';return this.dishservice.getDish(params['id']);}))
    .subscribe((dish)=>{this.dish=dish;this.dishcopy=dish;this.visibility='shown';
                        this.setNextPrev(dish.id)},
                        errmess => this.errMess = <any>errmess);
   
    
  }
  setNextPrev(dishId : String){

    const index=this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack(){
    this.location.back();
  }
  submitValue(){
    this.comment=this.comForm.value;
    this.comment.date=new Date().toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
    .subscribe(dish=>{this.dish=dish;this.dishcopy=dish;},
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    this.comForm.reset({
      author: '' ,
      rating: 5 ,
      comment: ''
    });
    this.commentFormDirective.resetForm();

  }
  createCommenting(){

   this.comForm=this.fb.group({
    author:['',[Validators.required,Validators.minLength(2)]],
    rating:['5'],
    comment:['',[Validators.required]]
   });
   this.comForm.valueChanges
   .subscribe((data)=>(this.valueChanged(data)));
   this.valueChanged();

  }
  valueChanged(data?:any){
    if(!this.comForm){
      return;
    }
    const form=this.comForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field]='';
        const control=form.get(field);
        if(control && control.dirty && !control.valid){
          const messages=this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] +=messages[key] + '';
           }
          }
        }
      }
    }
  }

}
