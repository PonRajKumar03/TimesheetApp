import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { ToastrService } from 'ngx-toastr';
import { Sheet } from '../_models/sheet';
import { View } from '../_models/viewrequest';
import { AccountService } from '../_services/account.service';
import { ViewserviceService } from '../_services/viewservice.service';

@Component({
  selector: 'app-viewtimesheet',
  templateUrl: './viewtimesheet.component.html',
  styleUrls: ['./viewtimesheet.component.css']
})
export class ViewtimesheetComponent implements OnInit {
  @ViewChild('viewForm') viewForm : NgForm;
  model: View = {
    'enddate' : null,
    'startdate' : null,
    'email' : null
 };
  x =0;
  requesttimesheetmode = ''; 
  constructor(public viewservice: ViewserviceService, public accountService : AccountService, public toastr : ToastrService,public router: Router ) { }

  ngOnInit(): void {
  }

  requesttimesheet(){
    if(this.model.startdate == null){
      this.toastr.error("Please provide a start date")
    }
    else {  
      this.model.email = this.accountService.username;
      this.viewservice.viewtimesheet(this.model).subscribe(response => {
        this.requesttimesheetmode = 'view';      
        console.log(this.viewservice.noofHours)  
      }, error =>{
        console.log(error);
      }
    ) 
    }       
  }

  submit(){
    this.router.navigateByUrl('/timesheet');
  }
}
