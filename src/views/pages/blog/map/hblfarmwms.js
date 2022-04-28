
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Msidn } from '../../store/msidn';
import { WMSTileLayer } from 'react-leaflet';
import { mapcontainer } from '../../store/mapcontainer';
// import './chasma.css'
export default () => {
  const [growernamer, setGrowernamer] = useState(Msidn.getState())
  const [show,setShow]=useState(false)
  const [map, setMap] = useState(mapcontainer.getState())
  const [bbox ,setBbox]=useState()
  var bboxs=[]
  // map.on('click', (e) => {
    console.log(growernamer)
  useLayoutEffect(() => {
    Msidn.subscribe(() => {
      setGrowernamer(Msidn.getState())
    })
    setShow(true)
    // farmidcommunicator.subscribe(() => {
    //   setMap(mapcontainer.getState())
    // })
  }, [])
    useEffect(()=>{
      growernamer>0 ?  setBbox(growernamer) :<></>
      
  },[growernamer])
  return (
    <> 
 {
growernamer== bbox ?
<WMSTileLayer
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
  CQL_FILTER= {"msisdn =  "+ growernamer   +" "}
 url={`https://gis.bkk.ag/geoserver/server/wms?`}
 
 header ={"Access-Control-Allow-Origin ='*'"}


/> :<>{console.log('wmsnot')}</>
         }
        
      {/* "msisdn =  '"+ growernamer   +"' "  
      <Source id="source_id" tileJsonSource={RASTER_SOURCE_OPTIONS} />
      <Layer
        type="raster"
        id="source_id"
        sourceId="source_id"
      /> */}

       
      
    </>
  )
}