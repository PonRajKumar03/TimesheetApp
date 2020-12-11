import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  model: any = {};
  registerMode = false;
  loggedin = false;
  addmode = false;
  model1 = {
    'managermail':'',
    'email':'',
    'firstname':'',
    'lastname':'',
    'dob': Date,
    'position':''
  };


  constructor(public accountService : AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.checkifloggedin();
  }

  checkifloggedin(){
    if (this.accountService.currentUser$){
      this.router.navigateByUrl('/timesheet');
    }
  }

  registertoggle(){
    this.registerMode = !this.registerMode;
  }

  addtoggle(){
    this.addmode = !this.addmode;
  }


  login(){
    if(this.model.email == null){
      this.toastr.error("Username not given")
    }
    else if(this.model.password == null){
      this.toastr.error("Please enter password")
    }
    else{
      this.accountService.login(this.model).subscribe(response => {
        this.router.navigateByUrl('/timesheet');
        this.loggedin = true;
        localStorage.setItem('usestat', 'true');
        
      }, error => {
        console.log(error);
        this.toastr.error(error.error);
      })
    }
    
  }
  home(){
   window.location.reload();
  }
  addemployee(){
    this.accountService.adduser(this.model1).subscribe(response => {
      this.home();
      this.toastr.info("Added Successfully");
      console.log(response);      
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    }) 
  }

  cancel(){
    this.registertoggle();
    
  }
  
  register(){
    
    if(this.model.password == this.model.test){
    this.accountService.registernewuser(this.model).subscribe(response =>{
      console.log(response);
      this.cancel();
      this.loggedin = true;
    }, error => {
      console.log(error);
      this.toastr.error(error.error);  
    })
  }
  else{
    this.toastr.error("Passwords don't match")
  }
}
}
