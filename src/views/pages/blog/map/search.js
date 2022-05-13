import { useEffect, useState,useLayoutEffect } from 'react'
import './search.css'
import { Msidn } from '../../store/msidn';
import { farmidcommunicator } from '../../store/farmidcommunicator';
import { lat } from '../../store/polygoncentroid';
import { lngt } from '../../store/polygoncentroid';
// import * as L from 'leaflet'
// import { lngt } from '../../../stores/polygoncentroid';
// import { lat } from '../../../stores/polygoncentroid';
import axios from 'axios';
import { mapcontainer } from '../../store/mapcontainer';
 function SearchBar(){
   const [farmids,setFarmids]=useState()
//    const [msidn,setMsidn] = useState()
//    const [centroid,setCentroid] = useState()

   // console[pcentroid,setPcentroid]
   const [map, setMap] = useState(mapcontainer.getState())
   useLayoutEffect(() => {
      mapcontainer.subscribe(() => {
        setMap(mapcontainer.getState())
    

      })
    }, [])
const farmssearch = (e) =>{
    console.log(map)

    var msidn=   document.getElementById('site-search').value
    if (e.keyCode == 13) {
      Msidn.dispatch({type:'msidn',msidn:msidn})
    //   setMsidn(msidn)
    //   console.log(msidn)
      //  msidn.dispatch({type:'msidn',msidn:d.data.features[0]['properties']['field_1']})
       axios.get("https://gis.bkk.ag/geoserver/server/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=server%3Ahbl_farms&CQL_FILTER=msisdn='"+msidn+"'&outputFormat=application%2Fjson").then(
r=>{
  console.log('wmslayer',r)
    var bbx=r.data.features[0]['geometry']['coordinates'][0][0][0]
    console.log('wmslayer',bbx)
    console.log(map)

    map.flyTo([bbx[1],bbx[0]],15)
   
   
  r.data.features.map(d=>{
    // console.log(d)
   
//    if(d.properties.msisdn == parseInt(msidn)){
       map.on('click',e=>{
        console.log(e.latlng)
         var sw = map.options.crs.project(map.getBounds().getSouthWest());
 var ne = map.options.crs.project(map.getBounds().getNorthEast());
 var BBOX = sw.x + "," + sw.y + "," + ne.x + "," + ne.y;
 var WIDTH = map.getSize().x;
 var HEIGHT = map.getSize().y;
 var X = Math.trunc(map.layerPointToContainerPoint(e.layerPoint).x);
 var Y = Math.trunc(map.layerPointToContainerPoint(e.layerPoint).y);
 var url = "https://gis.bkk.ag/geoserver/server/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=server:hbl_farms&CQL_FILTER=msisdn='"+msidn+"'&QUERY_LAYERS=server:hbl_farms&BBOX="+BBOX+"&FEATURE_COUNT=1&HEIGHT="+HEIGHT+"&WIDTH="+WIDTH+"&INFO_FORMAT=application%2Fjson&TILED=false&CRS=EPSG%3A3857&I="+X+"&J="+Y;
 axios.get(url).then(
     d=>
{
      console.log('idvalue', d.data.features[0]['properties']['farm_crop_id'])
      d.data.features[0]['properties']['farm_crop_id'] ?   farmidcommunicator.dispatch({type:'search',id:d.data.features[0]['properties']['farm_crop_id']}) :  <></>
      //  setFarmids(d.data.features[0]['properties']['farm_crop_id'])
     
     }
    )


     })

//    }
  })
})
       return true;
    } else {
       return false;
    }
   }   
return (
    <>
    <input  placeholder='Search Farms'  className="search mt-3" type="search" id="site-search" name="q"   onKeyUp={farmssearch}/>
    {/* <SearchBar
    value={this.state.value}
    onChange={(newValue) => this.setState({ value: newValue })}
    onRequestSearch={() => doSomethingWith(this.state.value)}
  /> */}
    </>
)
 }
 export default SearchBar;
 