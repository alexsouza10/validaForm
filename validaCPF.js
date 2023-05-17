// 705.484.450-52 070.987.720-03
class isValid {
  constructor(sentCpf) {
    Object.defineProperty(this, 'cpfClean', {
      writable: false,
      enumerable: true,
      configurable: false,
      value: sentCpf.replace(/\D+/g, '')
    });
  }

  éSequência() {
    return this.cpfClean.charAt(0).repeat(11) === this.cpfClean;
  }

  generateNewCpf() {
    const cpfWithoutDigits = this.cpfclean.slice(0, -2);
    const digit1 = isValid.generateDigit(cpfWithoutDigits);
    const digit2 = isValid.generateDigit(cpfWithoutDigits + digit1);
    this.newCPF = cpfWithoutDigits + digit1 + digit2;
  }

  static generateDigit(cpfWithoutDigits) {
    let total = 0;
    let reverse = cpfWithoutDigits.length + 1;

    for(let numericString of cpfWithoutDigits) {
      total += reverse * Number(numericString);
      reverse--;
    }

    const digit = 11 - (total % 11);
    return digit <= 9 ? String(digit) : '0';
  }

  validate() {
    if(!this.cpfClean) return false;
    if(typeof this.cpfClean !== 'string') return false;
    if(this.cpfClean.length !== 11) return false;
    if(this.éSequência()) return false;
    this.generateNewCpf();

    return this.newCPF === this.cpfClean;
  }
}

// let validacpf = new ValidaCPF('070.987.720-03');
// // validacpf = new ValidaCPF('999.999.999-99');

// if (validacpf.valida()) {
//   console.log('CPF válido');
// } else {
//   console.log('CPF inválido');
// }
