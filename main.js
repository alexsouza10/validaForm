class validateForm {
  constructor() {
    this.form = document.querySelector('.form');
    this.events();
  }

  events() {
    this.form.addEventListener('submit', e => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const validate = this.validate();
    const validPassword = this.validPassword();
  
    if(validate && validPassword) {
     alert('Form Sent Successfully.');
     this.form.submit();
    }
  }

  validPassword() {
    let valid = true;

    const password = this.form.querySelector('.password');
    const repeatPassword = this.form.querySelector('.repeat-password');
    
    if(password.value !== repeatPassword.value){
      valid = false;
      this.createError(password, 'Password field and repeat password need to be the same.');
      this.createError(repeatPassword, 'Password field and repeat password need to be the same.');
    }

    if(password.value.length < 6 || password.value.length > 12) {
      valid = false;
      this.createError(password, 'Password must be between 6 and 12 characters');
    }

    return valid;
  }

  validate() {
    let valid = true;

    for(let errorText of this.form.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for(let field of this.form.querySelectorAll('.validate')) {
      const label = field.previousElementSibling.innerText;

      if(!field.value) {
       this.createError(field, `Field "${label}" cannot be empty.`);
       valid = false;
      }

      if(field.classList.contains('.cpf')){
       if(!this.validCPF(field)) valid = false;
      }

      if(field.classList.contains('.user')){
       if(!this.validUser(field)) valid = false;
      }
    }
    
    return valid;
  }

  validUser(field) {
    const user = field.value;
    let valid = true;
    
    if(user.length < 3 || user.length > 12) {
      this.createError(field, 'User must be between 3 and 12 characters.');
      valid = false;
    }

    if(!user.match(/^[a-zA-Z0-9]+$/g)) {
      this.createError(field, 'Username must only contain letters and/or numbers.');
      valid = false;
    }

    return valid;
  }

  isValid(field){
    const cpf = new IsValid(field.value);

    if(!cpf.valida()) {
      this.createError(field, 'CPF invalid');
      return false;
    }
    
    return true;
  }

  createError(field, message) {
    const div = document.createElement('div');
    div.innerHTML = message;
    div.classList.add('error-text');
    field.insertAdjacentElement('afterend', div);
  }
}

const validate = new validateForm();
