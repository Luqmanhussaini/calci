// document.getElementById("this").innerHTML="hi";
class Calculator {
    constructor(dataprev, datacurrent) {
        this.dataprev = dataprev
        this.datacurrent = datacurrent
        this.clear()
    }
    clear() {
        this.curoptr = ""
        this.prevoptr = ""
        this.operation = undefined
    }
    delete() {
        this.curoptr=this.curoptr.toString().slice(0,-1)
    }
    appendNumber(number) {
        if (number === "." && this.curoptr.includes('.')) return
        this.curoptr = this.curoptr.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.curoptr === "") return
        if (this.prevoptr !== "") this.compute()
        this.operation = operation
        this.prevoptr = this.curoptr
        this.curoptr = ""
    }
    compute() {
        let computation
        const prev = parseFloat(this.prevoptr)
        const cur = parseFloat(this.curoptr)
        if (isNaN(prev) || isNaN(cur)) return
        switch (this.operation) {
            case '+':
                computation = prev + cur
                break
            case '-':
                computation = prev - cur
                break
            case 'x':
                computation = prev * cur
                break
            case '÷':
                computation = prev / cur
                break
            default:
                return
        }
        this.curoptr=computation
        this.operation=undefined
        this.prevoptr=""

    }
    getDisplayNumber(number){
        const stringnum=number.toString()
        const integerdig=parseFloat(stringnum.split('.')[0])
        const decimaldig=stringnum.split('.')[1]
        let intdisplay
        if(isNaN(integerdig))
        intdisplay=""
        else{
            intdisplay=integerdig.toLocaleString('en',{maximumFractionDigits:0})
        }
        if(decimaldig!=null)
        return `${intdisplay}.${decimaldig}`
        else return intdisplay
    }
    updateDisplay() {
        this.datacurrent.innerText=this.getDisplayNumber(this.curoptr)
        if(this.operation!=null){
            this.dataprev.innerText=`${this.getDisplayNumber(this.prevoptr)} ${this.operation}`
        }
        else{
            this.dataprev.innerText=""
        }
    }
}


const numberbtn = document.querySelectorAll('[data-num]')
const numberopt = document.querySelectorAll('[data-optr]')
const equalbtn = document.querySelector('[data-equal]')
const delbtn = document.querySelector('[data-del]')
const clrbtn = document.querySelector('[data-clear]')
const dataprev = document.querySelector('[data-prev]')
const datacurrent = document.querySelector('[data-current]')

const calculator = new Calculator(dataprev, datacurrent)

numberbtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


numberopt.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalbtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clrbtn.addEventListener('click',button=>{
    calculator.clear()
    calculator.updateDisplay()
})
delbtn.addEventListener('click',button=>{
    calculator.delete()
    calculator.updateDisplay()
})
