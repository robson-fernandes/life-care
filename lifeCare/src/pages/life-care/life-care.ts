import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-life-care',
  templateUrl: 'life-care.html'
})
export class LifeCarePage {

  classificacao: string = "mu";
  clinica: string = "a";
  tempoMedioAtendimento : number = 140;

  constructor(public loadingCtrl: LoadingController) {
    this.calculate();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "<ion-spinner></ion-spinner>",
      duration: 1000
    });
    loader.present();
  }


  calculateClassificacaoEvent(c){
    this.classificacao = c;
    this.calculate();
  }

  calculateClinicaEvent(c){

    this.clinica = c;
    this.calculate();
  }


  calculate(){

    this.presentLoading();

    //-------------------------------------
    //Classificação
    //-------------------------------------
    let x1A = 0; // Não Urgente
    let x1B = 0; // Pouco Urgente
    let x1C = 0; // Urgente
    let x1D = 0; // Muito Urgente

    if (this.classificacao == "mu"){
      x1D = 1; // Muito Urgente
    }
    else if (this.classificacao == "u"){
      x1C = 1; // Urgente
    }
    else if (this.classificacao == "pu"){
      x1B = 1; // Pouco Urgente
    }
    else if (this.classificacao == "n"){
      x1A = 1; // Não Urgente
    }

    //-------------------------------------
    //Clínica
    //-------------------------------------
    let x2R = 0; // Adulto ou Infantil

    if (this.clinica == "a"){
      x2R = 1;
    }

    //-------------------------------------
    //Período
    //-------------------------------------
    let x3P2 = 0; //06:00 AM - 11:59 AM
    let x3P3 = 0; //12:00 PM - 17:59 PM
    let x3P4 = 0; //18:00 Pm - 23:59 PM

    let currentTime = new Date();
    let ano = currentTime.getFullYear();
    let mes = currentTime.getMonth();
    let dia = currentTime.getDate();

    let startTimex3P2 = new Date(ano, mes, dia , 6, 0, 0, 0); //6:00am today
    let endTimex3P2 = new Date(ano, mes, dia, 11, 59, 0, 0); //11:59am today

    let startTimex3P3 = new Date(ano, mes, dia, 12, 0, 0, 0); //12:00pm today
    let endTimex3P3 = new Date(ano, mes, dia, 17, 59, 0, 0); //17:59pm today

    let startTimex3P4 = new Date(ano, mes, dia, 18, 0, 0, 0); //18:00pm today
    let endTimex3P4 = new Date(ano, mes, dia, 23, 59, 0, 0); //23:59pm today

    //06:00 AM - 11:59 AM
    if ((currentTime.getTime() >= startTimex3P2.getTime()) && (currentTime.getTime() <= endTimex3P2.getTime()))
    {
      x3P2 = 1;
    }
    //12:00 PM - 17:59 PM
    else if ((currentTime.getTime() >= startTimex3P3.getTime()) && (currentTime.getTime() <= endTimex3P3.getTime()))
    {
      x3P3 = 1;
    }
    //18:00 Pm - 23:59 PM
    else if ((currentTime.getTime() >= startTimex3P4.getTime()) && (currentTime.getTime() <= endTimex3P4.getTime()))
    {
      x3P4 = 1;
    }
    //-------------------------------------

    /**
     * Cálculo dos Betas
     * @type {number}
     */

    let betas = 2.2619 * x1A +
                2.2783 * x1B +
                1.8414 * x1C +
                1.5244 * x1D +

                0.2614 * x2R +

                -0.0836 * x3P2 +
                0.1251  * x3P3 +
                -0.0197 * x3P4;

    //Variável T
    let t = 200;

    let primeiraDivisao = (1 / (Math.pow((2 * Math.PI),0.5) * 0.2175 * t));

    let expBetas = (Math.log(t) - Math.exp(betas)) / (0.2175);

    expBetas = Math.pow(expBetas, 2);

    let exp = Math.exp(-0.5 * expBetas);

    if (exp == 0) exp = 1

    let distribuicaoLogNormal = primeiraDivisao * exp;


    this.tempoMedioAtendimento = Math.round(expBetas / 10);
  }
}
