import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { GuestDialogComponent } from './guest-dialog/guest-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'table-plan';

  tables = 4;
  seats = 6;

  guestList: Guest[] = [];

  list: Guest[][] = [];
  tableIds: string[] = [];

  constructor(private dialog: MatDialog) {
    let g1: Guest = {
      id: '1',
      name: 'Filippa',
      gender: '2',
      fixedPersonId: [],
    };
    let g2: Guest = {
      id: '2',
      name: 'Andreas',
      gender: '1',
      fixedPersonId: [],
    };
    this.guestList = [g1, g2];
  }

  public generateLists() {
    this.list = [];
    this.tableIds = [];

    for (let i = 0; i < this.tables; i++) {
      var tmpList: Guest[] = [];

      // for (let j = 0; j < this.seats; j++) {
      //   tmpList.push('test')
      // }

      this.list.push(tmpList);
      this.tableIds.push(`item-list-${i}`);
    }
    // this.list = [];
    // this.tableIds = [];

    // for (let i = 0; i < this.tables; i++) {
    //   var tmpList: string[] = [];

    //   for (let j = 0; j < this.seats; j++) {
    //     tmpList.push('test')
    //   }

    //   this.list.push(tmpList);
    //   this.tableIds.push(`item-list-${i}`)
    // }
  }

  addPerson() {
    const dialogRef = this.dialog.open(GuestDialogComponent, {
      width: '600px',
      data: this.guestList,
    });

    dialogRef.afterClosed().subscribe((data: Guest) => {
      if (data) {
        this.guestList.push(data);
        //update list
      }
    });

    // dialogRef.afterClosed().subscribe((data) => {
    //   if (data) {
    //     console.log(data);
    //   }
    // });
  }

  drop(event: CdkDragDrop<string[]>) {
    // moveItemInArray(this.evaluations, event.previousIndex, event.currentIndex);

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getOtherLists(index: number) {
    var result: string[] = [];
    for (let i = 0; i < this.tables; i++) {
      if (index != i) {
        result.push(`item-list-${i}`);
      }
    }
    result.push('guest-list');
    return result;

    // ['item-list-2']
  }

  // getTableLists() {}

  itemGenderClass(person: Guest) {
    if (person.gender == '1') {
      return 'male-2';
    } else if (person.gender == '2') {
      return 'female-2';
    } else {
      return 'other-gender';
    }
  }

  removeGuest(personId: string) {
    this.guestList = this.guestList.filter((guest) => guest.id != personId);
  }

  fixedPersonName(person: Guest) {
    let resultString = '';
    let count = 0;
    if (person.fixedPersonId) {
      person.fixedPersonId.forEach((id) => {
        var fixedPerson = this.guestList.find((g) => g.id == id);
        if (count == 0) resultString += fixedPerson.name + ', ';
        else if (count > 0) resultString += fixedPerson.name;
        count++;
      });
    }

    if (resultString) return `(${resultString})`;
    else return '';
  }
}

export interface Guest {
  id: string;
  name: string;
  gender: string;
  fixedPersonId: string[];
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}
