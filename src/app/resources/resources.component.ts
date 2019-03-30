import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../service/resource.service';
import { Resource } from '../model/resource';
import { MatDialog, MatIcon } from '@angular/material';
import { ResourceFormDialog } from './resources.form.dialog';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  resource: Resource;
  resources: Resource[];

  constructor(
    public dialog: MatDialog,
    private resourceService: ResourceService
  ) { }

  ngOnInit() {
    this.resource = new Resource();
    this.getResources();
  }

  openFormDialog(): void {
    this.resource = new Resource();
    
    const dialogRef = this.dialog.open(ResourceFormDialog, {
      width: '420px',
      data: {resource: this.resource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog add resource was closed');
      this.resource = result;
      console.log('this.resource = ');
      if (this.resource) {
        console.log(JSON.stringify(this.resource));
        this.add();
      } 
    });
  }

  onSelect(resource: Resource): void {
    this.resource = resource;
    const dialogRef = this.dialog.open(ResourceFormDialog, {
      width: '420px',
      data: {resource: this.resource}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog edit resource was closed');
      this.resource = result;
      console.log('this.resource = ');
      if (this.resource) {
        //console.log(JSON.stringify(this.resource));
        this.update();
      } 
    });
  }

  add(): void {
    this.resourceService.addResource(this.resource)
      .subscribe(resource => {
        this.resources.push(resource);
      });
  }

  update(): void {
    this.resourceService.updateResource(this.resource)
      .subscribe(resource => {
        console.log(JSON.stringify(resource));
      });
  }

  remove(resource: Resource): void {
    console.log(`remove resource, index = ${resource.code}`)
    this.resource = resource;
    this.resourceService.deleteResource(this.resource)
      .subscribe(resource => {
        this.resources = this.resources.filter(u => u !== this.resource);
      });
  }

  getResources(): void {
    this.resourceService.getResources()
      .subscribe(resources => this.resources = resources);
  }

}
