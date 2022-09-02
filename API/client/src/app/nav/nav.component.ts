import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn: boolean;
  currentAccount$ : Observable<User>;

  constructor(private accountServices: AccountService) { }

  ngOnInit() {
    this.currentAccount$ = this.accountServices.currentUser$;
  }
  login() {
    this.accountServices.login(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  logOut() {
    this.accountServices.logout();
  }
}
