import React, { Fragment, useEffect, useState } from "react";
import './Weather.css'
import {calculateColor} from '../Util.js'
import { SliderPicker } from 'react-color';

export default function Weather() {    

    const consent = {
        WAITING:1,
        GIVEN:2,
        DENIED:3
    }
    
    const [main,setMain] = useState('');
    const [description,setDescription] = useState('');   
    const [icon,setIcon] = useState('');
    const [consentStatus,setConsentStatus] = useState(consent.WAITING);
    const [bgColor, setBgColor]= useState('');

    const thresholds = [ {value : -10, color : "00ffff"},
                         {value : 10, color :"fff700"},
                         {value : 30, color : "ff8c00"}];

    const handleChangeComplete = (color) => {
        setBgColor(color.hex); 
        setMain(color.rgb.r);     
    };

  
    const renderAccordingToConsent = () => {
        if(consentStatus === consent.GIVEN) {
            return (
                <React.Fragment>
                    <h4 className="weatherHeader"> {main} °C</h4>               
                    <h6 className="weatherHeader"> {description}</h6>
                    <img alt="weather" src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/>                  
                </React.Fragment>
            );
        }
        else if(consentStatus === consent.DENIED){
            return <h4>Location access denied</h4>;
        }
        else {
            return <h4>Location access waiting!</h4>;
        }
    }    

    useEffect(()=> {

        navigator.geolocation.getCurrentPosition(function(position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
          
            // this can be moved in env variable
            fetch(`https://api.openweatermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=e98263cec657ce84e8b1f0628b5d1197`)
            .then((res => res.json()))
            .then((data) => {
                setConsentStatus(consent.GIVEN);
                console.log(data);
                setMain(data.main.temp);
                setDescription(data.weather[0].description);           
                setIcon(data.weather[0].icon);                
                setBgColor(calculateColor(Math.round(data.main.temp), thresholds)); 
                          
            } )
            
          },  function() {
                setConsentStatus(consent.DENIED);                         
          });
    }, []) 

    

    return (
        <Fragment>
            <div className="weatherWrapper" style={{backgroundColor:bgColor}}>
                {renderAccordingToConsent()}                  
            </div>
            <SliderPicker className="sliderWrapper" onChangeComplete={ handleChangeComplete }/>
        </Fragment>
        
    )
}
