import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { ManageComponent } from './manage/manage.component';
import { FilltimesheetComponent } from './filltimesheet/filltimesheet.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ManageclientComponent } from './manageclient/manageclient.component';
import { ViewtimesheetComponent } from './viewtimesheet/viewtimesheet.component';
import { ManageemployeeComponent } from './manageemployee/manageemployee.component';
import { DatePipe } from '@angular/common';
import {CalendarModule} from 'primeng/calendar';
import { HradminComponent } from './hradmin/hradmin.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    TimesheetComponent,
    ManageComponent,
    FilltimesheetComponent,
    ManageclientComponent,
    ViewtimesheetComponent,
    ManageemployeeComponent,
    HradminComponent,
    ChangepasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass : 'toast-bottom-right'
    }),
    NgbModule,
    NgSelectModule,
    CalendarModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
