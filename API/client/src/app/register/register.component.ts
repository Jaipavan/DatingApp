import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit 
{
  @Output() cancelRegistration = new EventEmitter();
  cancelRegister  = false;
   model:any = {};

  constructor( private accountServices : AccountService,private router: Router,
    private toastr : ToastrService ) { }

  ngOnInit(): void {
  }

  register()
  {
    this.accountServices.register(this.model).subscribe(response =>{
      console.log(response);
      this.cancel();
    },error => {
      console.log(error);
      this.toastr.error(error.error);

    });
  }
  cancel()
  {
   this.cancelRegistration.emit(false);
  }
}
