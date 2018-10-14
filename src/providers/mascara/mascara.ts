import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class MascaraProvider {

  constructor(protected toast: ToastController) { }

  getFormattedPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  }
  MaskCEP(dados: string) {
    if (!dados) {
      return "";
    }
    var CEP = dados.replace(/[. ()-]/g, "").replace(/[^0-9]+/g, "");
    if (CEP.length == 0) {
      dados = ""
    }
    else if (CEP.length <= 5) {
      dados = CEP.substr(0, 5);
    }
    else if (CEP.length > 5) {
      dados = CEP.substr(0, 5) + '-' +
        CEP.substr(5, 3);
    }
    return dados;
  }
  MaskCPF(dados: string) {
    if (!dados) {
      return "";
    }
    var CPF = dados.replace(/[. /-]/g, "").replace(/[^0-9]+/g, "");
    if (CPF.length == 0) {
      dados = "";
    }
    else if (CPF.length <= 3) {
      dados = CPF;
    }
    else if (CPF.length <= 6) {
      dados = CPF.substr(0, 3) + '.' +
        CPF.substr(3, 3);
    }
    else if (CPF.length <= 9) {
      dados = CPF.substr(0, 3) + '.' +
        CPF.substr(3, 3) + '.' +
        CPF.substr(6, 3);
    } else if (CPF.length > 9) {
      dados = CPF.substr(0, 3) + '.' +
        CPF.substr(3, 3) + '.' +
        CPF.substr(6, 3) + '-' +
        CPF.substr(9, 2);
    }
    return dados;
  }
  MaskCNPJ(v: string) {
    if (!v) {
      return "";
    }
    v = v.replace(/^(\d{2})(\d)/, "$1.$2")
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")
    v = v.replace(/(\d{4})(\d)/, "$1-$2")
    return v;
  }

  MaskTelefone(dados: string) {
    if (!dados) {
      return "";
    }
    var FONE = dados.replace(/[. ()-]/g, "").replace(/[^0-9]+/g, "");
    if (FONE.length == 0) {
      dados = "";
    }
    else if (FONE.length <= 3) {
      dados;
    }
    else if (FONE.length <= 6) {
      dados = '(' + FONE.substr(0, 2) + ') ' +
        FONE.substr(2, 5);
    }
    else if (FONE.length <= 10) {
      dados = '(' + FONE.substr(0, 2) + ') ' +
        FONE.substr(2, 4) + '-' +
        FONE.substr(6, 4);
    }
    else if (FONE.length > 10) {
      dados = '(' + FONE.substr(0, 2) + ') ' +
        FONE.substr(2, 5) + '-' +
        FONE.substr(7, 4);
    }
    return dados
  }
  ValidaCNPJ(cnpj: string) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
      return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999")
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2)
        pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != Number(digitos.charAt(0)))
      return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2)
        pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != Number(digitos.charAt(1)))
      return false;

    return true;
  }
  ValidaCPF(dados: string) {
    if (!dados) {
      return "";
    }
    var i = 0;
    if ((dados = dados.replace(/[^\d]/g, "")).length != 11) {
      let t = this.toast.create({
        message: 'CPF Inválido',
        duration: 3000
      })
      t.present()
      return false;
    }

    if (dados == "00000000000" || dados == "11111111111" || dados == "22222222222" ||
      dados == "33333333333" || dados == "44444444444" || dados == "55555555555" ||
      dados == "66666666666" || dados == "77777777777" || dados == "88888888888" || dados == "99999999999") {
      let t = this.toast.create({
        message: 'CPF Inválido',
        duration: 3000
      })
      t.present()
      return false;
    }
    var r;
    var s = 0;
    for (i = 1; i <= 9; i++)
      s = s + parseInt(dados[i - 1]) * (11 - i);
    r = (s * 10) % 11;
    if ((r == 10) || (r == 11))
      r = 0;
    if (r != parseInt(dados[9])) {
      let t = this.toast.create({
        message: 'CPF Inválido',
        duration: 3000
      })
      t.present()
      return false;
    }
    s = 0;
    for (i = 1; i <= 10; i++)
      s = s + parseInt(dados[i - 1]) * (12 - i);
    r = (s * 10) % 11;
    if ((r == 10) || (r == 11))
      r = 0;
    if (r != parseInt(dados[10])) {
      let t = this.toast.create({
        message: 'CPF Inválido',
        duration: 3000
      })
      t.present()
      return false;
    }
    return true;
  }
  ValidaEmail(dados: string) {
    var check = /^[\w_.-]+@[\w]+\.[\w|\.]+$/;
    if (dados.search(check) == -1)
      return false
    else return true;
  }
  MaskMoeda(valor) {
    if (!valor) {
      return "";
    }
    var v = valor + "";
    // if (v.indexOf(".") == -1)
    //   v = v + "00"

    v = v.replace(/\D/g, "") // permite digitar apenas numero
    v = v.replace(/(\d{1})(\d{14})$/, "$1.$2") // coloca ponto antes dos ultimos digitos
    v = v.replace(/(\d{1})(\d{11})$/, "$1.$2") // coloca ponto antes dos ultimos 11 digitos
    v = v.replace(/(\d{1})(\d{8})$/, "$1.$2") // coloca ponto antes dos ultimos 8 digitos
    v = v.replace(/(\d{1})(\d{5})$/, "$1.$2") // coloca ponto antes dos ultimos 5 digitos
    v = v.replace(/(\d{1})(\d{1,2})$/, "$1,$2") // coloca virgula antes dos ultimos 2 digitos
    return "R$ " + v
  }
  ValidaCelular(dados: string) {
    if (!dados) {
      return false;
    }
    dados = dados.replace("(", "");
    dados = dados.replace(")", "");
    dados = dados.replace("-", "");
    dados = dados.replace(" ", "").trim();
    if (dados == '0000000000' || dados == '00000000000' || dados.length < 10 || dados.length > 11) {
      let t = this.toast.create({
        message: 'Celular Inválido',
        duration: 3000
      })
      t.present()
      return false;
    }
    if (["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "20", "23", "25", "26", "29", "30", "36", "39", "40", "50", "52", "56", "57", "58", "59", "60", "70", "72", "76", "78", "80", "90"].indexOf(dados.substring(0, 2)) != -1) {
      let t = this.toast.create({
        message: 'DDD Inválido',
        duration: 3000
      })
      t.present()
      return false;
    }
    if (["9"].indexOf(dados.substring(2, 3)) == -1) {
      let t = this.toast.create({
        message: 'Número deve começar com digito 9',
        duration: 3000
      })
      t.present()
      return false;
    }
    return true;
  }
  ValidaFixo(dados: string) {
    if (!dados) {
      return false;
    }
    dados = dados.replace("(", "");
    dados = dados.replace(")", "");
    dados = dados.replace("-", "");
    dados = dados.replace(" ", "").trim();
    if (dados == '0000000000' || dados == '00000000000' || dados.length < 10 || dados.length > 11) {
      let t = this.toast.create({
        message: 'Telefone Inválido',
        duration: 3000
      })
      t.present()
      return false;
    }
    if (["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "20", "23", "25", "26", "29", "30", "36", "39", "40", "50", "52", "56", "57", "58", "59", "60", "70", "72", "76", "78", "80", "90"].indexOf(dados.substring(0, 2)) != -1) {
      let t = this.toast.create({
        message: 'DDD Inválido',
        duration: 3000
      })
      t.present()
      return false;
    }
    return true;
  }
  tranformaDinheiro(valor) {
    if(valor=="null")
    return null;
    if (valor == null || valor == 0 || Number.isInteger(valor))
      return valor;
      valor=valor+"";
    if (valor.indexOf(",") != -1) {
      for (var i = 0; i < 8; i++) {
        valor = valor.replace(".", "");
      }
      valor = valor.replace(",", ".");
    }
    valor = valor.replace("R$ ", "")
    return valor;
  }
}
