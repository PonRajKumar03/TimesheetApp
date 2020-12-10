import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { Timesheet} from '../_models/timesheet';
import {Newuser} from '../_models/newuser';
import {Registeruser} from '../_models/registeruser';
import { Emplist } from '../_models/emplist'
import { FORMERR } from 'dns';
import { Projects } from '../_models/projects';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:5001/api/";
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  private currentUserPosition = new ReplaySubject<User>(1);
  currentUserPosition$ = this.currentUserPosition.asObservable();
  noofhours = [];
  taskdetail = [];
  projectname = [];
  username = "";
  date = [];
  position = '';
  allowedDate = 0;


  loggedin = false;
  

  constructor(private http: HttpClient) { }

  login(model:any){
    return this.http.post(this.baseUrl + "account/login", model).pipe(
      map((response:User) => {
        const user = response;
        console.log(user);
        if(user.userPosition == "Manager"){          
          localStorage.setItem('employees', JSON.stringify(user.employees))
          localStorage.setItem('clients', JSON.stringify(user.clients)); 
          localStorage.setItem('employeeemail', JSON.stringify(user.employeeEmail));
          localStorage.setItem('projects', JSON.stringify(user.projects));
        };
        if(user.userPosition == "HR"){ 
          localStorage.setItem('employeeswhole', JSON.stringify(user.employeesWhole));
          localStorage.setItem('employeeswholemail', JSON.stringify(user.employeesWholeMail));
        }
        if (user) {
          localStorage.setItem('projects', JSON.stringify(user.projects));
          this.allowedDate = user.allowedDate;
          this.position = user.userPosition;
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          this.username = user.email_ID;
          const account = JSON.stringify(localStorage.getItem('user'));
        }
        
      })
    )
  }

  adduser(model:any){
    return this.http.post(this.baseUrl + 'account/addemail', model).pipe(
     map((response : Newuser) => {
       console.log("Added successfully");
     })
    )
  }
  
  register(model : any){
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user : User) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);           
          }
          return user;
      })      
    )    
  }

  registernewuser(model : any){
    return this.http.post(this.baseUrl + 'account/registernewuser', model).pipe(
      map((user: User) =>{
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
  
    )
  }

  addsheet(model : any){
    this.noofhours = [];
    this.taskdetail = [];
    this.projectname = [];
    this.date = [];
    return this.http.post(this.baseUrl + 'account/addtimesheet', model).pipe(
      map((timesheet : Timesheet) => {
        if (timesheet) {
            localStorage.setItem('timesheet', JSON.stringify(timesheet));
            if(timesheet){
              this.noofhours = timesheet.noofHours;
              this.taskdetail = timesheet.taskdetail;
              this.projectname = timesheet.projectName;
              this.date = timesheet.date;

            }           
          }
          return timesheet;
      })      
    )    
  }

  
  setCurrentUser(user: User){
    this.loggedin = true;
    this.username = user.email_ID;
    this.currentUserSource.next(user);
    this.position = user.userPosition;
    this.allowedDate = user.allowedDate;
  }

  logout(){
    this.position = '';
    this.username = '';
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }
}
