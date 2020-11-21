import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-edit-question',
    templateUrl: './edit-question.component.html',
    styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

    question: any;

    constructor(
        public dialogRef: MatDialogRef<EditQuestionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
        this.question = this.data
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
