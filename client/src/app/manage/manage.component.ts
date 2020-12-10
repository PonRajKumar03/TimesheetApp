import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { ManageService } from '../_services/manage.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  managemode = "none";
  sheetresult = false;
  model : any = {};
  employees =[];
  currentDate = []; 
  noofhours = [];
  taskdetail = [];
  clientname = [];
  length = 0;
  managername = "";
  constructor(public accountService : AccountService, public router: Router, public toastr: ToastrService, public manageService: ManageService) { }

  ngOnInit(): void {
    if(this.accountService.position != 'Manager'){
      this.router.navigateByUrl('/timesheet');
    }
    this.employees = JSON.parse(localStorage.getItem("employees"))
  }

  
  managemodetoggle(arg : string){
    this.managemode = arg;
  }
  addemployee(){
    this.model.managermail = this.accountService.username;
    this.accountService.adduser(this.model).subscribe(response => {
      this.router.navigateByUrl('/manage');
      this.toastr.info("Added Successfully");
      console.log(response);
      
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
    
  }

  getemployee(){
    this.managemodetoggle('current');    
  }

  queryemployee(){
    this.sheetresult = true;
  }

  manageclient(){
    this.router.navigateByUrl('/manageclient');
  }

  manageemployee(){
    this.router.navigateByUrl('/manageemployee');
  }
  cancel(){
    this.sheetresult = false;
    this.managemode = "none";
    this.noofhours = [];
    this.taskdetail = [];
    this.clientname = [];
    this.currentDate = [];
  }

}
