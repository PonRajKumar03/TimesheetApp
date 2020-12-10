import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ViewserviceService } from '../_services/viewservice.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  timesheetMode = '';
  model:any
  constructor(public viewservice: ViewserviceService, private accountservice: AccountService,public router: Router) { }

  ngOnInit(): void {
    this.timesheetMode = '';
  }


  timesheetToggle(event){      
      this.timesheetMode = event;    
  }

  timesheetview(){
    this.router.navigateByUrl('/viewtimesheet')
  }
  
  doneevent(data){
    if(data = 'done'){
      this.timesheetToggle('');
    }
  }

}
