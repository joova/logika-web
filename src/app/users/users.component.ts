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
      width: '420px',
      data: {user: this.user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog add user was closed');
      this.user = result;
      console.log('this.user = ');
      if (this.user) {
        //console.log(JSON.stringify(this.user));
        this.add();
      } 
    });
  }

  onSelect(user: User): void {
    this.user = user;
    const dialogRef = this.dialog.open(UserFormDialog, {
      width: '420px',
      data: {user: this.user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog edit user was closed');
      this.user = result;
      console.log('this.user = ');
      if (this.user) {
        //console.log(JSON.stringify(this.user));
        this.update();
      } 
    });
  }

  add(): void {
    this.userService.addUser(this.user)
      .subscribe(user => {
        this.users.push(user);
      });
  }

  update(): void {
    this.userService.updateUser(this.user)
      .subscribe(user => {
        console.log(JSON.stringify(user));
      });
  }

  remove(user: User): void {
    console.log(`remove user, index = ${user.id}`)
    this.user = user;
    this.userService.deleteUser(this.user)
      .subscribe(user => {
        this.users = this.users.filter(u => u !== this.user);
      });
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

}
