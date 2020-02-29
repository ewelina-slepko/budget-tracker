import {NgForm} from '@angular/forms';


export function isNameValid(form: NgForm) {
  return form.form.value.Name && form.form.value.Name.length > 1;
}

export function isEmailValid(form: NgForm) {
  const validation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validation.test(String(form.form.value.Email).toLowerCase());
}

export function isPasswordValid(form: NgForm) {
  const validation = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/;
  return validation.test(String(form.form.value.Password));
}
