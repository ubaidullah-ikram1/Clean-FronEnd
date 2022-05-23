

import { mapcontainer } from '../../store/mapcontainer'
import { useState, useEffect } from 'react'
import { MapContainer, WMSTileLayer, TileLayer, Marker, Popup } from 'react-leaflet'
import SearchBar from './search'
import Hblfarmwms from './hblfarmwms'
import Soildata from './soildata'
import NDVIdateslider from './NDVIdateslider'

export default (props) => {
  const [map, setMap] = useState(null)
  const [mapHeight, setMapHeight] = useState(props.mapHeight)
  map ? mapcontainer.dispatch({ type: 'map', map }) : <></>
  console.log('map', map, props.mapHeight)

  useEffect(() => {
    setMapHeight(props.mapHeight)

  }, [props.mapHeight]);
  return (
    <div>
      <MapContainer id="mapContainer" style={{ width: '100%', height: '85vh' }} center={[33, 73]} zoom={13}
        whenCreated={map => {
          mapcontainer.dispatch({ type: 'map', map })
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