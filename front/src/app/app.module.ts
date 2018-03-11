import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'

import { AmChartsModule } from '@amcharts/amcharts3-angular';

import { AppComponent } from './app.component';
import { HistoricalComponent } from './historical/historical.component';
import { AvantageComponent } from './avantage/avantage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { ValidateService }  from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';


//set the routes
const appRoutes : Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'login', component: LoginComponent
    }
]

@NgModule({
  declarations: [
    AppComponent,
    HistoricalComponent,
    AvantageComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    AmChartsModule
  ],
  providers: [
      ValidateService,
      AuthService,
      AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
