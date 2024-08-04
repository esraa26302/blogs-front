import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { PostComponent } from './components/post/post.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { CommenteditpopupComponent } from './components/commenteditpopup/commenteditpopup.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PostComponent,
    LoginComponent,
    RegisterComponent,
    AddPostComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    PostDetailComponent,
    UpdatePostComponent,
    CommenteditpopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

