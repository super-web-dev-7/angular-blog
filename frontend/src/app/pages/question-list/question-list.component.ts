import {Component, OnInit} from '@angular/core';
import {AuthService, HttpService} from '../../providers';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

    questionLists: any = [];
    page: number = 0;
    baseUrl = environment.baseUrl;
    currentUser: any;
    isAdmin: any;

    //------------------------Filter Value--------------------------
    isApproved: boolean = false;
    isAnswered: boolean = false;
    categories: any;
    selectedCategory: any = null;
    keyword: any = "";

    sum = 100; // ----------------------------Page Count------------------------
    throttle = 300;
    scrollDistance = 1;
    scrollUpDistance = 2;
    direction = '';

    constructor(
        private http: HttpService,
        private router: Router,
        private auth: AuthService,
        private _snackBar: MatSnackBar
    ) {
        this.currentUser = this.auth.currentUserValue;
        this.isAdmin = this.currentUser !== null ? this.currentUser.isAdmin : false;
        const filteredData = {
            start: 0,
            keyword: this.keyword,
            category: this.selectedCategory,
            isAnswered: this.isAnswered,
            isApproved: this.isAdmin? this.isApproved : true,
        };
        this.http.getQuestions(filteredData).subscribe(res => {
            this.questionLists = res;
            if (!this.currentUser && localStorage.getItem('lastPostedQuestion')) {
                this.http.getQuestionById(localStorage.getItem('lastPostedQuestion')).subscribe(res => {
                    this.questionLists.unshift(res)
                })
            }
        });

        this.http.getCategory().subscribe(res => {
            this.categories = res;
        });

    }

    ngOnInit(): void {
    }

    filter() {
        const filteredData = {
            start: 0,
            keyword: this.keyword,
            category: this.selectedCategory,
            isAnswered: this.isAnswered,
            isApproved: this.isAdmin? this.isApproved : true,
        };
        this.http.getQuestions(filteredData).subscribe(res => {
            this.questionLists = res;
        });
    }

    onScrollDown (ev) {
        const start = this.sum;
        this.sum += 20;      //------------------------Add Item------------------------
        this.appendItems(start, this.sum);
        this.direction = 'down'
    }

    onUp(ev) {
        const start = this.sum;
        this.sum += 20;
        this.prependItems(start, this.sum);
        this.direction = 'up';
    }

    appendItems(startIndex, endIndex) {
        this.addItems(startIndex, endIndex);
    }

    prependItems(startIndex, endIndex) {
    }

    addItems(startIndex, endIndex) {
        const data = {
            start: startIndex,
            end: endIndex,
            keyword: this.keyword,
            category: this.selectedCategory,
            isAnswered: this.isAnswered,
            isApproved: this.isAdmin? this.isApproved : true,
        };
        this.http.getQuestions(data).subscribe(res => {
            this.questionLists = this.questionLists.concat(res);
        })
    }

    gotoQuestionPage(question) {
        const isLast = question._id === localStorage.getItem('lastPostedQuestion');
        if (!question.approved && !isLast) {
            if (this.isAdmin || (this.currentUser && this.currentUser.id === question.createdBy)) {
                this.router.navigate(['question-page/' + question._id])
            } else {
                this._snackBar.open('This question is not approved', '', {
                    duration: 2000,
                });
            }
        } else {
            this.router.navigate(['question-page/' + question._id])
        }

    }
}
