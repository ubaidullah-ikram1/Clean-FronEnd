// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import CardAction from '@components/card-actions'
import { mapcontainer } from '../store/mapcontainer'
// ** Third Party Components
import { farmidcommunicator } from '../store/farmidcommunicator'
import axios from 'axios'
import * as Icon from 'react-feather'
import { useLayoutEffect,useState } from 'react'
import { Msidn } from '../store/msidn'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { InputGroup, Input, InputGroupText, Card, CardHeader, CardTitle, CardBody, CardText, Button } from 'reactstrap'

const BlogSidebar = (prop) => {
  // ** States
  const [farmids,setFarmids]=useState()

  const CategoryColorsArr = {
    Quote: 'light-info',
    Fashion: 'light-primary',
    Gaming: 'light-danger',
    Video: 'light-warning',
    Food: 'light-success'
  }
  const [map, setMap] = useState(mapcontainer.getState())
  useLayoutEffect(() => {
    mapcontainer.subscribe(() => {
      setMap(mapcontainer.getState())
  

    })
  }, [])
  return (
    <div className='sidebar-detached sidebar-right'>
      <div className='sidebar'>
        <div className='blog-sidebar right-sidebar my-1 my-lg-0'>
          <div className='right-sidebar-content'>
            <div className='blog-search'>
              <InputGroup className='input-group-merge'>
                <Input placeholder='Search here'  onKeyDown={(e)=>{
                  
                  console.log('event',e.key)
                  if (e.key == 'Enter') {
console.log('enter',e.target.value)
var msidn=e.target.value
                     Msidn.dispatch({type:'msidn',msidn:msidn})
                  //   setMsidn(msidn)
                  //   console.log(msidn)
                    //  msidn.dispatch({type:'msidn',msidn:d.data.features[0]['properties']['field_1']})
                      axios.get("https://gis.bkk.ag/geoserver/server/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=server%3Ahbl_farms&CQL_FILTER=msisdn='"+msidn+"'&outputFormat=application%2Fjson").then(
               r=>{
                console.log('enter',r)
                  var bbx=r.data.features[0]['geometry']['coordinates'][0][0][0]
              //     console.log('wmslayer',bbx)
              //     console.log(map)
              
                  map.flyTo([bbx[1],bbx[0]],15)
                 
                 
                r.data.features.map(d=>{
              //     // console.log(d)
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
               setFarmids(d.data.features[0]['properties']['farm_crop_id'])
             
             }
            )
        // var bbxs=r.data.features[0]['properties']['cordinate'].split(',')
        //  var lats=bbxs[0]
        //  var lngs=bbxs[1]
        
           
        //    lat.dispatch({type:'lat',lat:lats})
        //    lngt.dispatch({type:'lng',lng:lngs})
        
             })
                 
               })
               })
                     return true;
                  } else {
                     return false;
                  }
                }}/>
                <InputGroupText>
                  <Icon.Search size={14} />
                </InputGroupText>
              </InputGroup>
            </div>
            <Card className='business-card mt-2'>
              <CardHeader className='pb-1'>
                <CardTitle tag='h4'>Fields</CardTitle>
                <Icon.Edit size={18} className='cursor-pointer' />
              </CardHeader>
              <CardBody>
                <CardText>US Demo Field</CardText>
                <span>10.5 ha</span>
                <br />
                <span >39.5119° N 122.0711° W</span>


              </CardBody>
            </Card>
            <Card className='business-card'>
              <CardHeader className='pb-1'>
                <CardTitle >Crop rotate <Icon.Info size={12} className='cursor-pointer' /></CardTitle>
                <p className='mt-1'>Show more</p>
              </CardHeader>

            </Card>
            <CardAction title='Current weather' actions='collapse'>
              <CardBody className='pt-0'>

                <CardText>
                  Apr 27, 2022, 00:00 - 01:00
                </CardText>

              </CardBody>
            </CardAction>

          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar
