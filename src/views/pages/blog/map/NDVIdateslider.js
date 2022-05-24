import React from "react";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import axios from "axios";
import { useLayoutEffect,useEffect,useState } from "react";
import { farmidcommunicator } from "../../store/farmidcommunicator";
import { datestore } from "../../store/datesstore";
import './dateslider.css'
import parseGeoraster  from  'georaster';
import GeoRasterLayer  from 'georaster-layer-for-leaflet'
import chroma from 'chroma-js'
import { mapcontainer } from "../../store/mapcontainer";
import { ndvis } from "../../store/ndviraster";
import { indexsel } from "../../store/indexselect";
import { ndvilayer } from "../../store/ndvilayer";
export default () => {
  
  const[farmid,setFarmid]=useState(farmidcommunicator.getState())
    const [dates, setDates] = useState(datestore.getState())
    const [updatedata,setUpdatedata]=useState(null)
    const [map, setMap] = useState(mapcontainer.getState())
    const [ndvi,setNdvi] =useState(ndvis.getState())
    const [indexselect,setIndexselect] =useState(indexsel.getState())
    const [layer,setLayer] = useState()
     useLayoutEffect(()=>{
      indexsel.subscribe(() => {
        setIndexselect(indexsel.getState())
        console.log('action',indexselect)
      })
     
     })
    const rastergenaration= (farm, update)=>{
      var url_to_geotiff_file = "https://gistest.bkk.ag/NDVI_image/"+farm+"/"+update;
      fetch(url_to_geotiff_file)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {  
          parseGeoraster(arrayBuffer).then(georaster => {
            const min = 0;
            const max = 1;
            const range = 1;
            var scale = chroma.scale("RdYlGn");
      var  layers = new GeoRasterLayer({
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
      // setLayer(layers)

      ndvilayer.dispatch({type:'layerss',layerss: layers})
      map.addLayer(layers)
        });
      })
    }  
    useLayoutEffect(() => {
      ndvis.subscribe(() => {
        setNdvi(ndvis.getState())
        let data = mapcontainer.getState();
        setMap(data) 
      })
    })
    useEffect(() => {
        datestore.subscribe(() => {
            setDates(datestore.getState())
          })
        farmidcommunicator.subscribe(() => {
          setFarmid(farmidcommunicator.getState())
        })
        console.log(map)
        if(ndvi != null){
          let data = mapcontainer.getState();
        setMap(data)
        rastergenaration(farmid, ndvi)
      
      layer?  map.on('click',e=>{
          map.removeLayer(layer)
        }) : <></>
        }

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