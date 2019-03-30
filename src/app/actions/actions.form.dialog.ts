import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Action } from '../model/action';

export interface ActionDialogData {
    action: Action;
}

@Component({
    selector: 'actions-form-dialog',
    templateUrl: 'actions.form.dialog.html',
})
export class ActionFormDialog {

    constructor(
        public dialogRef: MatDialogRef<ActionFormDialog>,
        @Inject(MAT_DIALOG_DATA) public data: ActionDialogData
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}