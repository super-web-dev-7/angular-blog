import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthService, HttpService} from '../../providers';
import {MatDialog} from '@angular/material/dialog';
import {EditQuestionComponent} from './edit-question/edit-question.component';
import {AddPictureComponent} from './add-picture/add-picture.component';
import {environment} from '../../../environments/environment';
import {CreateAnswerComponent} from './create-answer/create-answer.component';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-question-page',
    templateUrl: './question-page.component.html',
    styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {

    id: any;
    question: any;
    baseUrl = environment.baseUrl;
    currentUser: any;
    isAdmin: boolean = false;
    isApproved: boolean = false;
    isAnswered: boolean = false;
    isMine: boolean = false;
    isWrongID: boolean = true;
    isLastPostedQuestion: boolean = false;
    isLoading: boolean;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private http: HttpService,
        public dialog: MatDialog,
        private auth: AuthService,
        private SpinnerService: NgxSpinnerService
    ) {

    }

    ngOnInit(): void {
        this.SpinnerService.show();
        this.isLoading = false;
        for (let i = 0; i < 100000; i++) {
            for (let i = 0; i < 10000; i++) {

            }
        }
        this.id = this.route.snapshot.paramMap.get('id');
        this.currentUser = this.auth.currentUserValue;
        this.isAdmin = this.currentUser !== null ? this.currentUser.isAdmin : false;
        this.isLastPostedQuestion = this.id === localStorage.getItem('lastPostedQuestion');
        this.http.getQuestionById(this.id).subscribe(res => {
            this.question = res;
            this.isWrongID = this.question === null || this.question === undefined;
            this.isApproved = this.question.approved;
            this.isAnswered = this.question.isAnswered;
            this.isMine = (this.question.createdBy && this.currentUser && this.currentUser.id === this.question.createdBy._id)
                || this.isAdmin
                || this.isLastPostedQuestion;
            this.SpinnerService.hide();
            this.isLoading = true;
        }, error => {
            this.SpinnerService.hide();
            this.isLoading = true;
        });
    }

    answer() {
        if (!this.isAdmin) return;
        let dialogRef = this.dialog.open(CreateAnswerComponent, {
            width: '80vw',
            data: this.question,
            autoFocus: false,
            maxHeight: '90vh'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result)
            if (result !== undefined) {
                this.question.answer = result;
                this.isAnswered = true;
            }

        })
    }

    editAnswer() {
        if (!this.isAdmin) return;
        let dialogRef = this.dialog.open(CreateAnswerComponent, {
            width: '80vw',
            data: this.question,
            autoFocus: false,
            maxHeight: '90vh'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.question.answer.category = result.category;
                this.question.answer.content = result.content;
            }
        })
    }

    deleteImage(picture) {
        if (!this.isMine) return;
        this.http.deletePicture(picture, this.question._id).subscribe((res: any) => {
            console.log(res)
            this.question.picture = res.picture;
        })
    }

    addImage() {
        if (!this.isMine) return;
        let dialogRef = this.dialog.open(AddPictureComponent, {
            data: this.question.title,
            width: '80vw',
            autoFocus: false,
            maxHeight: '90vh'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                const fd: FormData = new FormData();
                for (let item of result) {
                    fd.append('picture', item)
                }
                this.http.addPicture(fd, this.question._id).subscribe(res => {
                    this.question = res;
                })
            }
        });
    }

    editQuestion() {
        if (!this.isMine) return;
        let dialogRef = this.dialog.open(EditQuestionComponent, {
            data: this.question.title,
            width: '50vw'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (this.question.title !== result) {
                this.question.title = result;
                this.http.editQuestionById(this.question).subscribe(res => {
                })
            }
        });
    }

    approve() {
        if (!this.question.approved) {
            this.http.approveQuestion(this.question._id, true).subscribe(res => {
                this.question.approved = true;
                this.isApproved = true;
            })
        } else {
            this.http.approveQuestion(this.question._id, false).subscribe(res => {
                this.question.approved = false;
                this.isApproved = false;
            })
        }
    }

    gotoQuestionList() {
        this.router.navigate(['question-list']);
    }

}
