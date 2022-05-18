import * as L from 'leaflet'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { mapcontainer } from '../../store/mapcontainer';
import axios from 'axios';
import { GeoJSON } from 'react-leaflet';
import logo from '../../../../assets/images/WEATHER/logo.png'
import { func } from 'prop-types';
export default () => {
  const [map, setMap] = useState(mapcontainer.getState())
const [data,setData]=useState()
 var station
 
  useLayoutEffect(() => {
   
    mapcontainer.subscribe(() => {
        setMap(mapcontainer.getState())
      })

   
  }, [])
   
  var unactive = L.icon({
    iconUrl: logo,
    iconSize:     [20, 20], // size of the icon
    // point from which the popup should open relative to the iconAnchor
});
 function pointToLayer(features, latlng) {
    return L.marker([latlng.lng,latlng.lat],{icon: unactive})
} 
 function   onEachFeature(features, layer) {
  if(features.properties.weatherStats[0]!=undefined){
    layer.bindPopup(
      'Status :'+ features.properties.status+"<br>"+
      'Station Name :'+ features.properties.stationName+"<br>"+
      'Station ID :'+ features.properties.stationID+"<br>"+
      "<hr> "+
      'Weather Condition :'+ features.properties.weatherStats[0]['weatherCondition']+ "<br>"+
      "<hr> "+
      'Temp :'+ features.properties.weatherStats[0]['temp']+ "°"+"<br>"+
      'Wind Speed :'+ features.properties.weatherStats[0]['windSpeed'].toFixed(1)+ "km/h"+"<br>"+
      'Pressure :'+ features.properties.weatherStats[0]['pressure'].toFixed(1)+"<br>"+
      'Rainfall :'+ features.properties.weatherStats[0]['rainfall']+ "mm"+"<br>"+
      'Humidity :'+ features.properties.weatherStats[0]['hum']+ "%"+"<br>"+
      'Precipitation :'+ features.properties.weatherStats[0]['prec']+ "%"+"<br>"
    )

  
  }
      }
  useEffect(() => {
    axios.get('https://weatherwalay-web-server.herokuapp.com/jis/getStats').then(response=>{
        console.log('wetherstation',response)
        setData(response.data)
        // station=   L.geoJson(response.data,{
            
        //     pointToLayer : function(features, latlng) {
        //         console.log('latlng',latlng)
        //                     return L.marker([latlng.lng,latlng.lat])
        //                 }}   )     
           
                
                    
  })
},[])
  
 
  return (
    <> 
 {  data ? <GeoJSON data={data} pointToLayer={pointToLayer}  onEachFeature= {onEachFeature} /> : <></>}
      
    </>
  )
  }