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
  const [weatherData, setweatherData] = useState(null)
  const [farmerList, setfarmerList] = useState([])
  const [FarmsList, setFarmsList] = useState(null)
  const [searchedResult, setsearchedResult] = useState([]);
  const [sepcicFarm, setSpecificFarm] = useState(null);

  const [map, setMap] = useState(mapcontainer.getState())
  const getFarmersList = async () => {
    let res = await axios.get("https://gistest.bkk.ag/all_growers/hbl");
    setfarmerList(res.data)
    setSpecificFarm(null)
    setFarmsList(null)
    setweatherData(null)
    setsearchedResult(res.data)
  }

  const getNowcastWeather = async (lat, lng) => {
    let res = await axios.get(`https://gistest.bkk.ag/weather/${lat}/${lng}`, { headers: { Authorization: "Basic c3lzdGVtOjU4OU5jUlVIV2RLTjZzRVM=" } });
    setweatherData(res.data?.record?.weatherStats)
  }


  const getSpecificFram = async (id) => {
    let res = await axios.get(`https://gistest.bkk.ag/hbl_farmer_data/${id}`);
    setSpecificFarm(res.data)
  }

  const getFarmByMsisdn = async (msisdn) => {
    let res = await axios.get(`https://gistest.bkk.ag/farm_data/${msisdn}`);
    setFarmsList(res.data)
  }


  useEffect(async () => {
    let res = await axios.get("https://gistest.bkk.ag/Partner_stats/hbl");
    setOverviewData(res.data[0])
    getFarmersList()


  }, [])
  function DrawMap(farm_crop_id, lat, lng) {
    const filteredData = FarmsList.filter((data) => data.farm_crop_id === farm_crop_id)
    setFarmsList(filteredData)
    getNowcastWeather(lat, lng)
    farm_crop_id ? farmidcommunicator.dispatch({ type: 'search', id: farm_crop_id }) : <></>
    setFarmids(farm_crop_id)
    farm_crop_id ? props.setIsloading(true) : <></>
    axios.get("https://gis.bkk.ag/geoserver/server/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=server%3Ahbl_farms&CQL_FILTER=farm_crop_id='" + farm_crop_id + "'&outputFormat=application%2Fjson").then(
      r => {

        var bbx = r.data.features[0]['geometry']['coordinates'][0][0][0]

        map.flyTo([bbx[1], bbx[0]], 16)



        //     // console.log(d)
        farm_crop_id ? map.on('click', e => {
          props.setshowGraph(true)
          // props.setmapHeight('50vh')

          // getNowcastWeather(e.latlng.lat, e.latlng.lng)


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


              d?.data?.features[0]['properties']['farm_crop_id'] ? props.setIsloading(true) : <></>
              // d.data.features[0]['properties']['farm_crop_id'] ? props.setIsloading(true) : <></>
              var farmidurl = "https://gis.bkk.ag/geoserver/server/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=server%3Ahbl_farms&CQL_FILTER=farm_crop_id	='" + d.data.features[0]['properties']['farm_crop_id'] + "'&outputFormat=application%2Fjson";
              axios.get(farmidurl).then(
                single => {
                  console.log('afterclickable', single)
                  var bbx = single.data.features[0]['geometry']['coordinates'][0][0][0]
                  // map.fitBound(bbx)
                  map.flyTo([bbx[1], bbx[0]], 16)
                }


              )

              getSpecificFram(d.data.features[0]['properties']['farm_crop_id'])

            }
          )


        }) : <></>

      })

  }

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
          <Card style={{ marginLeft: '8%', cursor: 'pointer' }} className='card-transaction' onClick={() => getFarmByMsisdn(item.msisdn)} >


            <CardBody>
              <div className='meetup-header d-flex align-items-center'>
                <div class="d-flex justify-content-between">
                  <div>
                    <h6>  {item.msisdn}</h6>
                  </div>
                  <div>


                    <Icon.Mic style={{ marginLeft: '10px', color: '#26BD69' }} onMouseDown={(e) => {
                      e.stopPropagation();
                      props?.setcenteredModalVoice(true)
                    }} size={18} />


                    <Icon.Mail style={{ marginLeft: '10px', color: '#26BD69' }} onMouseDown={(e) => {
                      e.stopPropagation();
                      props?.setCenteredModal(true)
                    }} size={18} />

                  </div>
                </div>



              </div>
              <div className='my-auto'>

                <CardText className='mb-0  text-success'>{item.growername}</CardText>
              </div>
              <div className='d-flex'>

                <div >
                  <Icon.Check size={16} />
                  <small style={{ marginLeft: '3px' }}>{item.crops}</small>
                </div>
              </div>
              <div className='d-flex'>

                <div style={{ marginTop: '4px' }}>
                  <Icon.Map size={16} />
                  <small style={{ marginLeft: '5px' }} >{item.fields}</small>
                </div>
              </div>
              <div className='d-flex'>

                <div style={{ marginTop: '4px' }}>
                  <Icon.MapPin size={16} />
                  <small style={{ marginLeft: '3px' }}>{item.total_area} Acres</small>
                </div>
              </div>
            </CardBody>

          </Card>
        </div>
      )
    })
  }
  const renderweatherData = (weatherData) => {

    return (
      <div className='right-sidebar-content'>
        {weatherData && <Card style={{ marginLeft: '4%' }} className='card-transaction'  >


          <CardBody>
            <h6 style={{ textAlign: 'center', color: 'green' }}>Current Weather <Icon.ArrowUpRight onClick={() => window.open(`https://weather.bkk.ag/weather?geo=${weatherData.lat},${weatherData.long}`, "_blank")} /></h6>
            <Row>
              <Col>

                <div className='my-auto'>
                  <h6>  Condition <Icon.HelpCircle id='location' size={14} /></h6>


                  <CardText className='mb-0  text-success'>{weatherData.weatherCondition}</CardText>
                </div>
              </Col>
              <Col>
                <div className='my-auto'>
                  <h6>  Max Temp</h6>

                  <CardText className='mb-0  text-success'>{weatherData?.maxTemp || "N/A"}</CardText>
                </div>
              </Col>
              <Col>
                <div className='my-auto'>
                  <h6>  Min Temp</h6>

                  <CardText className='mb-0  text-success'>{weatherData.minTemp}</CardText>
                </div>
              </Col>
              <Col>
                <div className='my-auto'>
                  <h6>  preception</h6>


                  <CardText className='mb-0  text-success'>{weatherData.prec || "N/A"}</CardText>
                </div>
              </Col>


            </Row>



          </CardBody>

        </Card>}


      </div>
    )

  }
  const renderAllfarms = (FarmList) => {
    return FarmList.map(item => {
      return (
        <div className='right-sidebar-content'>


          <Card style={{ marginLeft: '8%', cursor: 'pointer' }} className='card-transaction' onClick={() => DrawMap(item.farm_crop_id, item.lat, item.long)} >


            <CardBody>
              <div className='meetup-header d-flex align-items-center'>
                <div class="d-flex justify-content-between">
                  {/* <div>
                    <h6>  {item.msisdn}</h6>
                  </div> */}

                </div>



              </div>
              <div className='my-auto'>

                <CardText className='mb-0  text-success'>{item.farm_title}</CardText>
              </div>
              <div className='d-flex'>

                <div >
                  <Icon.Check size={16} />
                  <small style={{ marginLeft: '3px' }}>{item.location_name}</small>
                </div>
              </div>
              <div className='d-flex'>

                <div style={{ marginTop: '4px' }} onMouseDown={(e) => {
                  e.stopPropagation();
                  props?.setadvisoryTimeline(true)
                }}>
                  <Icon.Map size={16} />
                  <small style={{ marginLeft: '5px' }} >{item.crops}</small>
                </div>
              </div>
              <div className='d-flex'>

                <div style={{ marginTop: '4px' }}>
                  <Icon.MapPin size={16} />
                  <small style={{ marginLeft: '3px' }}>{item.area_farm} Acres</small>
                </div>
              </div>
              <div className='d-flex'>

                <div style={{ marginTop: '4px' }}>
                  <Icon.Calendar size={16} />
                  <small style={{ marginLeft: '3px' }}>{item.sowing_date} </small>
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
                    DrawMap(e.target.value)

                    return true;
                  } else {
                    return false;
                  }
                }} />

                <InputGroupText>
                  {/* <Icon.X size={16}  /> */}
                  <Icon.Search size={14} />


                </InputGroupText >
              </InputGroup>
            </div>
            <div class="d-flex justify-content-between">
              <div>
                <Icon.ArrowLeft style={{ cursor: 'pointer' }} onClick={() => getFarmersList()} />
              </div>
              <div>
                <Icon.X />
              </div>
            </div>
            <div>{renderweatherData(weatherData)}</div>
            <div style={{ height: "400px", overflowY: "scroll", marginTop: "2%" }} className="side_bar">{FarmsList ? renderAllfarms(FarmsList) : renderTransactions(searchedResult)}</div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar
