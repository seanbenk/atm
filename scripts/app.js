let balanceNumberText = document.querySelector('.user-balance span')
let screen = document.querySelector('.screen');
let inputField = document.querySelector('.input-field');
let transactionMsg = document.querySelector('.transaction-msg');
let homeBtn = document.querySelector('.home-btn');
let depositBtn = document.querySelector('.deposit-btn');
let withdrawBtn = document.querySelector('.withdraw-btn');
let numPadBtn = document.querySelectorAll('.num-pad-btn');
let clearBtn = document.querySelector('.clear-btn');
let enterBtn = document.querySelector('.enter-btn');

let withdrawLimit = 0;
let currentBalance = 0;
let atmState = 'home';
setHome();

function handleBackground(){
    if(currentBalance > 0){
        screen.style.background = 'linear-gradient(blue, lightblue, lightblue, blue';
    }
    else{
        screen.style.background = 'linear-gradient(green, rgb(150, 240, 150), rgb(150, 240, 150), green';
    }
}

function setWithdraw(){
    transactionMsg.textContent = 'WITHDRAW AMOUNT';
    atmState = 'withdraw';
    handleClear();
}

function setDeposit(){
    transactionMsg.textContent = 'DEPOSIT AMOUNT';
    atmState = 'deposit';
    handleClear();
}

function setHome(){
        transactionMsg.textContent = 'WITHDRAW OR DEPOSIT';
        atmState = 'home';
        handleBackground();
        handleClear();
}

function handleClear(){
    inputField.value = '';
}

let handler = {
    home: function(){
        setHome();
    },

    withdraw: function() {
        
        if (withdrawLimit >= 10){
            transactionMsg.textContent = 'MAX withraws reached';
            return;
        }
        if(currentBalance >= Number(inputField.value)){
        currentBalance -= Number(inputField.value);
        inputField.value = '';
        balanceNumberText.textContent = String(currentBalance);
        withdrawLimit++;
        setHome();
        }
        else{
            transactionMsg.textContent = 'ERR. NOT ENOUGH FUNDS';
            inputField.value = '';
        }
    },

    deposit: function(){
        currentBalance += Number(inputField.value);
        inputField.value = '';
        balanceNumberText.textContent = String(currentBalance);
        setHome();
    }

}

function handleNumPadClick(number){
    inputField.value += number;
}

for (let i = 0; i < numPadBtn.length; i++){
    numPadBtn[i].addEventListener('click', function(){
        handleNumPadClick(numPadBtn[i].value);
    })
}

homeBtn.addEventListener('click', setHome);
depositBtn.addEventListener('click', setDeposit);
withdrawBtn.addEventListener('click', setWithdraw);
clearBtn.addEventListener('click', handleClear)
enterBtn.addEventListener('click', function (){
    handler[atmState]();
});