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
import { InputGroup, Row, Col, Input, InputGroupText, Card, CardHeader, CardTitle, CardBody, CardText, UncontrolledTooltip } from 'reactstrap'

const BlogSidebar = (props) => {
  // ** States
  const [farmids, setFarmids] = useState()
  const [overviewData, setOverviewData] = useState([])
  const [farmerList, setfarmerList] = useState([])
  const [searchedResult, setsearchedResult] = useState([]);
  const [sepcicFarm, setSpecificFarm] = useState(null);

  const [map, setMap] = useState(mapcontainer.getState())
  const getFarmersList = async () => {
    let res = await axios.get("https://gistest.bkk.ag/all_growers/hbl");
    setfarmerList(res.data)
    setsearchedResult(res.data)
  }

  const getNowcastWeather = async (lat, lng) => {
    let res = await axios.get(`http://192.168.100.162:200/weather/${lat}/${lng}`, { headers: { Authorization: "Basic c3lzdGVtOjU4OU5jUlVIV2RLTjZzRVM=" } });
    console.log(res.data)
  }


  const getSpecificFram = async (id) => {
    let res = await axios.get(`https://gistest.bkk.ag/hbl_farmer_data/${id}`);
    setSpecificFarm(res.data)
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
        <div className='right-sidebar-content'>
          <Card style={{ marginLeft: '8%' }} className='card-transaction' >


            <CardBody>
              <div className='meetup-header d-flex align-items-center'>

                <div className='my-auto'>
                  <h6>  {item.msisdn}</h6>

                  <CardText className='mb-0  text-success'>{item.growername}</CardText>
                </div>

              </div>
              <div className='d-flex'>

                <div style={{ backgroundColor: '#CDFFCC', width: '100%' }}>
                  <Icon.Check size={14} />
                  <small style={{ marginLeft: '2px' }}>{item.crops}</small>
                </div>
              </div>
              <div className='d-flex'>

                <div style={{ backgroundColor: '#CDFFCC', width: '100%', marginTop: '3px' }}>
                  <Icon.Map size={14} />
                  <small style={{ marginLeft: '2px' }} >{item.fields}</small>
                </div>
              </div>
              <div className='d-flex'>

                <div style={{ backgroundColor: '#CDFFCC', width: '100%', marginTop: '3px' }}>
                  <Icon.MapPin size={14} />
                  <small style={{ marginLeft: '2px' }}>{item.total_area} Acres</small>
                </div>
              </div>
            </CardBody>

          </Card>
        </div>
      )
    })
  }
  const renderSpecific = (sepcicFarm) => {
    return sepcicFarm.map(item => {
      return (
        <div className='right-sidebar-content'>
          <Card style={{ marginLeft: '8%' }} className='card-transaction' >


            <CardBody>
              <div className='meetup-header d-flex align-items-center'>

                <div className='my-auto'>
                  <h6>  {item.msisdn}</h6>

                  <CardText className='mb-0  text-success'>{item.farmer_name}</CardText>
                </div>
              </div>
              <div className='d-flex mt-2'>
                <Avatar color='light-primary' className='rounded me-1' icon={<Icon.Crosshair size={18} />} />
                <div>
                  <h6 className='mb-0'>Crop</h6>
                  <small >{item.crop_name}</small>
                </div>
              </div>
              <div className='d-flex mt-1'>
                <Avatar color='light-primary' className='rounded me-1' icon={<Icon.Check size={18} />} />
                <div>
                  <h6 className='mb-0'>Location</h6>
                  <small >{item.location_name}</small>
                </div>
              </div>
              <div className='d-flex mt-2'>
                <Avatar color='light-primary' className='rounded me-1' icon={<Icon.MapPin size={18} />} />
                <div>
                  <h6 className='mb-0'>Total Area</h6>
                  <small>{item.area_acres} Acres</small>
                </div>
              </div>
            </CardBody>

          </Card>
        </div>
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
        <div className='blog-sidebar right-sidebar my-0 my-lg-0'>
          <div className='right-sidebar-content'>
            <Card className='card-transaction' >




              <CardBody>
                <h6 style={{ textAlign: 'center', color: 'green' }}>HBL OVERVIEW</h6>
                <Row>
                  <Col>

                    <div className='my-auto'>
                      <h6>  Locations <Icon.HelpCircle id='location' size={14} /></h6>
                      <UncontrolledTooltip placement='bottom' target="location">
                        {overviewData.locations}
                      </UncontrolledTooltip>

                      <CardText className='mb-0  text-success'>{overviewData.count_locations}</CardText>
                    </div>
                  </Col>
                  <Col>
                    <div className='my-auto'>
                      <h6>  Fields</h6>

                      <CardText className='mb-0  text-success'>{overviewData.fields}</CardText>
                    </div>
                  </Col>
                  <Col>
                    <div className='my-auto'>
                      <h6>  Total Area</h6>

                      <CardText className='mb-0  text-success'>{overviewData.total_area}</CardText>
                    </div>
                  </Col>
                  <Col>
                    <div className='my-auto'>
                      <h6>  Crops <Icon.HelpCircle id='crop' size={14} /></h6>
                      <UncontrolledTooltip placement='bottom' target="crop">
                        {overviewData.crops}
                      </UncontrolledTooltip>

                      <CardText className='mb-0  text-success'>{overviewData.count_crops}</CardText>
                    </div>
                  </Col>


                </Row>
              </CardBody>

            </Card>
            <div >
              <InputGroup className='input-group-merge'>
                <Input placeholder='Search here' onChange={(e) => searchHandler(e.target.value)} onKeyDown={(e) => {


                  if (e.key == 'Enter') {

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
                            
                            getNowcastWeather(e.latlng.lat, e.latlng.lng)


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

                                // d.data.features[0]['properties']['farm_crop_id'] ? props.setIsloading(true) : <></>
                              
                                getSpecificFram(d.data.features[0]['properties']['farm_crop_id'])

                              }
                            )
                            // var bbxs = r.data.features[0]['properties']['cordinate'].split(',')
                            // var lats = bbxs[0]
                            // var lngs = bbxs[1]

                            // console.log(lats, lngs)

                            // lat.dispatch({ type: 'lat', lat: lats })
                            // lngt.dispatch({ type: 'lng', lng: lngs })

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
            <div style={{ height: "650px", overflowY: "scroll", marginTop: "5%" }} className="side_bar">{sepcicFarm ? renderSpecific(sepcicFarm) : renderTransactions(searchedResult)}</div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar
