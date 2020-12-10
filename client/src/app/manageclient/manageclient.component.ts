import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Newclient } from '../_models/newclient';
import { Projects } from '../_models/projects';
import { AccountService } from '../_services/account.service';
import { ManageService } from '../_services/manage.service';

@Component({
  selector: 'app-manageclient',
  templateUrl: './manageclient.component.html',
  styleUrls: ['./manageclient.component.css']
})
export class ManageclientComponent implements OnInit {
  model : Newclient = {
    'clientname': null, 
    'completedate': null, 
    'hourslimit':null,
    'projectdetails':null,
    'projectname':null,
    'managermail': null}; 
  fetchmodel : any = {};
  addclientmode = false;
  manageclientmode = false;
  beforefetch = true;
  clients = [];
  project : string = '';
  beforeget = true;
  enddate : string;
  projectdetails : string;
  hourslimit : number;
  beforeadd = true;
  x = 0;
  constructor(public manageService : ManageService,public router: Router ,public accountService : AccountService, public toastr : ToastrService) { }

  ngOnInit(): void {
    if(this.accountService.position != 'Manager'){
      this.router.navigateByUrl('/timesheet');
    }
    this.x =0
    this.clients = JSON.parse(localStorage.getItem('clients'))
  }

  addclient(){
    console.log("add client");
    this.manageclientmode = false;
    this.addclientmode = true;
  }
  manageclient(){
    console.log("manage client")
    this.beforeget = true;
    this.beforefetch = true;
    this.addclientmode = false;
    this.beforeadd = true;
    this.manageclientmode = true;
  }

  modestoggle(){
    this.addclientmode = false;
    this.manageclientmode = false;
   
  }
  addnewclient(){
    this.model.managermail = this.accountService.username;
    this.manageService.addclient(this.model).subscribe(response =>{
      this.clients.push(this.model.clientname)
      localStorage.setItem('clients', JSON.stringify(this.clients))
      this.toastr.info("New client added");
    }, error =>{
      console.log(error);
      this.toastr.error(error);
    })
  }

  fetchdetails(){
    this.manageService.fetchprojects(this.fetchmodel).subscribe(response =>{
      this.toastr.info("Project details fetched");
      this.beforefetch = false;
    })
    
  }
  addnewproject(){
    this.model.managermail = this.accountService.username;
    this.model.clientname = this.fetchmodel.clientname;
    this.manageService.addclient(this.model).subscribe(response =>{
      this.toastr.info("New project added");
    }, error =>{
      console.log(error);
      this.toastr.error(error);
    })
  }

  getdetails(){
    for(let i =0; i<this.manageService.projects.projectName.length; i++){
      if(this.manageService.projects.projectName[i] == this.project){
        this.x = i;
      }
    }
    this.hourslimit = this.manageService.projects.hoursLimit[this.x];
    this.projectdetails = this.manageService.projects.projectDetails[this.x];
    this.enddate = this.manageService.projects.endDate[this.x];
    console.log(this.enddate)
    this.beforeget = false;
  }
  addproject(){
    this.beforeadd = false;
  }

}
