import React, { useEffect, useState } from "react";

export default function Weather() {    
    
    const [main,setMain] = useState('');
    const [description,setDescription] = useState('');   
    const [icon,setIcon] = useState('');
   

    useEffect(()=> {

        navigator.geolocation.getCurrentPosition(function(position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=e98263cec657ce84e8b1f0628b5d1197`)
            .then((res => res.json()))
            .then((data) => {
                console.log(data)         
                setMain(data.main.temp);
                setDescription(data.weather[0].description);           
                setIcon(data.weather[0].icon);
            } ) 



            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
          });
        
        
    }, []) 
    return (
        <>
            <div  style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'                
           }}>
              
                        <h4> {main} °C</h4>                
                        
                        <span> {description}</span>
                        <img alt="weather" src={"http://openweathermap.org/img/wn/" + icon + "@2x.png"}/>
                  
            </div>
        </>
    )
}
