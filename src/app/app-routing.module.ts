import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { PostComponent } from './components/post/post.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'posts', component: PostComponent },
  { path: 'login', component: LoginComponent },
  {path:'register',component:RegisterComponent},
  { path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },
 
  { path: 'login', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

