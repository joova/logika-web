import { Component, OnInit } from '@angular/core';
import { OrgService } from '../service/org.service';
import { Org } from '../model/org';
import { MatDialog, MatIcon } from '@angular/material';
import { OrgFormDialog } from './orgs.form.dialog';

@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.component.html',
  styleUrls: ['./orgs.component.css']
})
export class OrgsComponent implements OnInit {

  org: Org;
  orgs: Org[];

  constructor(
    public dialog: MatDialog,
    private orgService: OrgService
  ) { }

  ngOnInit() {
    this.org = new Org();
    this.getOrgs();
  }

  openFormDialog(): void {
    this.org = new Org();
    
    const dialogRef = this.dialog.open(OrgFormDialog, {
      width: '420px',
      data: {org: this.org}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog add org was closed');
      this.org = result;
      console.log('this.org = ');
      if (this.org) {
        console.log(JSON.stringify(this.org));
        this.add();
      } 
    });
  }

  onSelect(org: Org): void {
    this.org = org;
    const dialogRef = this.dialog.open(OrgFormDialog, {
      width: '420px',
      data: {org: this.org}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog edit org was closed');
      this.org = result;
      console.log('this.org = ');
      if (this.org) {
        //console.log(JSON.stringify(this.org));
        this.update();
      } 
    });
  }

  add(): void {
    this.orgService.addOrg(this.org)
      .subscribe(org => {
        this.orgs.push(org);
      });
  }

  update(): void {
    this.orgService.updateOrg(this.org)
      .subscribe(org => {
        console.log(JSON.stringify(org));
      });
  }

  remove(org: Org): void {
    console.log(`remove org, index = ${org.id}`)
    this.org = org;
    this.orgService.deleteOrg(this.org)
      .subscribe(org => {
        this.orgs = this.orgs.filter(u => u !== this.org);
      });
  }

  getOrgs(): void {
    this.orgService.getOrgs()
      .subscribe(orgs => this.orgs = orgs);
  }

}
