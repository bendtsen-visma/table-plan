import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Gender, Guest } from '../app.component';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyAutocomplete as MatAutocomplete } from '@angular/material/legacy-autocomplete';

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

  guestForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    gender: new UntypedFormControl(''),
    partner: new UntypedFormControl(''),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Guest[]) {
    this.guestForm = new UntypedFormGroup({
      name: new UntypedFormControl(''),
      gender: new UntypedFormControl(''),
      partner: new UntypedFormControl(''),
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
