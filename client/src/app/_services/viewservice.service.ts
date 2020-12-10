import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Sheet } from '../_models/sheet';
import { Timesheet } from '../_models/timesheet';
import { View } from '../_models/viewrequest';

@Injectable({
  providedIn: 'root'
})
export class ViewserviceService {
  noofHours : [];
  taskdetail: [];
  clientName: [];
  date: [];
  ID : [];

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  
  viewtimesheet(model:View){
    return this.http.post(this.baseUrl + "account/viewsheet", model).pipe(
      map((response : Timesheet) => {
        this.noofHours = response.noofHours;
        this.taskdetail = response.taskdetail;
        this.clientName = response.projectName;
        this.date = response.date;
        this.ID = response.id;
      })
    )
  }

}
