import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Moment } from '../Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css'],
})
export class MomentFormComponent implements OnInit {
  @Input() momentData: Moment | null = null;
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() btnText!: string;

  image?: File;
  momentForm!: FormGroup;

  ngOnInit(): void {
    if (this.momentData) {
      console.log(this.momentData);
      this.momentForm = new FormGroup({
        id: new FormControl(this.momentData.id),
        title: new FormControl(this.momentData.title, [Validators.required]),
        description: new FormControl(this.momentData.description, [
          Validators.required,
        ]),
        image: new FormControl(''),
      });
    } else {
      this.momentForm = new FormGroup({
        id: new FormControl(''),
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        image: new FormControl(''),
      });
    }
  }

  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.momentForm.patchValue({ image: file });
  }

  submit() {
    if (this.momentForm.invalid) return;

    console.log(this.momentForm.value);

    this.onSubmit.emit(this.momentForm.value);
  }
}
