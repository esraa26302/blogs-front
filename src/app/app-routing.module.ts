import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { PostComponent } from './components/post/post.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'posts', component: PostComponent },
  { path: 'login', component: LoginComponent },
  {path:'register',component:RegisterComponent},
  { path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard] },
  { path: 'post/:id', component: PostDetailComponent },
  { path: '', component: HomeComponent },
  { path: 'update-post/:id', component: UpdatePostComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'user-details/:id', component: UserDetailsComponent },
  { path: 'contact', component: ContactComponent },

 
  { path: 'login', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

