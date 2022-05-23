import React, { useLayoutEffect, useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import axios from "axios"
import { farmidcommunicator } from '../../store/farmidcommunicator';
import { datestore } from '../../store/datesstore';
import { ndvis } from '../../store/ndviraster';
import { indexsel } from '../../store/indexselect';
import { isPropsEqual } from '@fullcalendar/core';
import { ndmilayerss } from '../../store/ndmilayer';
import { ndvilayer } from '../../store/ndvilayer';
import { map } from 'jquery';
import { mapcontainer } from '../../store/mapcontainer';
import { latt } from '../../store/polygoncentroid';
import { lngt } from '../../store/polygoncentroid';
const Chart = (props) => {
  const [reset, setReset] = useState('c')
  const [indexname, SetIndexname] = useState()
  const [layers, setLayers] = useState(ndvilayer.getState())
  const [ndmilaye, setNdmilaye] = useState(ndmilayerss.getState())
  const [lat, setLat] = useState(ndmilayerss.getState())
  const [ map,setMap]= useState(mapcontainer.getState())
  const [growernamer, setGrowernamer] = useState(farmidcommunicator.getState())
  const [latitude,setLatitude] = useState(latt.getState())
  const [longitude, setLongitude] = useState(lngt.getState())
  useLayoutEffect(() => {
    farmidcommunicator.subscribe(() => {
      setGrowernamer(farmidcommunicator.getState())
    })
    ndvilayer.subscribe(() => {
      setLayers(ndvilayer.getState())
      console.log('actionlayer',layers)
    })
    ndmilayerss.subscribe(() => {
      setNdmilaye(ndmilayerss.getState())
          })
    mapcontainer.subscribe(() => {
      setMap(mapcontainer.getState())
      console.log('actionlayer',layers)
    })
    latt.subscribe(() => {
      setLatitude(latt.getState())
   
    })
    lngt.subscribe(() => {
      setLongitude(lngt.getState())
      
    })
  }, [])
  useEffect(() => {
    var avgndvi = []
    var minndvi = []
    var maxndvi = []
    var date = []
    var axisdate = []
    var avgbaselinendvi = []
    var avgndmi = []
    var precp = []
var mintemp=[]
var mint
    axios.get('https://gistest.bkk.ag/NDVI_polygon/'+growernamer).then((response) => {
      console.log('latt',latitude)
      response.data ?  
        response.data.map(function (val, index) {
            avgndvi.push(parseFloat(val.ndvi_avg))
            date.push(val.date)
        }) : <></>
      if (growernamer) {
        datestore.dispatch({ type: 'date', date: date })
        axios.get('https://gistest.bkk.ag/NDVI_baseline/' + growernamer, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
          }
        }).then((response) => {
          response.data.map(function (val, index) {
            avgbaselinendvi.push(parseFloat(val.baseline_max_ndvi))
          })
          axios.get('https://gistest.bkk.ag/NDMI_date/' + growernamer).then(
            (response) => {
              response.data.map(function (val, index) {
                avgndmi.push(parseFloat(val.ndmi_avg))
              })
              axios.get('https://prod.bkk.ag/weather-api/weather/historic/'+latitude+'/'+longitude+ '/2-04-2022/5-05-2022', {
                headers: {
                  "Access-Control-Allow-Origin": "*"
                }
              }).then(
                (response) => {
                  props.setIsloading(false)
                  console.log('avgndvi',  response)
                  Object.keys(response.data).map(
                    (e) => {
                      axisdate.push(e)
                      console.log('axisdate', axisdate);
                    }
                  )
               
               Object.values(response.data).map((e) => {
                    precp.push(e.prec)   
                    mintemp.push(e.minTemp)  
                  })
                  
                      console.log('precp',precp)
                      console.log('avgndvi',avgndvi)
                  Highcharts.chart('container', {
                    chart: {
                      type: 'scatter',
                      height: '300px'
                    },
                    title: {
                      text: ''
                      // text: null // as an alternative
                    },
                    subtitle: {
                      text: ''
                      // text: null // as an alternative
                    },

                    xAxis: {
                      tickInterval: 5,
                      categories: date,
                      labels: {
                        enabled: true,

                      },
                      crosshair: true,
                      style: {
                        fontFamily: 'monospace',
                        color: "#696969"
                      }
                    },
                    plotOptions: {
                      series: {
                        cursor: 'pointer',
                        allowPointSelect: true,

                        events: {
                          click: function (event) {
                            var layerss=ndvilayer.getState()
                             var NDMIlayerss=ndmilayerss.getState()
                             NDMIlayerss? map.removeLayer(NDMIlayerss) : <></>
                            layerss ?  map.removeLayer(layerss) : <></>
                            ndvis.dispatch({ type: 'ndvi', ndvi: event.point.category })
                            var ind = this.name
                            ind ? indexsel.dispatch({ type: 'indexis', indexis: ind }) : <></>
                            // console.log("event", event.point.category)
                          }
                        }
                      }
                    },
                    yAxis: [{ // Primary yAxis
                      title: {
                        text: 'NDVI/NDMI',
                        style: {
                          color: Highcharts.getOptions().colors[1]
                        }
                      },
                      crosshair: true
                    }, { // Secondary yAxis
                      title: {
                        text: 'Precp %',
                        style: {
                          color: Highcharts.getOptions().colors[0]
                        }
                      },
                      labels: {
                        format: '{value} %',
                        style: {
                          color: Highcharts.getOptions().colors[0]
                        }
                      },
                      opposite: true
                    }],

                    legend: {
                      itemStyle: {
                        color: '#696969',
                      },
                      layout: 'horizontal',
                      // floating: true,
                      align: 'right',
                      verticalAlign: 'bottom',

                      symbolPadding: 20,
                      symbolWidth: 50
                    },
                    
        tooltip: {
          shared: true,
          // useHTML: true,
          // formatter: function() {
          //     var serie = this.series;
          //     var index = this.series.points.indexOf(this.point);
          //     var s = '<img src="http://static.bbci.co.uk/frameworks/barlesque/2.45.9/desktop/3.5/img/blq-blocks_grey_alpha.png" height="20" width="40"/><br/><b>' + Highcharts.dateFormat('%A, %b %e, %Y', this.x) + '</b><br>';
          //     s += 'temp : ' + " "  +mint[index]  + " " + " " + '<span style="color:' + serie.color + '">' + serie.options.name + '</span>: <b>' + this.y + '</b><br/>';
           
          //     return s;
          // }
      },
                    series: [
                      {
                        name: 'Precipitation',
                        type: 'column',
                        data: precp.slice(0,avgndvi.length),
                        yAxis: 1,
                        color: 'blue',
                        legendColor: 'red',
                      },
                      {
                        name: 'Avg NDVI',
                        type: 'spline',
                        data: avgndvi,
                        color: '#90ee90',
                        legendColor: 'red',
                      }
                      ,
                      {
                        name: 'Baseline Avg NDVI',
                        type: 'spline',
                        data: avgbaselinendvi,
                        color: 'green',
                        legendColor: 'red',
                      },
                      {
                        name: 'Avg NDMI',
                        data: avgndmi,
                        type: 'spline',
                        color: '#add8e6',
                        legendColor: 'red',
                      },

                    ]
                  });


                }

              )


            }
          )

        })
      }
    });
  }, [growernamer])
  return (
    <div  >

      <div className='highcharts-figure'>
        <div className=' text-center' id="container"></div>
      </div>

    </div>
  );
};
export default Chart;
