import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { ManageService } from '../_services/manage.service';

@Component({
  selector: 'app-hradmin',
  templateUrl: './hradmin.component.html',
  styleUrls: ['./hradmin.component.css']
})
export class HradminComponent implements OnInit {
  model = {
    'managermail':'',
    'email':'',
    'firstname':'',
    'lastname':'',
    'dob': Date,
    'position':''
  };

  employeeswhole = [];
  employeeswholemail = [];
  chosenemployee ="";
  x=0;

  relievemodel : any ={
    'firstName':'',
    'email': ''
  }


  constructor(public accountService : AccountService, public router: Router, public toastr: ToastrService, public manageService : ManageService) { }

  ngOnInit(): void {
    if(this.accountService.position != 'HR'){
      this.router.navigateByUrl('/timesheet');
    }
    this.employeeswhole = JSON.parse(localStorage.getItem("employeeswhole"));
    this.employeeswholemail = JSON.parse(localStorage.getItem("employeeswholemail"));
  }

  addemployee(){
    this.model.managermail = this.accountService.username;
    this.accountService.adduser(this.model).subscribe(response => {
      this.toastr.info("Added Successfully");
      console.log(response);
      
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    }) 

  }
  relieveemployee(){
    for(let i =0; i< this.employeeswhole.length; i++){
      if(this.employeeswhole[i] == this.chosenemployee){
        this.x = i
      }
    }
    console.log(this.x);
    console.log( this.employeeswholemail[this.x]);
    console.log(this.employeeswhole[this.x]);
    this.relievemodel.email = this.employeeswholemail[this.x];
    this.relievemodel.firstName = this.employeeswhole[this.x];
    console.log(this.relievemodel);
    this.manageService.deleteuser(this.relievemodel);
    

  }

}
