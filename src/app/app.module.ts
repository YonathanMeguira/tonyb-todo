import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule, NbLayoutModule, NbButtonModule, NbCardModule,
  NbAlertModule, NbIconModule, NbDialogModule,
  NbDialogService, NbInputModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { ListService } from './list.service';
import { ReactiveFormsModule } from '@angular/forms';

const uiModules = [NbButtonModule, NbCardModule, NbAlertModule, NbIconModule, NbInputModule];


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NbDialogModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    ReactiveFormsModule,
    ...uiModules
  ],
  providers: [ListService, NbDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
