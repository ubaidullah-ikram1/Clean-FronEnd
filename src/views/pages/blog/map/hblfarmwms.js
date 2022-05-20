
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Msidn } from '../../store/msidn';
import { WMSTileLayer } from 'react-leaflet';
import { mapcontainer } from '../../store/mapcontainer';
import { farmidcommunicator } from '../../store/farmidcommunicator';
export default () => {
  const [growernamer, setGrowernamer] = useState(Msidn.getState())
  const [show,setShow]=useState(false)
  const [map, setMap] = useState(mapcontainer.getState())
  const [bbox ,setBbox]=useState()
  const [farmid,SetFarmid] = useState( farmidcommunicator.getState())
  const [farmidwms,SetFarmidwms] = useState()
  const [wmsstate , setWmsstate] = useState(null)
  var bboxs=[]
  // map.on('click', (e) => {
    console.log(growernamer)
  useLayoutEffect(() => {
    Msidn.subscribe(() => {
      setGrowernamer(Msidn.getState())
    })
    farmidcommunicator.subscribe(() => {
      SetFarmid(farmidcommunicator.getState())

    })

    setShow(true)
  }, [])
    useEffect(()=>{
      growernamer>0 ?  setBbox(growernamer) :<></>
      console.log('farmid',farmid)
      
      
        SetFarmidwms(farmid)

     
         
console.log('wmsstate',farmid)

      },[growernamer ,farmid])

    

      return (
     <> 
 {
   
growernamer== bbox ?

farmid != null ?   <WMSTileLayer
layers = {'server:hbl_farms'}
  format= { 'image/png'}
  transparent = {true}
  opacity= { 0.7}
  version = {'1.3.0'}
  epsg= { '4326'}
  //styles = { 'gis_server:ndvi'}
  attribution = {'<a href="https://bkk.ag/">BKK</a>'}
  minZoom = {4}
  maxZoom = {20}
  CQL_FILTER= {"farm_crop_id ='"+   farmid     +"'"  }
 url={`https://gis.bkk.ag/geoserver/server/wms?`}
 
/>      : <></>


:<>{console.log('wmsnot')}</>
         }
 {
   
   growernamer== bbox ?
   
   farmid == null ?   <WMSTileLayer
   layers = {'server:hbl_farms'}
     format= { 'image/png'}
     transparent = {true}
     opacity= { 0.7}
     version = {'1.3.0'}
     epsg= { '4326'}
     //styles = { 'gis_server:ndvi'}
     attribution = {'<a href="https://bkk.ag/">BKK</a>'}
     minZoom = {4}
     maxZoom = {20}
     CQL_FILTER= {"msisdn = '" + growernamer  +    " '"}
    url={`https://gis.bkk.ag/geoserver/server/wms?`}
    
   />      : <></>
   
   
   :<>{console.log('wmsnot')}</>
            }
          
      
    </>
  )
}