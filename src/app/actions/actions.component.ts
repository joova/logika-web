import { Component, OnInit } from '@angular/core';
import { ActionService } from '../service/action.service';
import { Action } from '../model/action';
import { MatDialog, MatIcon } from '@angular/material';
import { ActionFormDialog } from './actions.form.dialog';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  action: Action;
  actions: Action[];

  constructor(
    public dialog: MatDialog,
    private actionService: ActionService
  ) { }

  ngOnInit() {
    this.action = new Action();
    this.getActions();
  }

  openFormDialog(): void {
    this.action = new Action();
    
    const dialogRef = this.dialog.open(ActionFormDialog, {
      width: '420px',
      data: {action: this.action}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog add action was closed');
      this.action = result;
      console.log('this.action = ');
      if (this.action) {
        console.log(JSON.stringify(this.action));
        this.add();
      } 
    });
  }

  onSelect(action: Action): void {
    this.action = action;
    const dialogRef = this.dialog.open(ActionFormDialog, {
      width: '420px',
      data: {action: this.action}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog edit action was closed');
      this.action = result;
      console.log('this.action = ');
      if (this.action) {
        //console.log(JSON.stringify(this.action));
        this.update();
      } 
    });
  }

  add(): void {
    this.actionService.addAction(this.action)
      .subscribe(action => {
        this.actions.push(action);
      });
  }

  update(): void {
    this.actionService.updateAction(this.action)
      .subscribe(action => {
        console.log(JSON.stringify(action));
      });
  }

  remove(action: Action): void {
    console.log(`remove action, index = ${action.code}`)
    this.action = action;
    this.actionService.deleteAction(this.action)
      .subscribe(action => {
        this.actions = this.actions.filter(u => u !== this.action);
      });
  }

  getActions(): void {
    this.actionService.getActions()
      .subscribe(actions => this.actions = actions);
  }

}
