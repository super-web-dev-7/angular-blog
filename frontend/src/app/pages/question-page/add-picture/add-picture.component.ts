import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-add-picture',
    templateUrl: './add-picture.component.html',
    styleUrls: ['./add-picture.component.scss']
})
export class AddPictureComponent implements OnInit {

    files: any[] = [];
    error: string;
    isMobile: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<AddPictureComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
        this.isMobile = window.screen.width < 768;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.isMobile = event.target.innerWidth < 768;
        console.log(this.isMobile)
    }

    onFileDropped($event) {
        this.prepareFilesList($event);
    }

    fileBrowseHandler(files) {
        this.prepareFilesList(files);
    }

    prepareFilesList(files: Array<any>) {
        for (const item of files) {
            this.files.push(item);
        }
        if (this.files.length > 0) {
            this.error = null;
        }
    }

    formatBytes(bytes, decimals) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    deleteFile(index: number) {
        this.files.splice(index, 1);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
