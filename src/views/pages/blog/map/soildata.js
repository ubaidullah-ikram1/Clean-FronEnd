
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Msidn } from '../../store/msidn';
import { WMSTileLayer } from 'react-leaflet';
import { mapcontainer } from '../../store/mapcontainer';
import { LayersControl, Marker, Popup, Circle, FeatureGroup } from 'react-leaflet';
import { func } from 'prop-types';
import axios from 'axios';
import Weatherstation from './weatherstation';
// import './chasma.css'
export default () => {
  const center = [51.505, -0.09]
  const [map, setMap] = useState(mapcontainer.getState())
  const wms = useRef();


  useLayoutEffect(() => {
    mapcontainer.subscribe(() => {
      setMap(mapcontainer.getState())
    })


  })

  if (map) {
    map.on('click', function (e) {
      var popup = new L.Popup({ maxWidth: 1000 });

      var latlngStr = '(' + e.latlng.lat.toFixed(3) + ', ' + e.latlng.lng.toFixed(3) + ')';
      var sw = map.options.crs.project(map.getBounds().getSouthWest());
      var ne = map.options.crs.project(map.getBounds().getNorthEast());
      var BBOX = sw.x + "," + sw.y + "," + ne.x + "," + ne.y;
      var WIDTH = map.getSize().x;
      var HEIGHT = map.getSize().y;
      var X = Math.trunc(map.layerPointToContainerPoint(e.layerPoint).x);
      var Y = Math.trunc(map.layerPointToContainerPoint(e.layerPoint).y);
      var url = "https://gis.bkk.ag/geoserver/server/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=server:mz_soil_data&QUERY_LAYERS=server:mz_soil_data&BBOX=" + BBOX + "&FEATURE_COUNT=1&HEIGHT=" + HEIGHT + "&WIDTH=" + WIDTH + "&INFO_FORMAT=application%2Fjson&TILED=false&CRS=EPSG%3A3857&I=" + X + "&J=" + Y;

      axios.get(url).then(
        d => {

          popup.setLatLng(e.latlng);
          popup.setContent("<b>PH </b> : " + d.data['features'][0]?.['properties']?.['ph_'] + '<br>' +
            " <b>texture </b> : " + d.data['features'][0]?.['properties']?.['texture'] + '<br>'
            +
            "<b>copper </b>: " + d.data['features'][0]?.['properties']?.['copper'] + '<br>'
            +
            "<b>iron </b>: " + d.data['features']?.[0]?.['properties']?.['iron'] + '<br>'
            +
            "<b>manganese </b> : " + d.data['features'][0]?.['properties']?.['manganese'] + '<br>'
          );
          d.data['features'][0]?.['properties'] ?   map.openPopup(popup) : <></>
        }
      )
    })
  }

  return (



    <LayersControl position="topright">
      <LayersControl.Overlay name="Soil Data">

        {
          <WMSTileLayer
            layers={'server:mz_soil_data'}
            format={'image/png'}
            transparent={true}
            opacity={0.7}
            version={'1.3.0'}
            epsg={'4326'}
            ref={wms}
            //styles = { 'gis_server:ndvi'}
            attribution={'<a href="https://bkk.ag/">BKK</a>'}
            minZoom={4}
            maxZoom={20}
            url={`https://gis.bkk.ag/geoserver/server/wms?`}

            header={"Access-Control-Allow-Origin ='*'"}


          >

          </WMSTileLayer>
        }




      </LayersControl.Overlay>
      <LayersControl.Overlay name="   Weather Data">
      {
< Weatherstation />
         }
      </LayersControl.Overlay>
     


    </LayersControl>


  )
}