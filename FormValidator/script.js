let Validator = {
  handleSubmit: event => {
    event.preventDefault();
    
    let send = true;
    let inputs = form.querySelectorAll('input');

    Validator.clearErros();

    inputs.forEach(input => {
      let check = Validator.checkInput(input);
      if (check !== true) {
        send = false;
        Validator.showError(input, check);
      }
    })

    if (send) {
      form.submit();
    }
  },

  checkInput: input => {
    let rules = input.getAttribute('data-rules');

    let erro = true;
    if (rules !== null) {
      rules = rules.split('|');
      rules.forEach(rule => {
        let ruleDetails = rule.split('=');
        switch(ruleDetails[0]) {
          case 'required':
            if (input.value == '') erro = 'Campo obrigatório.';
            break;
          case 'min':
            if (input.value.length < ruleDetails[1]) erro = `Pelo menos ${ruleDetails[1]} caracteres`
            break;
          case 'email':
            if(input.value != '') {
              let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
              if (!regex.test(input.value.toLowerCase())) {
                error = 'Deve ser um e-mail válido';
              }
            }
            break;
          case 'equal':
            const pass = document.querySelector('#pass');
            const confirmPass = document.querySelector('#confirm-pass')

            if (!(pass.value === confirmPass.value)) {
              erro = 'Senhas não conferem.'
            }
            break;
          }
        });
      }
      return erro;
    },

    showError: (input, error) => {
      input.classList.add('error');
      const errorElement = document.createElement('span');
      errorElement.classList.add('errorMessage');
      errorElement.innerHTML = error;

      input.parentElement.insertBefore(errorElement, input.elementSibling)
    },

    clearErros: () => {
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => input.classList.remove('error'));

      const errorElements = document.querySelectorAll('.errorMessage');
      errorElements.forEach(error => error.remove())
    }
}


const form = document.querySelector('.validator');
const login = document.querySelector('#login');
login.addEventListener('click', event => event.preventDefault())

form.addEventListener('submit', Validator.handleSubmit)