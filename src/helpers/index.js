const calculateTotalPay = (quantity,months) =>{
    let total;
    if(quantity < 5000){
        total = quantity * 1.5; //50% de intereses
    }else if(quantity>=5000 && quantity<10000){
        total = quantity * 1.4; //40% de intereses
    }else if(quantity>=1000 && quantity< 15000){
        total = quantity * 1.3; //30% de intereses
    }else{
        total = quantity * 1.2; //30% de intereses
    }

    //Plazo

    if(months === 6){
        total = total * 1.1;
    }else if(months === 12){
        total = total * 1.2;
    }else{
        total = total * 1.3;
    }

    return total;
}

export{
    calculateTotalPay
}