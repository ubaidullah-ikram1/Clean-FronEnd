import React from "react";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import axios from "axios";
import { useEffect,useState } from "react";
import { farmidcommunicator } from "../../store/farmidcommunicator";
import { datestore } from "../../store/datesstore";
import './dateslider.css'
import parseGeoraster  from  'georaster';
import GeoRasterLayer  from 'georaster-layer-for-leaflet'
import chroma from 'chroma-js'
import { mapcontainer } from "../../store/mapcontainer";
import { ndvis } from "../../store/ndviraster";
export default () => {
    const[farmid,setFarmid]=useState(farmidcommunicator.getState())
    const [ndvi,setNdvi] =useState(ndvis.getState())
    const [dates, setDates] = useState(datestore.getState())
    const [updatedata,setUpdatedata]=useState(null)
    const [map, setMap] = useState(mapcontainer.getState())
    var layer =null
    const rastergenaration= (farm, update)=>{
        console.log('farm',farm)
      var url_to_geotiff_file = "https://gistest.bkk.ag/NDMI_image/"+farm+"/"+update;
      fetch(url_to_geotiff_file)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {  
          parseGeoraster(arrayBuffer).then(georaster => {
            const min = -1;
            const max = 1;
            const range = 2;
            var scale = chroma.scale(['#b1988d', '#cab6ba', '#a99ed6', '#5363d4', '#1030e0']);
            layer = new GeoRasterLayer({
                georaster: georaster, 
                opacity: 1,
                pixelValuesToColorFn: function(pixelValues) {
                  var pixelValue = pixelValues[0];
                  if (isNaN(pixelValue)) return null;
                  var scaledPixelValue = (pixelValue - min) / range;
                  var color = scale(scaledPixelValue).hex();
                  console.log('color',color)
                  return color;
                },
                resolution: 256
            });
           
           
        });
      })
    }
    if(ndvi != null) {
      
      // rastergenaration(farmid, ndvi)
  
    }
    layer != null ?    map.addLayer(layer) : <></>
map.on('click',()=>{
  //  map.removeLayer(layer) 
   alert('asd')
} )
    useEffect(() => {
        datestore.subscribe(() => {
            setDates(datestore.getState())
          })
        farmidcommunicator.subscribe(() => {
          setFarmid(farmidcommunicator.getState())
        })
        if(ndvi != null){
          let data = mapcontainer.getState();
        setMap(data)
        rastergenaration(farmid, ndvi)
        }
        rastergenaration(farmid, updatedata)
        let data = mapcontainer.getState();
        setMap(data)
      },[ndvi])
    
   
    
    return (
        <div className="swiper  " >
        {/* <Swiper
        //   effect={"coverflow"}
        //   navigation={true}
        //  modules={[Navigation]}
          slidesPerView={5}
        //   coverflowEffect={{
        //     rotate: 50,
        //     stretch: 0,
        //     depth: 100,
        //     modifier: 1,
        //     slideShadows: false,
        //   }}
        //   pagination={true}
          className="mySwiper"
        >
{
 dates.map(d => {
    return    <SwiperSlide className="p-1 border-end border-dark"   onClick={(e) => fetchdata(e)}>
   {d}
  </SwiperSlide>
 })
} 
      
        </Swiper> */}
      </div>
    );
  };