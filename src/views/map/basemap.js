
import { mapcontainer } from '../store/mapcontainer'
import { useState, useEffect ,useLayoutEffect,useRef} from 'react'
import { MapContainer, WMSTileLayer, TileLayer, Marker, Popup,Rectangle,LayersControl,Circle,LayerGroup,center } from 'react-leaflet'
import { x1data,x2data,y1data,y2data } from '../store/inputdata'
import axios from 'axios'
import parseGeoraster  from  'georaster';
import GeoRasterLayer  from 'georaster-layer-for-leaflet'
import chroma from 'chroma-js'

export default (props) => {
  const[x1, setX1] = useState();
  const[y1, setY1] = useState();
  const[x2, setX2] = useState();
  const[y2, setY2] = useState();
  const[setmap,setSetmap]=useState()
const maps=useRef()
  useLayoutEffect(() => {
    x1data.subscribe(() => {
      setX1(x1data.getState())
    })
    x2data.subscribe(() => {
      setX2(x2data.getState())
    })
    y1data.subscribe(() => {
      setY1(y1data.getState())
    })
    y2data.subscribe(() => {
      setY2(y2data.getState())
    })
    var data = JSON.stringify({
      name: "ubiad"
    });
    
    
    const headers = {
      'Content-Type':"application/json"
    }
console.log('data',data)
    x1?axios.post("http://localhost:4000/?x1="+x1+"&"+"x2="+x2+"&"+"y1="+y1+"&"+"y2="+y2).then((res)=>console.log(res)).catch(err => console.log(err)):<></>
    
  
  })
  var rectangle
 x1 ? rectangle = [[x1, y1], [x2, y2]] : console.log('no data')
 {x1?setmap.flyTo([x1,y1],12):<></>}


   
    

 
 
//  x1?data = [x1,x2,y1,y2] : <></>
 

useEffect(()=> {
  
}, [])

  return (
    <div >
      <MapContainer ref={maps} class="position-relative" id="mapContainer" style={{ width: '100%', height: '80vh' }} center={[51.49, -0.08]} zoom={13}
        whenCreated={map => {setSetmap(map)
          // var url_to_geotiff_file ='http://localhost:4000/tif';
          // fetch(url_to_geotiff_file)
          //   .then(response => response.arrayBuffer())
          //   .then(arrayBuffer => {  
          //     parseGeoraster(arrayBuffer).then(georaster => {
          //       const min = 0;
          //       const max = 1;
          //       const range = 1;
          //       var scale = chroma.scale("RdYlGn");
          // var  layers = new GeoRasterLayer({
          //     georaster: georaster, 
          //     opacity: 1,
          //     resolution: 256
          // });
          // console.log(layers)
          // // setLayer(layers)
          // map.addLayer(layers)
          //   });
          // })
        
        }}
        
      >
       
         <LayersControl position="topright">
      {/* <LayersControl.Overlay  checked name="Satellite Basemap">
      <TileLayer
          url='https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
        />
  
      </LayersControl.Overlay> */}
      <LayersControl.Overlay checked name="Open Street Map">
      <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
  
      </LayersControl.Overlay>
   
    </LayersControl>
    
    { x1?    <Rectangle bounds={rectangle} /> : <></> }
      </MapContainer >
    </div>
  )
}