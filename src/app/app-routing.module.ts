import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { CategoriesComponent } from './categories/categories.component';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { DeactiveGuardService } from './services/guard/deactive-guard.service';
import { TemplateFormComponent } from './template-form/template-form.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { FilterPipesComponent } from './filter-pipes/filter-pipes.component';
import { PostComponent } from './post/post.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './services/guard/auth.guard';

const appRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    data : {page:1, search: 'hometest'}
  },
  { 
    path:'users', 
    component: UsersComponent,
    // canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      { path:':id/:name', component: UserComponent },
      { path:':id/:name/edit', component: EditUserComponent, canDeactivate: [DeactiveGuardService] }
    ]
  },
  {
    path:'categories', component: CategoriesComponent
  },
  {
    path:'temform', component: TemplateFormComponent
  },
  {
    path:'reactiveForm', component: ReactiveFormsComponent
  },
  {
    path:'filterPipes', component: FilterPipesComponent
  },
  {
    path:'post', component:PostComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'authComp', component:AuthComponent
  },
  {
    path:'not-found', component: PageNotFoundComponent
  },
  {
    path: '**', redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)], //, {useHash: true}
  exports: [RouterModule]
})
export class AppRoutingModule { }
