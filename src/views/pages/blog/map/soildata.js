
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Msidn } from '../../store/msidn';
import { WMSTileLayer } from 'react-leaflet';
import { mapcontainer } from '../../store/mapcontainer';
import { LayersControl, Marker, Popup, Circle, FeatureGroup, GeoJSON } from 'react-leaflet';
import { func } from 'prop-types';
import axios from 'axios';
import logo from '../../../../assets/images/WEATHER/logo.png'
// import Weatherstation from './weatherstation';
import * as L from 'leaflet'
// import { onchange } from 'screenfull';
// import './chasma.css'
export default () => {
  const center = [51.505, -0.09]
  const [map, setMap] = useState(mapcontainer.getState())
  const [hideradius, setHideradius] = useState(false)
  var circle
  var circlecord = []
  const wms = useRef();
  useEffect(() => {
    mapcontainer.subscribe(() => {
      setMap(mapcontainer.getState())
    })
    if (map) {
      wms ?
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
              console.log(d.data['features'][0]?.['properties'])
              popup.setLatLng(e.latlng);
              popup.setContent("<b>texture </b> : " + d.data['features'][0]?.['properties']?.['texture'] + '<br>' +
                " <b>Date </b> : " + d.data['features'][0]?.['properties']?.['samplecoll'] + '<br>'
                +
                "<b>boron </b>: " + d.data['features'][0]?.['properties']?.['boron_'] + '<br>'
                +
                "<b>calium_carbonate </b>: " + d.data['features']?.[0]?.['properties']?.['calcium_carbonate_'] + '<br>'
                +
                "<b>copper </b> : " + d.data['features'][0]?.['properties']?.['copper_'] + '<br>'
                +
                "<b>iron </b>: " + d.data['features'][0]?.['properties']?.['iron_'] + '<br>'
                +
                "<b>manganese </b>: " + d.data['features']?.[0]?.['properties']?.['manganese_'] + '<br>'
                +
                "<b>organic_matter </b> : " + d.data['features'][0]?.['properties']?.['organic_matter_'] + '<br>'
                +
                "<b>ph </b>: " + d.data['features'][0]?.['properties']?.['ph_'] + '<br>'
                +
                "<b>phosphorus </b>: " + d.data['features']?.[0]?.['properties']?.['phosphorus_'] + '<br>'
                +
                "<b>potash </b> : " + d.data['features'][0]?.['properties']?.['potash_'] + '<br>'
                +
                "<b>saturation </b>: " + d.data['features'][0]?.['properties']?.['saturation_'] + '<br>'
                +
                "<b>zinc </b>: " + d.data['features']?.[0]?.['properties']?.['zinc_'] + '<br>'
              );
              d.data['features'][0]?.['properties'] ? map.openPopup(popup) : <></>
            }
          )
        }) : <></>
    }
  })

  const inputElement = useRef();

  const [data, setData] = useState()
  var station

  useLayoutEffect(() => {

    mapcontainer.subscribe(() => {
      setMap(mapcontainer.getState())
    })


  }, [])
  var unactive = L.icon({
    iconUrl: logo,
    iconSize: [20, 20], // size of the icon
    // point from which the popup should open relative to the iconAnchor
  });
  function pointToLayer(features, latlng) {
    return L.marker([latlng.lng, latlng.lat], { icon: unactive })
  }
  var circles = []
  function onEachFeature(features, layer) {
    if (features.properties.weatherStats[0] != undefined) {

      layer.bindPopup(
        'Status :' + features.properties.status + "<br>" +
        'Station Name :' + features.properties.stationName + "<br>" +
        'Station ID :' + features.properties.stationID + "<br>" +
        "<hr> " +
        'Weather Condition :' + features.properties.weatherStats[0]['weatherCondition'] + "<br>" +
        "<hr> " +
        'Temp :' + features.properties.weatherStats[0]['temp'] + "°" + "<br>" +
        'Wind Speed :' + features.properties.weatherStats[0]['windSpeed'].toFixed(1) + "km/h" + "<br>" +
        'Pressure :' + features.properties.weatherStats[0]['pressure'].toFixed(1) + "<br>" +
        'Rainfall :' + features.properties.weatherStats[0]['rainfall'] + "mm" + "<br>" +
        'Humidity :' + features.properties.weatherStats[0]['hum'] + "%" + "<br>" +
        'Precipitation :' + features.properties.weatherStats[0]['prec'] + "%" + "<br>"
      )
    }
    var circleOptions = {
      color: 'blue',
      fillColor: '#f03',
      fillOpacity: 0
    }
    circles.push([[features.geometry.coordinates[0], features.geometry.coordinates[1]], features.properties.radius * 1000])
    var circle = L.circle([features.geometry.coordinates[0], features.geometry.coordinates[1]], features.properties.radius * 1000, circleOptions)
    map.addLayer(circle)
  }
  console.log((circles.length))
  useEffect(() => {
    axios.get('https://weatherwalay-web-server.herokuapp.com/jis/getStats').then(response => {
      setData(response.data)
    })
    // console.log(circlecord)
    // for(var i=0; i<=circlecord.length; i++){
    //   map.addLayer(circlecord[i]) 
    // }
  }, [])

  return (
    <>
      {
        <WMSTileLayer
          layers={'server:pakistan'}
          format={'image/png'}
          transparent={true}
          opacity={0.7}
          version={'1.3.0'}
          epsg={'4326'}
          //styles = { 'gis_server:ndvi'}
          attribution={'<a href="https://bkk.ag/">BKK</a>'}
          minZoom={4}
          maxZoom={20}
          url={`https://gis.bkk.ag/geoserver/server/wms?`}>
        </WMSTileLayer>
      }
      <LayersControl position="topright"   >
        <LayersControl.Overlay name="Soil Data" >
          {
            <WMSTileLayer
              eventHandlers={{
                add: (e) => {
                  console.log("Added Layer:", e.target);
                },
                remove: (e) => {
                  console.log("Removed layer:", e.target);
                }
              }}
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

              header={"Access-Control-Allow-Origin ='*'"}>
            </WMSTileLayer>
          }
        </LayersControl.Overlay>
        <LayersControl.Overlay name="   Weather Data" >
          {
            data ? <GeoJSON
              eventHandlers={{
                add: (e) => {
                  setHideradius(true)
                },
                remove: (e) => {
                  setHideradius(false)
                }
              }}
              ref={inputElement} data={data} pointToLayer={pointToLayer} onEachFeature={onEachFeature} /> : <></>
          }
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Tehsils" >
          {
            <WMSTileLayer
              eventHandlers={{
                add: (e) => {
                  console.log("Added Layer:", e.target);
                },
                remove: (e) => {
                  console.log("Removed layer:", e.target);
                }
              }}
              layers={'server:locations'}
              format={'image/png'}
              transparent={true}
              opacity={0.7}
              version={'1.3.0'}
              epsg={'4326'}
              CQL_FILTER={"type='tehsil'"}
              ref={wms}
              styles={'testing_locations'}
              attribution={'<a href="https://bkk.ag/">BKK</a>'}
              minZoom={4}
              maxZoom={20}
              url={`https://gis.bkk.ag/geoserver/server/wms?`}

              header={"Access-Control-Allow-Origin ='*'"}>
            </WMSTileLayer>
          }
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Districts" >
          {
            <WMSTileLayer
              eventHandlers={{
                add: (e) => {
                  console.log("Added Layer:", e.target);
                },
                remove: (e) => {
                  console.log("Removed layer:", e.target);
                }
              }}
              layers={'server:locations'}
              format={'image/png'}
              transparent={true}
              opacity={0.7}
              version={'1.3.0'}
              styles={'testing_locations'}
              epsg={'4326'}
              CQL_FILTER={"type='district'"}
              ref={wms}
              //styles = { 'gis_server:ndvi'}
              attribution={'<a href="https://bkk.ag/">BKK</a>'}
              minZoom={4}
              maxZoom={20}
              url={`https://gis.bkk.ag/geoserver/server/wms?`}
              header={"Access-Control-Allow-Origin ='*'"}>
            </WMSTileLayer>
          }
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Pakistan" >
          {
            <WMSTileLayer
              layers={'server:pakistan'}
              format={'image/png'}
              transparent={true}
              opacity={0.7}
              version={'1.3.0'}
              epsg={'4326'}
              //styles = { 'gis_server:ndvi'}
              attribution={'<a href="https://bkk.ag/">BKK</a>'}
              minZoom={4}
              maxZoom={20}
              url={`https://gis.bkk.ag/geoserver/server/wms?`}>
            </WMSTileLayer>
          }
        </LayersControl.Overlay>
      </LayersControl>

    </>
  )
}