import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { ManageService } from '../_services/manage.service';
import {CalendarModule} from 'primeng/calendar';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-manageemployee',
  templateUrl: './manageemployee.component.html',
  styleUrls: ['./manageemployee.component.css']
})
export class ManageemployeeComponent implements OnInit {
  mode = "";
  managemode = "";
  employeelist : [];
  employeeemail : [];
  chosenemployee : string;
  x = 0;
  pullreport = {
    'startDate' : Date,
    'endDate' : Date
  }
  numberofDays : number;
  alloweddatelist = {
    'userEmail' : '',
    'chosenDate' : 0
  }


  commondate = "2020-12-08"
  constructor(public datepipe: DatePipe,public accountService : AccountService, public router: Router, public toastr: ToastrService, public manageService: ManageService) { }
  model: any ={};

  ngOnInit(): void {
    if(this.accountService.position != 'Manager' ){
      this.router.navigateByUrl('/timesheet')
    }
    this.employeelist = JSON.parse(localStorage.getItem('employees'));
    this.employeeemail = JSON.parse(localStorage.getItem('employeeemail'));
  }
  modetoggle(input : string){
    this.mode = input;
  }
  managemodetoggle(input : string){
    this.managemode = input;
  }
  home(){
    this.mode ="";
  }

  done(){
    if(this.numberofDays > 15){
      this.toastr.warning('Please choose a number less than 15')
    }
    else{
      for(let i = 0; i< this.employeelist.length; i++){
        if(this.employeelist[i]== this.chosenemployee){
          this.x = i;
        }
      }
      this.alloweddatelist.userEmail = this.employeeemail[this.x];
      this.alloweddatelist.chosenDate = this.numberofDays;
      console.log(this.alloweddatelist);
      this.manageService.addalloweddate(this.alloweddatelist);
    }
  }
  addemployee(){
    this.model.position = "Associate";
    this.model.managermail = this.accountService.username;
    this.accountService.adduser(this.model).subscribe(response => {
      this.home();
      this.toastr.info("Added Successfully");
      console.log(response);
      
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    }) 
  }

  pullreportfunc(){
    console.log(this.pullreport);
    let filename = this.pullreport.startDate.toString() + '_to_' + this.pullreport.endDate.toString();
      
    this.manageService.pullreport(this.pullreport, filename);
  }
  deletereport(){
    this.manageService.deletereport(this.pullreport);
  }
  cancel(){

  }

}
