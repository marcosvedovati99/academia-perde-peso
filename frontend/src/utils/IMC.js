const IMC = {
  getValor(peso, altura) {
    return peso/(altura*altura)
  },
  getNivel(imc) {
    switch (true) {
      case imc < 18.5:
        return "Abaixo do peso";
      case imc >= 18.5 && imc < 24.9:
        return "Peso normal";
      case imc >= 25 && imc < 29.9:
        return "Sobrepeso";
      case imc >= 30 && imc < 34.9:
        return "Obesidade grau 1";
      case imc >= 35 && imc < 39.9:
        return "Obesidade grau 2";
      default:
        return "Obesidade grau 3";
    }
  }
};

export default IMC;
