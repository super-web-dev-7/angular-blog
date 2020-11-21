import {
    Directive,
    Output,
    Input,
    EventEmitter,
    HostBinding,
    HostListener
} from '@angular/core';

@Directive({
    selector: '[appDnd]'
})
export class DndDirective {
    @HostBinding('class.fileover') fileOver: boolean;
    @Output() fileDropped = new EventEmitter<any>();

    // Dragover listener
    @HostListener('dragover', ['$event']) onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = true;
    }

    // Dragleave listener
    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = false;
    }

    // Drop listener
    @HostListener('drop', ['$event']) public ondrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = false;
        let tempFiles = evt.dataTransfer.files;
        let files = [];
        for (let file of tempFiles) {
            if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type ==='image/gif') {
                files.push(file)
            }
        }
        if (files.length > 0) {
            this.fileDropped.emit(files);
        }
    }
}
