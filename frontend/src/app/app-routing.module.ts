import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './providers/helper/auth.guard';
import {LayoutComponent} from './pages/layout/layout.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {QuestionPageComponent} from './pages/question-page/question-page.component';
import {QuestionListComponent} from './pages/question-list/question-list.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'signup',
                component: RegisterComponent
            },
            {
                path: 'question-page/:id',
                component: QuestionPageComponent
            },
            {
                path: 'question-list',
                component: QuestionListComponent
            }
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
