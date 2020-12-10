import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Newclient } from '../_models/newclient';
import { Projects } from '../_models/projects';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { environment } from 'src/environments/environment';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ManageService {
  baseUrl = environment.apiUrl;
  constructor(public http: HttpClient) { }
  projects : Projects;
  projectid = [];
  report : any;
  addclient(model : Newclient){
    return this.http.post(this.baseUrl + 'manage/addclient', model)
  };

 
  fetchprojects(model : any){
    console.log(model)
    return this.http.post(this.baseUrl + 'manage/fetchprojects', model).pipe(
      map((projects : Projects) =>{
        if(projects){
          this.projects = projects;
          console.log(this.projects);
        }        
      })
    )
  }

  addalloweddate(model : any){
    return this.http.post(this.baseUrl + "manage/addalloweddate", model).subscribe(
      response =>{
        console.log(response);
      }
    )
  }

  pullreport(model : any, filename : string){
    console.log(filename);
    return this.http.post(this.baseUrl + "manage/pullreports", model).subscribe(
      response =>{
        this.report = response;
        console.log(this.report);
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.report);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, filename);

      }
    )
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
 }

 deletereport(model:any){
   this.http.post(this.baseUrl + "manage/deletereports", model).subscribe(
     response =>{
       console.log(response);
     }
   )
 }

 changepassword(model:any){
  return this.http.post(this.baseUrl + "manage/changepassword", model)
 }
 deleteuser(model : any){
   return this.http.post(this.baseUrl + "manage/deleteuser", model).subscribe(response => {
     console.log(response);
   })
 }

}

