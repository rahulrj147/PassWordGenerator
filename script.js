let finalpass = document.querySelector('.output');
let passlength = document.querySelector('.num');
let copy = document.querySelector('.copy');
let slide = document.querySelector('.slide');
let uppercase = document.querySelector('#uppercase');
let lowercase = document.querySelector('#lowercase');
let numbers = document.querySelector('#numbers');
let symbol = document.querySelector('#symbol');
let strcolor = document.querySelector('.type');
let generatebtn = document.querySelector('.btn');
let copied = document.querySelector(".copied");
let allcheckbox = document.querySelectorAll('input[type=checkbox]');
const sybstring = "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";
//initial stage
let password = "";
let passlen = 1;
let countchecked = 0;

//to put change password length
function maintainlength(){
    passlength.innerHTML = passlen;
    slide.value = passlen;
}
function randomNumber(min,max){
    return Math.floor(Math.random()*(max-min)) + min;
}
function randomnum(){
    return randomNumber(0,9);
}
function randonuppercase(){
    return String.fromCharCode(randomNumber(65,91));
}
function randonlowercase(){
    return String.fromCharCode(randomNumber(97,123));
}
function randomsymbol(){
    return sybstring[randomNumber(0,sybstring.length)] ;
}
function changecolor(color) {
    strcolor.style.backgroundColor = color;
}

async function copytoclipboard(){
 try{
    await navigator.clipboard.writeText(finalpass.value);
     copied.innerHTML = "Copied";
 } catch(x) {
       copied.innerHTML = "Failed"
 }
 copied.style.visibility = "visible";
 setInterval(()=>{
    copied.style.visibility = "hidden";

 },1000)
}
copy.addEventListener("click", ()=>{
    if(finalpass.value) copytoclipboard();
})

slide.addEventListener("input" , (x)=>{
    passlen = x.target.value;
    maintainlength();
})

function criteria() {
    const hasUpper = uppercase.checked;
    const hasLower = lowercase.checked;
    const hasNum = numbers.checked;
    const hasSym = symbol.checked;

    if (hasUpper && hasLower && (hasNum || hasSym) && passlen >= 8) {
        changecolor("#0f0"); // Strong
    } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passlen >= 6
    ) {
        changecolor("#ff0"); // Medium
    } else {
        changecolor("#f00"); // Weak
    }
}


function maintaincount(){
   console.log("hua")
    countchecked = 0;
    allcheckbox.forEach((x) => {
        if(x.checked) countchecked++;
    })

    if(countchecked > passlen){
        passlen= countchecked;
        maintainlength();
    }
 }

allcheckbox.forEach((x) => {
        x.addEventListener("change" , maintaincount);
    });


generatebtn.addEventListener("click" , ()=> {
    if(countchecked === 0) {
alert("select atleast one option");
return;
    }
       

    console.log("generate");

    password = "";
    
    if(countchecked > passlen){
        passlen = countchecked;
        maintainlength();
    }
    
    let arrayoffunction = [];
    if(lowercase.checked) {
        arrayoffunction.push(randonlowercase);
    }
    if(uppercase.checked) {
        arrayoffunction.push(randonuppercase);
    }
    if(numbers.checked) {
        arrayoffunction.push(randomnum);
    }
    if(symbol.checked) {
        arrayoffunction.push(randomsymbol);
    }

    for(let i = 0;i<arrayoffunction.length ;i++){
     password += arrayoffunction[i]();
    }

    for(let i = arrayoffunction.length ; i<passlen;i++){
        let r = randomNumber(0,arrayoffunction.length);
        password+=arrayoffunction[r]();
    }
    finalpass.value = password;
    criteria();
});




