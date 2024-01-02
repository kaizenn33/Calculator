class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.previousOperandTextElement.textContent = '';
    }
    del(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    append(number){
        if(number === '.' && this.currentOperand.includes('.'))
        return
        this.currentOperand += number.toString();
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !==''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.previousOperandTextElement.textContent = '';
    }
    getdisplay(number){
        const stringNum = number.toString();
        const intNum = parseFloat(stringNum.split('.')[0]);
        const deciNum = stringNum.split('.')[1];
        let integerdispaly
        if(isNaN(intNum)){
            integerdispaly = '';
        }else{
            integerdispaly = intNum.toLocaleString('en', {maximumFractionDigits:0});
        }
        if(deciNum != null){
            return `${integerdispaly}.${deciNum}`
        }else{
            return integerdispaly;
        }
        // const floatNumber = parseFloat(number);
        // if(isNaN(floatNumber)) return ''
        // return floatNumber.toLocaleString('en');

    }
    update(){
      this.currentOperandTextElement.textContent = 
      this.getdisplay(this.currentOperand)
      if(this.operation != null){
          this.previousOperandTextElement.textContent = 
          `${this.getdisplay(this.previousOperand)} ${this.operation}`;
      }     
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operation = document.querySelectorAll('[data-operation]');
const equal = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-del]');
const allclear = document.querySelector('[data-ac]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calcu = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calcu.append(button.textContent);
        calcu.update();
    })
});
operation.forEach(button =>{
    button.addEventListener('click', ()=>{
        calcu.chooseOperation(button.textContent);
        calcu.update();
    })
});

equal.addEventListener('click', button => {
    calcu.compute();
    calcu.update();
})
allclear.addEventListener('click', button => {
    calcu.clear();
    calcu.update();
})
deleteButton.addEventListener('click', button => {
    calcu.del();
    calcu.update();
})