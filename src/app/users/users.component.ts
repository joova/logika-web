import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { MatDialog, MatIcon } from '@angular/material';
import { UserFormDialog } from './users.form.dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: User;
  users: User[];

  constructor(
    public dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = new User();
    this.getUsers();
  }

  openFormDialog(): void {
    this.user = new User();
    
    const dialogRef = this.dialog.open(UserFormDialog, {
      width: '250px',
      data: {user: this.user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.user = result;
      this.add();
    });
  }

  add(): void {
    this.userService.addUser(this.user)
      .subscribe(user => {
        this.users.push(user);
      });
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

}
