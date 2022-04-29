
import './basemap.css'
import { mapcontainer } from '../../store/mapcontainer'
import { useState } from 'react'
import { MapContainer, WMSTileLayer,TileLayer, Marker, Popup } from 'react-leaflet'
import SearchBar from './search'
import Hblfarmwms from './hblfarmwms'

export default ()=>{
  const [map, setMap] = useState(null)
map ? mapcontainer.dispatch({type:'map',map :map}) : <></>
  console.log('map',map)
return(
    <MapContainer center={[33,73]} zoom={13}
    whenCreated ={map => {
      mapcontainer.dispatch({type:'map',map :map})
      console.log('map',map)
    }}
    // ref={setMap}
    >
      {/* <SearchBar/> */}
      <Hblfarmwms/>
      <TileLayer
        url='https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
      />
    </MapContainer>
    
)
}