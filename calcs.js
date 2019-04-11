const operators = ['+', '-', '*', '/'];
var newNum = true;

function operate(problemArray){
    var solution = 0;
    var firstIndex = smallestNonZero(problemArray.findIndex(op => op ==='*'),problemArray.findIndex(op => op ==='/'),
        problemArray.findIndex(op => op ==='+'),problemArray.findIndex(op => op ==='-'));

    if(firstIndex > 0){
        var answer = evaluate(problemArray[firstIndex -1], problemArray[firstIndex+1], problemArray[firstIndex]);
    
        solution = operate([...problemArray.slice(0,firstIndex-1), answer, ...problemArray.slice(firstIndex+2)])
    }else{
        solution = problemArray[0];
    }
    return solution;

}

function smallestNonZero(mult,div, plus, min){
    if(mult!= -1|| div !=-1){
        if((mult<div && mult!=-1)||div<0){
            return mult;
        }else{
            return div;
        }
    }else{
        if((plus < min && plus !=-1)|| min<0){
            return plus;
        }
        else{
            return min;
        }

    }
    
}

function evaluate(a,b,operator){
    solution = 0;
    switch(operator){
        case '*':
            solution = a*b;
            break;
        case '/':
            solution = a/b;
            break;
        case '-':
            solution = a-b;
            break;
        case '+':
            solution = parseFloat(a)+parseFloat(b);
            break;
    }
    return solution;
}

function showNumber(key){
    console.log(key);
    var scr = document.querySelector("#screen");
    if(key=='Enter'|| key=='='){
        scr.textContent = operate(scr.textContent.split(" ")) + ' ';
        newNum = true;
    }else if(!isNaN(key)){
        if(newNum){
            scr.textContent = key;
            newNum = false;
        }else{
            scr.textContent += key;
        }
        
    }else if(operators.some(op => op == key)){
        if(newNum){
            scr.textContent += key + ' ';
            newNum = false;
        }else{
            scr.textContent += ' ' + key + ' ';
        }
        
    }else if(key =="Escape"|| key== "CE"){
        scr.textContent = '0';
        newNum = true;
    }
    
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('click',(e) =>{showNumber(e.target.id)}));
window.addEventListener('keydown', (e) =>{showNumber(e.key)});

console.log(operate("3 + 4 * 4 / 5 - 6 + 3 - 5 / 29 + 45".split(' ')));
