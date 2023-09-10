import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { GuestDialogComponent } from './guest-dialog/guest-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'table-plan';

  tables = 4;
  seats = 6;

  guestList: Guest[] = [];

  list: string[][] = [];

  constructor(private dialog: MatDialog) {
    let g1: Guest = {
      id: "1",
      name: "Filippa",
      gender: Gender.Female,
      fixedPersonId: ""
    }
    let g2: Guest = {
      id: "2",
      name: "Andreas",
      gender: Gender.Male,
      fixedPersonId: ""
    }
    this.guestList = [g1, g2];
  }

  public generateLists() {

    this.list = [];

    for (let i = 0; i < this.tables; i++) {
      var tmpList: string[] = [];

      for (let j = 0; j < this.seats; j++) {
        tmpList.push('test')
      }

      this.list.push(tmpList);
    }

  }

  addPerson() {
    const dialogRef = this.dialog.open(GuestDialogComponent, {
      width: '600px',
      data: this.guestList
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.guestList.push(data)
        //update list
      }
    })

  }

  drop(event: CdkDragDrop<string[]>) {
    // moveItemInArray(this.evaluations, event.previousIndex, event.currentIndex);
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  getOtherLists(index: number) {
    var result: string[] = [];
    for (let i = 0; i < this.tables; i++) {
      if (index != i) {
        result.push(`item-list-${i}`)
      }
    }
    return result;

    // ['item-list-2']
  }

}

export interface Guest {
  id: string,
  name: string,
  gender: Gender,
  fixedPersonId: string
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}