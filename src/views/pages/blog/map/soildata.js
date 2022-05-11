
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Msidn } from '../../store/msidn';
import { WMSTileLayer } from 'react-leaflet';
import { mapcontainer } from '../../store/mapcontainer';
import { LayersControl,Marker,Popup,Circle,FeatureGroup } from 'react-leaflet';
// import './chasma.css'
export default () => {
  const center = [51.505, -0.09]
  return (
    


<LayersControl position="topright">
      <LayersControl.Overlay name="Soil Data">
    
      {
<WMSTileLayer
layers = {'server:mz_soil_data'}
  format= { 'image/png'}
  transparent = {true}
  opacity= { 0.7}
  version = {'1.3.0'}
  epsg= { '4326'}
  //styles = { 'gis_server:ndvi'}
  attribution = {'<a href="https://bkk.ag/">BKK</a>'}
  minZoom = {4}
  maxZoom = {20}
 url={`https://gis.bkk.ag/geoserver/server/wms?`}
 
 header ={"Access-Control-Allow-Origin ='*'"}


/> 
         }
  
        
    
  
      </LayersControl.Overlay>
     
     
    </LayersControl>
      
    
  )
}