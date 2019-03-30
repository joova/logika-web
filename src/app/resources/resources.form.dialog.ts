import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Resource } from '../model/resource';

export interface ResourceDialogData {
    resource: Resource;
}

@Component({
    selector: 'resources-form-dialog',
    templateUrl: 'resources.form.dialog.html',
})
export class ResourceFormDialog {

    constructor(
        public dialogRef: MatDialogRef<ResourceFormDialog>,
        @Inject(MAT_DIALOG_DATA) public data: ResourceDialogData
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}