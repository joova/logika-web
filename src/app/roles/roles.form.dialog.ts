import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Role } from '../model/role';

export interface RoleDialogData {
    role: Role;
}

@Component({
    selector: 'roles-form-dialog',
    templateUrl: 'roles.form.dialog.html',
})
export class RoleFormDialog {

    constructor(
        public dialogRef: MatDialogRef<RoleFormDialog>,
        @Inject(MAT_DIALOG_DATA) public data: RoleDialogData
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}