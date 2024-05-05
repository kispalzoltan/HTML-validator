import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { AihelpComponent } from './aihelp/aihelp.component';
import { LoginComponent } from './components/login/login.component';
import { Html5featuresComponent } from './components/html5features/html5features.component';

const routes: Routes = [
  {path: 'uploadhtml', component: UploadComponent},
  {path: 'controlPanel', component: ControlPanelComponent},
  {path: 'aiHelp', component: AihelpComponent},
  {path: 'login', component: LoginComponent},
  {path: 'html5funct', component: Html5featuresComponent},
  {path: '', component: UploadComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
