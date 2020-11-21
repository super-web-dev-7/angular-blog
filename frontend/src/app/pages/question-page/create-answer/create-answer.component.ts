import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddCategoryComponent} from '../add-category/add-category.component';
import {HttpService} from '../../../providers';

@Component({
    selector: 'app-create-answer',
    templateUrl: './create-answer.component.html',
    styleUrls: ['./create-answer.component.scss']
})
export class CreateAnswerComponent implements OnInit {

    categories: any;
    content: string;
    answerForm: FormGroup;
    isAnswered: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<CreateAnswerComponent>,
        @Inject(MAT_DIALOG_DATA) public question: any,
        public formBuilder: FormBuilder,
        public dialog: MatDialog,
        public httpRequest: HttpService
    ) {
        console.log(this.question)
        this.isAnswered = this.question.isAnswered;
        this.httpRequest.getCategory().subscribe(res => {
            this.categories = res;
        });
    }

    ngOnInit(): void {
        if (!this.isAnswered) {
            this.answerForm = this.formBuilder.group({
                category: ['', Validators.required],
                content: ['']
            });
        } else {
            this.answerForm = this.formBuilder.group({
                category: [this.question.answer.category, Validators.required],
                content: [this.question.answer.content]
            });
        }

    }

    get f() {
        return this.answerForm.controls;
    }

    onSubmit(): void {
        if (this.answerForm.invalid) return;
        const answer = {
            category: this.f.category.value,
            content: this.f.content.value
        };
        if (!this.isAnswered) {
            this.httpRequest.addAnswer(answer, this.question._id).subscribe(res => {
                this.dialogRef.close(answer);
            });
        } else {
            this.httpRequest.editAnswer(answer, this.question.answer._id).subscribe(res => {
                this.dialogRef.close(answer)
            });
        }

    }

    addCategory() {
        let dialogRef = this.dialog.open(AddCategoryComponent, {
            width: '80vw',
            autoFocus: false,
            maxHeight: '90vh'
        });

        dialogRef.afterClosed().subscribe(newCategory => {
            this.categories.push(newCategory)
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }


}
