import { Component, OnInit } from '@angular/core';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { ɵTestingCompilerFactory } from '@angular/core/testing';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
public a="moin";
public testid="myid";
public classbind="classbind";
public dir={
  "c1":true,"c2":true,"c3":true
}
public mycol="blue";
public dir1={
color:"orange",
fontStyle:"italic",
"c3":true
}
mymet(va){
this.a=va;
}
  constructor() { }

  ngOnInit(): void {
  }

}

