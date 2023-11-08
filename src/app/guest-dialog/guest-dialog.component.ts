import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Gender, Guest } from '../app.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { v4 as uuidv4 } from 'uuid';

export interface IGuestForm extends FormGroup<{
  name: FormControl<string | null | undefined>,
  gender: FormControl<string | null | undefined>,
  partner: FormControl<string | null | undefined>
}> { };

@Component({
  selector: 'app-guest-dialog',
  templateUrl: './guest-dialog.component.html',
  styleUrls: ['./guest-dialog.component.css']
})
export class GuestDialogComponent implements OnInit {
  @ViewChild(MatAutocomplete) auto!: MatAutocomplete;

  titel: string = "Tilføj Gæst";

  // guestForm!: IGuestForm;
  
  genderOptions: string[] = ['Male', 'Female', 'Other'];
  guestList: Guest[] = [];
  chosenGuest: Guest[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];

  // name: string = "";
  // gender: Gender;
  // partnerId: string;

  guestForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    gender: new UntypedFormControl(''),
    partner: new UntypedFormControl(''),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Guest[], public dialogRef: MatDialogRef<GuestDialogComponent>) {
    // this.guestForm2 = new FormGroup({
    //   name: new FormControl<string | null | undefined>('', Validators.required),
    //   gender: new FormControl<string | null | undefined>(''),
    //   partner: new FormControl<string | null | undefined>('')
    //   // dateOfIssue: new FormControl<string | null | undefined>(this.data.dateOfIssue, Validators.required),
    // });
    this.guestForm = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
      gender: new UntypedFormControl(''),
      partner: new UntypedFormControl('', Validators.maxLength(2)),
    });
  }

  ngOnInit(): void {
    this.guestList = this.data;
  }

  print() {
    console.log(this.guestForm.value)
  }

  guestSelected(guest: string): void {
    // var oldText = this.evaluationForm.controls.evaluationText.value ?? '';
    // var splitter = !oldText.endsWith('.') ? '. ' : ' ';
    // var newText = `${oldText}${splitter}${text}`.trimStart();
    this.guestForm.controls.partner.setValue(guest);
    // this.evaluationForm.controls.standardTextsFilter.setValue('');
  }
  
  onRemove(guest: Guest) {
    this.chosenGuest = this.chosenGuest!.filter(g => g.id != guest.id);
    this.guestForm.controls.partner.setValue(this.chosenGuest!.map(g => g.id!));
  }

  onAddGuest(event: MatChipInputEvent) {
    if (event.value) {
      var guest = this.guestList.find(g => g.id.includes(event.value));
      if (guest) {
        this.chipSelected(guest);
      }
    }
  }

  chipSelected(value: Guest): void {
    if (value) {
      this.chosenGuest!.push(value);
      this.guestForm.controls.partner.setValue(this.chosenGuest!.map(g => g.id!));

    }
    // this.deficiencyForm.controls.actionCodeFilter.setValue('');
    // this.allActionCodeStatesFiltered.push(...this.allActionCodeStates.filter(ac => !this.isAssignedActionCode(ac.code!)));
  }

  submit() {
    if (this.guestForm.valid) {
      var resultGuest: Guest = {
        id: uuidv4(),
        name: this.guestForm.controls.name.value,
        gender: this.guestForm.controls.gender.value,
        fixedPersonId: this.guestForm.controls.partner.value
      }
      this.dialogRef.close(resultGuest);
    }
  }

  genderClass() {
    if (this.guestForm.controls.gender.value == 1) {
      return 'male'
    }
    else if (this.guestForm.controls.gender.value == 2) {
      return 'female'
    }
  }

}
