import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { UploadComponent } from './upload/upload.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { HtmlErrorDetailsComponentComponent } from './html-error-details-component/html-error-details-component.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AihelpComponent } from './aihelp/aihelp.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';

import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';
import { TokenInterceptor } from './token.interceptor';
import { RuleCreatorComponent } from './components/rule-creator/rule-creator.component';
import { firebaseConfig } from './firebase';
import { OwnRuleGroupCreatorComponent } from './components/own-rule-group-creator/own-rule-group-creator.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HighlightJsModule } from 'ngx-highlight-js';
import { HighlightJsDirective } from 'ngx-highlight-js';
import { ToastrModule } from 'ngx-toastr';
import {MatRadioModule} from '@angular/material/radio';
import { NgApexchartsModule } from 'ng-apexcharts';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UploadComponent,
    ControlPanelComponent,
    HtmlErrorDetailsComponentComponent,
    AihelpComponent,
    LoginComponent,
    RuleCreatorComponent,
    OwnRuleGroupCreatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatTableModule,
    MatDialogModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    MatCheckboxModule,
    HighlightJsModule,
    HighlightJsDirective,
    ToastrModule.forRoot(),
    MatRadioModule,
    NgApexchartsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
