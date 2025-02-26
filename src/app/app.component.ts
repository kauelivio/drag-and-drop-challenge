import { CommonModule } from '@angular/common';
import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable, of, Subject } from 'rxjs';

const ALLOWED_FILE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/gif'
];

@Component({
    selector: 'app-root',
    imports: [CommonModule, DragDropModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

    fire: boolean = false;
    invalidFileType: boolean = false;

    allowedFileTypes = ALLOWED_FILE_TYPES;

    fileList: {
        name: string;
        preview: any
    }[] = [];

    async handleChange(event: any) {
        let file = event.target.files[0] as File;
        let fileUrl = URL.createObjectURL(file);
        
        if (!this.allowedFileTypes.includes(file.type)) {
            this.invalidFileType = true;
            return
        }
        
        this.invalidFileType = false;

        this.uploadSimulation().subscribe({
            next: () => {
                this.fileList.push({
                    name: file.name,
                    preview: fileUrl,
                })
            }
        });
    }

    uploadSimulation(): Observable<boolean> {
        this.fire = true;
        return new Observable(observer => {
            setTimeout(() => {
                this.fire = false;
                observer.next(this.fire);
            }, 2400)
        })
    }

    drop(event: CdkDragDrop<{ title: string; poster: string }[]>) {
        moveItemInArray(this.fileList, event.previousIndex, event.currentIndex);
    }
}
