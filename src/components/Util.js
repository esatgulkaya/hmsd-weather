 // There might be a library for this
 const getColorBetweenTwoColors = (colorOneHex, colorTwoHex, dividing, sequence) => {
     
    const colorOne =parseInt(colorOneHex, 16);
    const colorTwo =parseInt(colorTwoHex, 16);
    let bigNumber,smallNumber;    
    if(colorOne > colorTwo) {
        bigNumber = colorOne;
        smallNumber = colorTwo
    }
    else {
        bigNumber = colorTwo;
        smallNumber= colorOne
    }
    const stepDifference = Math.round((bigNumber - smallNumber) / dividing);
    const newNumber = smallNumber + stepDifference * sequence
    return newNumber.toString(16);
}

export const calculateColor = (temperature, tresholds) => {      
     const threshold1 = tresholds[0];
     const threshold2 = tresholds[1];
     const threshold3 = tresholds[2];
    let result;
    if(temperature <= threshold1.value){
        result = threshold1.color;
    }
    else if(temperature < threshold2.value){       
        result = getColorBetweenTwoColors(threshold1.color,threshold2.color,threshold2.value-threshold1.value,temperature-threshold1.value)
    }
    else if(temperature === threshold2.value){                    
        result = threshold2.color;
    }
    else if(temperature < threshold3.value){        
        result = getColorBetweenTwoColors(threshold3.color,threshold2.color,threshold3.value-threshold2.value,temperature-threshold2.value)
    }
    else {        
        result = threshold3.color;
    }
    return `#${result}`;
};