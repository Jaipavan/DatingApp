import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  baseUr='https://localhost:5001/api';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  get404Error(){
    this.http.get(this.baseUr + 'buggy/not-found').subscribe(response => {
      console.log(response);
    },error =>{
      console.log(error);
    })
  }
  get400Error(){
    this.http.get(this.baseUr + 'buggy/bad-request').subscribe(response => {
      console.log(response);
    },error =>{
      console.log(error);
    })
  }
  get500Error(){
    this.http.get(this.baseUr + 'buggy/server-error').subscribe(response => {
      console.log(response);
    },error =>{
      console.log(error);
    })
  }
  get401ValidationError(){
    this.http.get(this.baseUr + 'buggy/not-found').subscribe(response => {
      console.log(response);
    },error =>{
      console.log(error);
    })
  }
  get401Error(){
    this.http.get(this.baseUr + 'buggy/auth').subscribe(response => {
      console.log(response);
    },error =>{
      console.log(error);
    })
  }
}
