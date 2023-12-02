import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { CategoriesComponent } from './categories/categories.component';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { DeactiveGuardService } from './services/guard/deactive-guard.service';
import { TemplateFormComponent } from './template-form/template-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { FilterPipesComponent } from './filter-pipes/filter-pipes.component';
import { ShortenPipe } from './pipe/shorten.pipe';
import { FilterpipesPipe } from './pipe/filterpipes.pipe';
import { PostComponent } from './post/post.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';
import { AuthInterceptorInterceptor } from './services/auth-interceptor.interceptor';
import { LoginInterceptorInterceptor } from './services/login-interceptor.interceptor';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner/loading-spinner.component';
import { NavigationComponent } from './navigation/navigation/navigation.component';
import { AuthTokenInterceptorInterceptor } from './services/auth-token-interceptor.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    CategoriesComponent,
    UserComponent,
    EditUserComponent,
    PageNotFoundComponent,
    TemplateFormComponent,
    ReactiveFormsComponent,
    FilterPipesComponent,
    ShortenPipe,
    FilterpipesPipe,
    PostComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS , useClass: LoginInterceptorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS , useClass: AuthInterceptorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS , useClass: AuthTokenInterceptorInterceptor, multi: true},
    AuthService, AuthGuardService, DeactiveGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
