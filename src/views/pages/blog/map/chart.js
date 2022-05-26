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
import { cloudcoverstore } from '../../store/cloudcoverstore';
const Chart = (props) => {
  const [clouddates, setClouddates] = useState(null)
  const [layers, setLayers] = useState(ndvilayer.getState())
  const [ndmilaye, setNdmilaye] = useState(ndmilayerss.getState())
  const [lat, setLat] = useState(ndmilayerss.getState())
  const [map, setMap] = useState(mapcontainer.getState())
  const [growernamer, setGrowernamer] = useState(farmidcommunicator.getState())
  const [latitude, setLatitude] = useState(latt.getState())
  const [longitude, setLongitude] = useState(lngt.getState())
 
  useLayoutEffect(() => {
    farmidcommunicator.subscribe(() => {
      setGrowernamer(farmidcommunicator.getState())
    })
    ndvilayer.subscribe(() => {
      setLayers(ndvilayer.getState())
      console.log('actionlayer', layers)
    })
    ndmilayerss.subscribe(() => {
      setNdmilaye(ndmilayerss.getState())
    })
    mapcontainer.subscribe(() => {
      setMap(mapcontainer.getState())
      console.log('actionlayer', layers)
    })
    latt.subscribe(() => {
      setLatitude(latt.getState())

    })
    lngt.subscribe(() => {
      setLongitude(lngt.getState())

    })
  }, [])
  useEffect(()=>{
    
    axios.get('https://gistest.bkk.ag/NDVI_polygon/' + growernamer).then((response) => {


      response.data.map(function (val, index) {
       
       
        if(clouddates !=null){
          if (clouddates == val.date_int) {
            console.log('cloud_cover',val.cloud_cover)
            cloudcoverstore.dispatch({ type: 'cloudcover', cloudcover: val.cloud_cover }) 
          } 
      }
      })
    })
  },[clouddates])
  useEffect(() => {




    var avgndvi = []
    var minndvi = []
    var maxndvi = []
    var date = []
    var axisdate = []
    var avgbaselinendvi = []
    var avgndmi = []
    var precp = []
    var ndviimg = []
    var mintemp = []
    var mint

    axios.get('https://gistest.bkk.ag/NDVI_polygon/' + growernamer).then((response) => {


      response.data.map(function (val, index) {
       
        ndviimg.push(parseFloat(val.date_int))
      //   if(clouddates !=null){
      //     if (clouddates == val.date_int) {
      //       console.log('cloud_cover',val.cloud_cover)
      //       cloudcoverstore.dispatch({ type: 'cloudcover', cloudcover: val.cloud_cover }) 
      //     } 
      // }
      })
    })
    axios.get('https://gistest.bkk.ag/ndvi_series/' + growernamer).then((response) => {
      console.log('latt', response)
      // if(d.date_int==datecom){
      //   cloudcoverstore.dispatch({type:'cloudcover',cloudcover :d.cloud_cover})
      //   console.log('clou',d.cloud_cover)

      // }
      response.data ?
        response.data.map(function (val, index) {
          avgndvi.push(parseFloat(val.ndvi))
          date.push(val.date)
        }) : <></>
      if (growernamer) {
        datestore.dispatch({ type: 'date', date: date })
        axios.get('https://gistest.bkk.ag/ndvi_baseline_series/' + growernamer).then((response) => {
          response.data.map(function (val, index) {
            avgbaselinendvi.push(parseFloat(val.ndvi_baseline))
          })
          axios.get('https://gistest.bkk.ag/ndmi_series/' + growernamer).then(
            (response) => {
              response.data.map(function (val, index) {
                avgndmi.push(parseFloat(val.ndmi))
              })
              axios.get('https://prod.bkk.ag/weather-api/weather/historic/' + latitude + '/' + longitude + '/2-4-2022/5-23-2022', {
                headers: {
                  "Access-Control-Allow-Origin": "*"
                }
              }).then(
                (response) => {
                  props.setIsloading(false)
                  console.log('avgndvi', response)
                  Object.keys(response.data).map(
                    (e) => {
                      axisdate.push(e)
                      console.log('axisdate', axisdate);
                    }
                  )

                  Object.values(response.data).map((e) => {
                    precp.push(e.prec)
                    precp.push(0)
                    mintemp.push(e.minTemp)
                    mintemp.push(e.minTemp)
                  })

                  console.log('precp', precp)
                  console.log('avgndvi', avgndvi)
                  var chart = Highcharts.chart('container', {
                    chart: {
                      type: 'spline',
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
                      tickInterval: 10,
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

                        marker: {
                          radius: 1
                        },
                        cursor: 'pointer',
                        allowPointSelect: true,


                        events: {


                          click: function (event) {
                            var layerss = ndvilayer.getState()
                            var NDMIlayerss = ndmilayerss.getState()
                            NDMIlayerss ? map.removeLayer(NDMIlayerss) : <></>
                            layerss ? map.removeLayer(layerss) : <></>
                           
                            ndvis.dispatch({ type: 'ndvi', ndvi: event?.point?.category })
                            var datess = event?.point?.category?.split("-")
                            datess = datess[0] + datess[1] + datess[2]
                            setClouddates(datess)
                            
                            var staelitedates = datess?.length > 0 && (datess[0] + datess[1] + datess[2])
                            // var dd=ndviimg.filter(staelitedates)
                            // console.log(dd)
                            // console.log(staelitedates[i]==ndviimg[i])




                            var ind = this.name
                            ind ? indexsel.dispatch({ type: 'indexis', indexis: ind }) : <></>
                            // console.log("event", event.point.category)
                          }
                        },

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
                    }, { // Secondary yAxis
                      title: {
                        text: 'temp ',
                        style: {
                          color: Highcharts.getOptions().colors[0]
                        }
                      },
                      labels: {
                        format: '{value} C',
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
                        data: precp.reverse().slice(0, avgndvi.length),
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
                      {
                        name: 'Temperature',
                        type: 'spline',
                        data: mintemp.reverse().slice(0, avgndvi.length),
                        yAxis: 2,
                        color: 'red',
                        legendColor: 'red',
                      }

                    ]
                  });
                  // chart.series[1].options.data[0].color='red'
                  for (var i = 0; i <= chart.series[1].data.length; i++) {
                    var datess = chart?.series[1]?.data[i]?.['category']?.split("-")


                    var staelitedates = datess?.length > 0 && (datess[0] + datess[1] + datess[2])
                    // var dd=ndviimg.filter(staelitedates)
                    // console.log(dd)
                    // console.log(staelitedates[i]==ndviimg[i])

                    for (var j = 0; j <= ndviimg.length; j++) {
                      if (staelitedates == ndviimg[j]) {
                        console.log('yes we are in')
                        chart.series[1].data[i].update({

                          marker: {
                            fillColor: '#90ee90',
                            radius: 4
                          }
                        }
                        );
                        chart.series[3].data[i].update({

                          marker: {
                            fillColor: '#add8e6',
                            radius: 4,
                            symbol: 'circle'
                          }
                        }
                        );

                      }

                    }

                  }


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
