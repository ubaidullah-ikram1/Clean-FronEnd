import * as L from 'leaflet'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { mapcontainer } from '../../store/mapcontainer';
import axios from 'axios';
import { GeoJSON } from 'react-leaflet';
import logo from '../../../../assets/images/WEATHER/logo.png'
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
 {  data ? <GeoJSON data={data} pointToLayer={pointToLayer} /> : <></>}
      
    </>
  )
  }