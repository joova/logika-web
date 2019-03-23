import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../model/user';

export interface UserDialogData {
    user: User;
}

@Component({
    selector: 'users-form-dialog',
    templateUrl: 'users.form.dialog.html',
})
export class UserFormDialog {

    constructor(
        public dialogRef: MatDialogRef<UserFormDialog>,
        @Inject(MAT_DIALOG_DATA) public data: UserDialogData
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}