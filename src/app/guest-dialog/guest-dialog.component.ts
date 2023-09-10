import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Gender, Guest } from '../app.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';

@Component({
  selector: 'app-guest-dialog',
  templateUrl: './guest-dialog.component.html',
  styleUrls: ['./guest-dialog.component.css']
})
export class GuestDialogComponent implements OnInit {
  @ViewChild(MatAutocomplete) auto!: MatAutocomplete;

  titel: string = "Tilføj Gæst";
  
  genderOptions: string[] = ['Male', 'Female', 'Other'];
  guestList: Guest[] = [];
  chosenGuest: Guest[] = [];

  // name: string = "";
  // gender: Gender;
  // partnerId: string;

  guestForm = new FormGroup({
    name: new FormControl(''),
    gender: new FormControl(''),
    partner: new FormControl(''),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Guest[]) {
    this.guestForm = new FormGroup({
      name: new FormControl(''),
      gender: new FormControl(''),
      partner: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.guestList = this.data;
  }

  print() {
    console.log(this.guestForm)
  }

  guestSelected(guest: string): void {
    // var oldText = this.evaluationForm.controls.evaluationText.value ?? '';
    // var splitter = !oldText.endsWith('.') ? '. ' : ' ';
    // var newText = `${oldText}${splitter}${text}`.trimStart();
    this.guestForm.controls.partner.setValue(guest);
    // this.evaluationForm.controls.standardTextsFilter.setValue('');
  }
  

}
