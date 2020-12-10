import { Component, OnInit, ViewChild,Output, EventEmitter } from '@angular/core';
import {NgbCalendar,
  NgbDate,
  NgbDateStruct,
  NgbInputDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AccountService } from '../_services/account.service';
import { Timesheet} from '../_models/timesheet'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-filltimesheet',
  templateUrl: './filltimesheet.component.html',
  styleUrls: ['./filltimesheet.component.css'],
  providers: [NgbInputDatepickerConfig, DatePipe]
})

export class FilltimesheetComponent implements OnInit {
  @ViewChild('timesheetviewForm') timesheetviewForm : NgForm;
  model = {
    date : null,
    noofhours : null,
    taskdetail :'',
    projectname:'',
    email_id:''
  }
  addTimesheetMode = false;
  currentDate = []; 
  noofhours = [];
  taskdetail = [];
  clientname = [];
  pagelist = [];
  minDate = new Date();
  maxDate = new Date();
  today = new Date();
  date : Date;
  projects : any;


  constructor(public accountService : AccountService, private router: Router, private toastr: ToastrService) { 
  }
  
   
  ngOnInit(): void {
    this.minDate.setDate(this.today.getDate() -5 -this.accountService.allowedDate)
    this.maxDate.setDate(this.today.getDate() + 5);
    this.projects = JSON.parse(localStorage.getItem('projects'))
  }
  
  addTimesheet(){
    if(this.model.noofhours > 9){
      this.toastr.error("No. of hours cannot be more than 9")
    }
    else{
      this.model.email_id = this.accountService.username ;
      console.log(this.model);
      this.pagelist = [];
      this.accountService.addsheet(this.model).subscribe(response => {
      this.addTimesheetMode = true;
      this.noofhours = this.accountService.noofhours;
      this.taskdetail = this.accountService.taskdetail;
      this.clientname = this.accountService.projectname;
      this.currentDate = this.accountService.date;
      for(let i =0; i<this.noofhours.length;i++){
        this.pagelist.push({
          'Numberofhours': this.noofhours[i], 
          'TaskDetail': this.taskdetail[i], 
          'ClientName': this.clientname[i], 
          'Date': this.currentDate[i]
        })
      }
      this.timesheetviewForm.reset();
    }, error => {
      console.log(error);
    })
    }
    
  }

  submit(){
    window.location.reload();
  }


}
