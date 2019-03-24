import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service/role.service';
import { Role } from '../model/role';
import { MatDialog, MatIcon } from '@angular/material';
import { RoleFormDialog } from './roles.form.dialog';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  role: Role;
  roles: Role[];

  constructor(
    public dialog: MatDialog,
    private roleService: RoleService
  ) { }

  ngOnInit() {
    this.role = new Role();
    this.getRoles();
  }

  openFormDialog(): void {
    this.role = new Role();
    
    const dialogRef = this.dialog.open(RoleFormDialog, {
      width: '420px',
      data: {role: this.role}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog add role was closed');
      this.role = result;
      console.log('this.role = ');
      if (this.role) {
        console.log(JSON.stringify(this.role));
        this.add();
      } 
    });
  }

  onSelect(role: Role): void {
    this.role = role;
    const dialogRef = this.dialog.open(RoleFormDialog, {
      width: '420px',
      data: {role: this.role}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog edit role was closed');
      this.role = result;
      console.log('this.role = ');
      if (this.role) {
        //console.log(JSON.stringify(this.role));
        this.update();
      } 
    });
  }

  add(): void {
    this.roleService.addRole(this.role)
      .subscribe(role => {
        this.roles.push(role);
      });
  }

  update(): void {
    this.roleService.updateRole(this.role)
      .subscribe(role => {
        console.log(JSON.stringify(role));
      });
  }

  remove(role: Role): void {
    console.log(`remove role, index = ${role.id}`)
    this.role = role;
    this.roleService.deleteRole(this.role)
      .subscribe(role => {
        this.roles = this.roles.filter(u => u !== this.role);
      });
  }

  getRoles(): void {
    this.roleService.getRoles()
      .subscribe(roles => this.roles = roles);
  }

}
