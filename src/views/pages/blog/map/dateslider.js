// import HorizontalSlider from 'react-horizontal-slider'
// import React, { useState, useEffect, useLayoutEffect } from 'react'
// import { mapcontainer } from '../../stores/mapcontainer';
// import { farmidcommunicator } from '../../stores/farmidcommunicator';
// import parseGeoraster  from  'georaster';
// import GeoRasterLayer  from 'georaster-layer-for-leaflet'

// // import { clouddate } from '../../stores/datesstore';
// import chroma from 'chroma-js';
// import axios from 'axios';
// // import { cloudcoverstore } from '../../stores/cloudcoverstore';
// // import Cloudcoverslider from './mapcomponents/cloudclover_slider';
// import { relativeLength } from 'highcharts';
// export default () => {
//   const [dates, setDates] = useState(datestore.getState())
//   const [map, setMap] = useState(null)
//   const [cloudslidedisplay,setCloudslidedisplay]=useState(false)
//   const [updatedata,setUpdatedata]=useState(null)
//   const[farmid,setFarmid]=useState(farmidcommunicator.getState())
//   // const [layers,setLayers]=useState(null)
//   var layer=null
//      useEffect(() => {
//     datestore.subscribe(() => {
//       setDates(datestore.getState())
//     })
//     farmidcommunicator.subscribe(() => {
//       setFarmid(farmidcommunicator.getState())
//     })
//     let data = mapcontainer.getState();
//     console.log("Dataz", data)
//     setMap(data) 
//     rastergenaration(farmid, updatedata)
//   },[])
//   useEffect(() => {
//     console.log("i am running")
//     datestore.subscribe(() => {
//       setDates(datestore.getState())
//     })
//     farmidcommunicator.subscribe(() => {
//       setFarmid(farmidcommunicator.getState())
//     })
    
//       console.log(farmid)
//       rastergenaration(farmid, updatedata)
//     let data = mapcontainer.getState();
//     setMap(data) 
//   },[updatedata])
//   const rastergenaration= (farm, update)=>{
//     var url_to_geotiff_file = "https://gistest.bkk.ag/NDVI_image/"+farm+"/"+update;
//     fetch(url_to_geotiff_file)
//       .then(response => response.arrayBuffer())
//       .then(arrayBuffer => {  
//         parseGeoraster(arrayBuffer).then(georaster => {
//           const min = 0;
//           const max = 1;
//           const range = 1;
//           var scale = chroma.scale("RdYlGn");
//           layer = new GeoRasterLayer({
//               georaster: georaster, 
//               opacity: 1,
//               pixelValuesToColorFn: function(pixelValues) {
//                 var pixelValue = pixelValues[0];
//                 if (isNaN(pixelValue)) return null;
//                 var scaledPixelValue = (pixelValue - min) / range;
//                 var color = scale(scaledPixelValue).hex();
//                 console.log('color',color)
//                 return color;
//               },
//               resolution: 256
//           });
        
//           map.addLayer(layer)
         
//       });
//     })
//   }
//   const fetchdata =e =>{
    
//     // clouddate.dispatch({type:'clouddates',clouddates :e.target.textContent})
//     setCloudslidedisplay(true)
//     let data = mapcontainer.getState();
//     setMap(data) 
//      setUpdatedata(e.target.textContent)
     
//      rastergenaration(farmid, e.target.textContent)
//      dates.map(d=>{  
//       }) 
//      axios.get('https://gistest.bkk.ag/NDVI_polygon/'+farmid).then((response) => {
//       response.data.map(d=>{
//         var date=e.target.textContent.split('-')
//         var datecom=date[0]+date[1]+date[2]
//       if(d.date_int==datecom){
//         // cloudcoverstore.dispatch({type:'cloudcover',cloudcover :d.cloud_cover})
//         // console.log('clou',d.cloud_cover)
//         if(map.hasLayer(layer)){
//           map.removeLayer(layer)
//           alert('alyer hia')
//         }
//       }
//       })
//          }  )
//          }   
//   return (
//     <>
//       <div  style={
//       {width : 200, position: 'relative', marginLeft:100}
//     } >
//  {/* { cloudslidedisplay?<Cloudcoverslider/> : <></>} */}
//     </div>
//       <div className='scrolling-wrapper'>
//  {/* <img src='./assets/ndvi_legend4.png' /> */}
//     {  
//   dates.map(d => {
//      return <div   onClick={(e) => fetchdata(e)} className='cards' >{d} </div> 
//   })
// } 
// </div>
//     </>
   
//   )
// }