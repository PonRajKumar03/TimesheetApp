import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { HomeComponent } from './home/home.component';
import { HradminComponent } from './hradmin/hradmin.component';
import { ManageComponent } from './manage/manage.component';
import { ManageclientComponent } from './manageclient/manageclient.component';
import { ManageemployeeComponent } from './manageemployee/manageemployee.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { ViewtimesheetComponent } from './viewtimesheet/viewtimesheet.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '',component:HomeComponent},
  {
    path:'',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children:[
      {path: 'timesheet',component:TimesheetComponent},
      {path: 'manage', component:ManageComponent},
      {path: 'manageclient', component:ManageclientComponent},
      {path: 'manageemployee', component:ManageemployeeComponent},
      {path: 'hradmin', component:HradminComponent},
      {path: 'viewtimesheet', component:ViewtimesheetComponent},
      {path: 'changepassword', component:ChangepasswordComponent}
    ]
  },
  
  {path: '**',component:HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
