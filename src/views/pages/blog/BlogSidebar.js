// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import CardAction from '@components/card-actions'
import { mapcontainer } from '../store/mapcontainer'
// ** Third Party Components
import { farmidcommunicator } from '../store/farmidcommunicator'
import axios from 'axios'
import * as Icon from 'react-feather'
import { useLayoutEffect, useState, useEffect } from 'react'
import { Msidn } from '../store/msidn'
import { lat } from '../store/polygoncentroid'
import { lngt } from '../store/polygoncentroid'
// ** Custom Components
import Avatar from '@components/avatar'
// ** Reactstrap Imports
import { InputGroup, Input, InputGroupText, Card, CardHeader, CardTitle, CardBody, CardText, UncontrolledCollapse } from 'reactstrap'
const BlogSidebar = (prop) => {
  // ** States
  const [farmids, setFarmids] = useState()
  const [overviewData, setOverviewData] = useState([])
  const [farmerList, setfarmerList] = useState([])
  const [searchedResult, setsearchedResult] = useState([]);

  const [map, setMap] = useState(mapcontainer.getState())
  const getFarmersList = async () => {
    let res = await axios.get("https://gistest.bkk.ag/HBL_overview/hbl");
    setfarmerList(res.data)
    setsearchedResult(res.data)
  }
  useEffect(async () => {
    let res = await axios.get("https://gistest.bkk.ag/Partner_stats/hbl");
    setOverviewData(res.data[0])
    getFarmersList()

  }, [])


  const searchHandler = (event) => {
    let searcjQery = event;
    var displayedfarmers = farmerList.filter((el) => {
      let searchValue = el.msisdn;
      return searchValue.toLowerCase().indexOf(searcjQery.toLowerCase()) !== -1;
    });
    setsearchedResult(displayedfarmers);
  };


  const renderTransactions = (farmerList) => {
    return farmerList.map(item => {
      return (
        <Card className='card-transaction mt-1' >
          <CardAction title={item?.msisdn} actions='collapse'>

            <CardBody>
              <div className='meetup-header d-flex align-items-center'>

                <div className='my-auto'>
                  <h6>  Crops</h6>

                  <CardText className='mb-0  text-success'>{item.crops}</CardText>
                </div>
              </div>
              <div className='d-flex mt-2'>
                <Avatar color='light-primary' className='rounded me-1' icon={<Icon.User size={18} />} />
                <div>
                  <h6 className='mb-0'>Name</h6>
                  <small >{item.farmer_name}</small>
                </div>
              </div>
              <div className='d-flex mt-1'>
                <Avatar color='light-primary' className='rounded me-1' icon={<Icon.Check size={18} />} />
                <div>
                  <h6 className='mb-0'>Fields</h6>
                  <small >{overviewData.fields}</small>
                </div>
              </div>
              <div className='d-flex mt-2'>
                <Avatar color='light-primary' className='rounded me-1' icon={<Icon.MapPin size={18} />} />
                <div>
                  <h6 className='mb-0'>Total Area</h6>
                  <small>{overviewData.total_area}</small>
                </div>
              </div>
            </CardBody>
          </CardAction>
        </Card>
      )
    })
  }
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
            <Card className='card-transaction' >
              <CardAction title='HBL Overview' actions='collapse'>

                <CardBody>
                  <div className='meetup-header d-flex align-items-center'>

                    <div className='my-auto'>
                      <h6>  Locations</h6>

                      <CardText className='mb-0  text-success'>{overviewData.locations}</CardText>
                    </div>
                  </div>
                  <div className='d-flex mt-1'>
                    <Avatar color='light-primary' className='rounded me-1' icon={<Icon.Check size={18} />} />
                    <div>
                      <h6 className='mb-0'>Fields</h6>
                      <small >{overviewData.fields}</small>
                    </div>
                  </div>
                  <div className='d-flex mt-2'>
                    <Avatar color='light-primary' className='rounded me-1' icon={<Icon.MapPin size={18} />} />
                    <div>
                      <h6 className='mb-0'>Total Area</h6>
                      <small>{overviewData.total_area}</small>
                    </div>
                  </div>
                  <div className='d-flex mt-2'>
                    <Avatar color='light-primary' className='rounded me-1' icon={<Icon.Crop size={18} />} />
                    <div>
                      <h6 className='mb-0'>Crops Count</h6>
                      <small >{overviewData.count_crops}</small>
                    </div>
                  </div>


                </CardBody>
              </CardAction>
            </Card>
            <div className='blog-search'>
              <InputGroup className='input-group-merge'>
                <Input placeholder='Search here' onChange={(e) => searchHandler(e.target.value)} onKeyDown={(e) => {


                  if (e.key == 'Enter') {
                    console.log('enter', e.target.value)
                    var msidn = e.target.value
                    Msidn.dispatch({ type: 'msidn', msidn: msidn })
                    //   setMsidn(msidn)
                    //   console.log(msidn)
                    //  msidn.dispatch({type:'msidn',msidn:d.data.features[0]['properties']['field_1']})
                    axios.get("https://gis.bkk.ag/geoserver/server/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=server%3Ahbl_farms&CQL_FILTER=msisdn='" + msidn + "'&outputFormat=application%2Fjson").then(
                      r => {
                        console.log('enter', r)
                        var bbx = r.data.features[0]['geometry']['coordinates'][0][0][0]
                        //     console.log('wmslayer',bbx)
                        //     console.log(map)

                        map.flyTo([bbx[1], bbx[0]], 15)


                        r.data.features.map(d => {
                          //     // console.log(d)
                          map.on('click', e => {
                          
                            var sw = map.options.crs.project(map.getBounds().getSouthWest());
                            var ne = map.options.crs.project(map.getBounds().getNorthEast());
                            var BBOX = sw.x + "," + sw.y + "," + ne.x + "," + ne.y;
                            var WIDTH = map.getSize().x;
                            var HEIGHT = map.getSize().y;
                            var X = Math.trunc(map.layerPointToContainerPoint(e.layerPoint).x);
                            var Y = Math.trunc(map.layerPointToContainerPoint(e.layerPoint).y);
                            var url = "https://gis.bkk.ag/geoserver/server/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=server:hbl_farms&CQL_FILTER=msisdn='" + msidn + "'&QUERY_LAYERS=server:hbl_farms&BBOX=" + BBOX + "&FEATURE_COUNT=1&HEIGHT=" + HEIGHT + "&WIDTH=" + WIDTH + "&INFO_FORMAT=application%2Fjson&TILED=false&CRS=EPSG%3A3857&I=" + X + "&J=" + Y;
                            axios.get(url).then(
                              d => {
                                console.log('idvalue', d.data.features[0]['properties']['farm_crop_id'])
                                d.data.features[0]['properties']['farm_crop_id'] ? farmidcommunicator.dispatch({ type: 'search', id: d.data.features[0]['properties']['farm_crop_id'] }) : <></>
                                setFarmids(d.data.features[0]['properties']['farm_crop_id'])

                              }
                            )
                            var bbxs=r.data.features[0]['geometry']['coordinates'][0][0][0]
                          
                            var lats=bbxs[1]
                             var lngs=bbxs[0]
                             console.log('lngs',lngs)
                             console.log('lat',lats)
                            

                               lat.dispatch({type:'lat',lat:lats})
                               lngt.dispatch({type:'lng',lng:lngs})

                          })

                        })
                      })
                    return true;
                  } else {
                    return false;
                  }
                }} />

                <InputGroupText>
                  <Icon.Search size={14} />

                </InputGroupText >
              </InputGroup>
            </div>





            <div style={{ height: "250px", overflowY: "scroll" }} className="side_bar mt-1">{renderTransactions(searchedResult)}</div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar
