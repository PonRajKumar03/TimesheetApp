import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { ManageService } from '../_services/manage.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  model = {
    'userName':'',
    'password':'',
    'testPassword':''
  }
  constructor(public accountService: AccountService, public toastr: ToastrService, public manageService : ManageService, public router: Router) { }

  ngOnInit(): void {
  }
  change(){
    this.model.userName = this.accountService.username;
    if(this.model.password != this.model.testPassword){
      this.toastr.error("Passwords do not match")
    }
    else{
      this.manageService.changepassword(this.model).subscribe(
        response =>{
          this.toastr.info("Password Change Successful");
          this.router.navigateByUrl('/timesheet');
          
        }
      );
    }
    
  }
}
