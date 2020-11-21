import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, HttpService} from '../../providers';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    files: any[] = [];
    title: string = "";
    error: string;
    currentUser: any;
    isMobile: boolean = false;

    constructor(
        private router: Router,
        private httpRequest: HttpService,
        private auth: AuthService
    ) {
    }

    ngOnInit() {
        this.isMobile = window.screen.width < 768;
        this.currentUser = this.auth.currentUserValue;
        console.log(this.isMobile)
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.isMobile = event.target.innerWidth < 768;
        console.log(this.isMobile)
    }

    /**
     * on file drop handler
     */
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

    questionPost() {
        if (this.files.length === 0) {
            this.error = "Picture is required"
        } else {
            this.error = null;
            const fd: FormData = new FormData();
            for (let item of this.files) {
                fd.append('picture', item)
            }
            fd.append('title', this.title);
            if (this.currentUser) {
                fd.append('createdBy', this.currentUser.id);
            }

            this.httpRequest.questionPost(fd).subscribe(res => {
                console.log(res)
                localStorage.setItem('lastPostedQuestion', res._id);
                this.router.navigate(['question-page/' + res._id])
            })
        }
        // this.router.navigate(['question-page']);
    }

    gotoQuestionList() {
        this.router.navigate(['question-list']);
    }

}
