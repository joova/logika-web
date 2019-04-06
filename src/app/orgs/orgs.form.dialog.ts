import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Org } from '../model/org';

export interface OrgDialogData {
    org: Org;
}

@Component({
    selector: 'orgs-form-dialog',
    templateUrl: 'orgs.form.dialog.html',
})
export class OrgFormDialog {

    constructor(
        public dialogRef: MatDialogRef<OrgFormDialog>,
        @Inject(MAT_DIALOG_DATA) public data: OrgDialogData
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}