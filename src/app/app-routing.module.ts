import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { AihelpComponent } from './aihelp/aihelp.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'uploadhtml', component: UploadComponent},
  {path: 'controlPanel', component: ControlPanelComponent},
  {path: 'aiHelp', component: AihelpComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: UploadComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
