import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  displayNumber: string = '0';
  numbers: number[] = [];
  selectedOperator: string = '';
  displayAns: boolean = false;
  decimal: boolean = true;
  button: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }


  cleanDisplay() {
    this.displayNumber = '0';
    this.numbers = [];
    this.decimal = true;
  }

  cleanNumber() {
    const nums = this.displayNumber.slice(0, -1);
    this.displayNumber = nums;
    this.numbers = [];
    this.decimal = true;
  }

  onNumber(num) {
    if (this.button) {
      this.displayAns || this.displayNumber === '0' ? this.displayNumber = num : this.displayNumber += num;
      this.displayAns = false;
    }
    this.button = this.displayNumber.length < 8;
  }

  onOperator(operator) {
    this.button = true;
    this.onEqual();
    this.selectedOperator = operator;
    this.numbers.push(+this.displayNumber);
  }

  onSign() {
    this.displayNumber = +this.displayNumber > 0 ? `-${this.displayNumber}` : Math.abs(+this.displayNumber).toString();
  }

  onPercentage() {
    this.displayNumber = `${(+this.displayNumber / 100).toFixed(3)}`;
  }

  onDecimal() {
    if (this.decimal && this.button) {
      this.displayNumber += '.';
      this.decimal = false;
    }
  }

  onEqual() {
    this.numbers.push(+this.displayNumber);
    switch (this.selectedOperator) {
      case 'add':
        this.displayNumber = `${this.numbers.reduce((a, b) => a + b)}`;
        break;
      case 'substract':
        this.displayNumber = `${this.numbers.reduce((a, b) => a - b)}`;
        break;
      case 'divide':
        this.displayNumber = `${this.numbers.reduce((a, b) => a / b)}`;
        break;
      case 'multiply':
        this.displayNumber = `${this.numbers.reduce((a, b) => a * b)}`;
        break;
    }
    this.displayNumber = this.displayNumber.length > 8 ? 'Err' : this.displayNumber;
    this.numbers = [];
    this.displayAns = true;
    this.decimal = true;
  }

}
