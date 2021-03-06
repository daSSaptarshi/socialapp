import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApproveComponent } from './approve/approve.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path:"", pathMatch: "full", redirectTo:"/home", canActivate : [AuthGuard]},
  { path:"posts", pathMatch: "full", redirectTo:"/home"},
  { path:"login", component: LoginComponent},
  { path:"register", component: RegisterComponent},
  { path:"home", component: HomeComponent, canActivate : [AuthGuard]},
  { path:"dashboard", component: DashboardComponent, canActivate : [AuthGuard]},
  { path:"approval", component :ApproveComponent, canActivate : [AuthGuard, RoleGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
