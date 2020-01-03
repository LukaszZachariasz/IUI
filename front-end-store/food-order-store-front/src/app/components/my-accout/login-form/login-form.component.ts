import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  validatingForm: FormGroup;

  ngOnInit() {
    this.validatingForm = new FormGroup({
      input: new FormControl(null, Validators.required)
    }, {updateOn: 'submit'});
  }

  get input() {
    return this.validatingForm.get('input');
  }

  onSubmit() {
    this.validatingForm.controls.input.markAsTouched();
  }
}
