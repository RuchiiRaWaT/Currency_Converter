const dropList=document.querySelectorAll(".drop-list select");
fromCurrency =document.querySelector(".from select");
toCurrency =document.querySelector(".to select");
getButton = document.querySelector("form button");
for (let i=0; i< dropList.length;i++){
    for(currency_code in country_code){
        let selected;
        if(i==0){
            selected= currency_code =="USD" ? "selected" : "";
        }else if(i==1){
            selected= currency_code =="NPR" ? "selected" : "";

        }
     let optionTag = `<option value="${currency_code}"${selected}>${currency_code}</option>`;
     dropList[i].insertAdjacentHTML("beforeend",optionTag);
    }
    dropList[i].addEventListener("change" ,e=>{
         loadFlag(e.target);
    });
}

function loadFlag(element){
   for(code in country_code){
      if (code== element.value){
        let imgTag= element.parentElement.querySelector("img");
       imgTag.src= `https://flagsapi.com/${country_code [code]}/flat/64.png`
      }
   }
}
window.addEventListener("load",() =>{
     
    getExchangeRate();
});
  
getButton.addEventListener("click",e =>{

    e.preventDefault();

    getExchangeRate();
});
const exchangeIcon =document.querySelector(" .drop-list .icon")
exchangeIcon.addEventListener("click" ,()=>{
  let tempCode= fromCurrency.value;
  fromCurrency.value =toCurrency.value;
  toCurrency.value=tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate() ;
});
function getExchangeRate(){
    const amount=document.querySelector(".amount input");
    const exchangeRateTxt=document.querySelector(".exchange-rate");
    let amountval= amount.value;
    if(amountval== "" || amountval =="0"){
        amount.value="1";
        amountval= 1;
    }
    exchangeRateTxt.innerText =" Getting exchange-rate..." ;
    let url= `https://v6.exchangerate-api.com/v6/f5b2c4d0269c97c53082a4f7/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result=>{
        let  exchangeRate= result.conversion_rates[toCurrency.value];
      let totalexchangeRate= (amountval * exchangeRate).toFixed(2);
      
      exchangeRateTxt.innerText= `${amountval} ${fromCurrency.value} = ${totalexchangeRate} ${toCurrency.value} `;
    }).catch(()=>{
        exchangeRateTxt.innerText="Somthing went wrong .Try again";
    });
}

