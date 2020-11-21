import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpService} from '../../../providers';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

    category: string;
    isRequired: boolean = false;
    error: string;

    constructor(
        public dialogRef: MatDialogRef<AddCategoryComponent>,
        public httpRequest: HttpService
    ) {
    }

    ngOnInit(): void {
    }

    onNoClick() {
        this.dialogRef.close()
    }

    addCategory() {
        console.log(this.category)
        if (this.category === undefined || this.category === '') {
            this.isRequired = true;
        } else {
            this.isRequired = false;
            const category = {
                name: this.category
            };
            this.httpRequest.addCategory(category).subscribe((res: any) => {
                console.log(res)
                if (res.status === 'success') {
                    this.dialogRef.close(res.result);
                } else {
                    this.error = res.status;
                }
            });

        }
    }



}
