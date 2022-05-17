

import { mapcontainer } from '../../store/mapcontainer'
import { useState } from 'react'
import { MapContainer, WMSTileLayer, TileLayer, Marker, Popup } from 'react-leaflet'
import SearchBar from './search'
import Hblfarmwms from './hblfarmwms'
import Soildata from './soildata'
import NDVIdateslider from './NDVIdateslider'

export default (props) => {
  const [map, setMap] = useState(null)
  map ? mapcontainer.dispatch({ type: 'map', map }) : <></>
  console.log('map', map, props.mapHeight)
  return (
    <div>
      <MapContainer style={{ width: '100%', height: '80vh' }} center={[33, 73]} zoom={13}
        whenCreated={map => {
          mapcontainer.dispatch({ type: 'map', map })
          console.log('map', map)
        }}
        ref={setMap}
      >
        <Soildata />
        <Hblfarmwms />
        <TileLayer
          url='https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
        />
      </MapContainer >
    </div>

  )
}