import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogComponent } from './components/log/log.component';

const routes: Routes = [
    { path: '', component: LogComponent },
    { path: 'dashboard/:id', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent }
    
  ];

  @NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forRoot(routes) ]
  })

  export class AppRouting {}