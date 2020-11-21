import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider
} from 'angularx-social-login';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LayoutComponent} from './pages/layout/layout.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {LoginComponent} from './pages/auth/login/login.component';


import {JwtInterceptor} from './providers/helper';
import {HttpXsrfInterceptor} from './providers/helper/csrf.interceptor';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {AuthService} from './providers';
import {MaterialModule} from './material.module';
import {DndDirective} from './directive/dnd.directive';
import { QuestionPageComponent } from './pages/question-page/question-page.component';
import { QuestionListComponent } from './pages/question-list/question-list.component';
import { getAuthServiceConfigs } from './socialloginConfig';
import { EditQuestionComponent } from './pages/question-page/edit-question/edit-question.component';
import { AddPictureComponent } from './pages/question-page/add-picture/add-picture.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { CreateAnswerComponent } from './pages/question-page/create-answer/create-answer.component';
import { AddCategoryComponent } from './pages/question-page/add-category/add-category.component';
import { EditAnswerComponent } from './pages/question-page/edit-answer/edit-answer.component';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        LayoutComponent,
        RegisterComponent,
        LoginComponent,
        PageNotFoundComponent,
        DndDirective,
        QuestionPageComponent,
        QuestionListComponent,
        EditQuestionComponent,
        AddPictureComponent,
        CreateAnswerComponent,
        AddCategoryComponent,
        EditAnswerComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule,
        SocialLoginModule,
        FormsModule,
        InfiniteScrollModule,
        NgxSpinnerModule
    ],
    entryComponents: [
        EditQuestionComponent,
        AddPictureComponent,
        CreateAnswerComponent,
        EditAnswerComponent,
        AddCategoryComponent
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true},
        AuthService,
        HttpClient,
        HttpClientModule,
        {
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
