import React, { useLayoutEffect, useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import axios from "axios"
import { farmidcommunicator } from '../../store/farmidcommunicator';
import { datestore } from '../../store/datesstore';
// import { fetchfarmid } from '../../../stores/visibilty';
const Chart = () => {
  const [reset, setReset] = useState('c')
  // const [dates, setDates] = useState([])
  // const [cloudesdate, setCloudesdate] = useState(clouddate.getState())
  const [growernamer, setGrowernamer] = useState(farmidcommunicator.getState())
  useLayoutEffect(() => {
    farmidcommunicator.subscribe(() => {
      setGrowernamer(farmidcommunicator.getState())
    })
    //   clouddate.subscribe(()=>{ 
    //     setCloudesdate(clouddate.getState() )

    //       })
    //   datestore.subscribe(()=>{ 
    //     setDates(datestore.getState() )

    //       })
  }, [])
  useEffect(() => {
    //   fetchfarmid.dispatch({type:'farmid',farmid :growernamer})
    //   console.log('cloudates',dates)
    var avgndvi = []
    var minndvi = []
    var maxndvi = []
    var date = []
    var axisdate=[]
    var avgbaselinendvi = []
    var avgndmi = []
    var temp=[]
    
    axios.get('https://gistest.bkk.ag/NDVI_polygon/' + growernamer).then((response) => {

      response.data ?
        response.data.map(function (val, index) {
          if (parseFloat(val.cloud_cover) < 60.00) {
            avgndvi.push(parseFloat(val.ndvi_avg))
            date.push(val.date)
            //   setDates(date)
           

          }
        }) : <></>
        console.log('startdate',date[0])
        console.log('enddate',date.slice(-1))
      if (growernamer) {

        datestore.dispatch({type:'date',date :date})
        axios.get('https://gistest.bkk.ag/NDVI_baseline/' + growernamer, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
          }
        }).then((response) => {
          response.data.map(function (val, index) {
            avgbaselinendvi.push(parseFloat(val.baseline_max_ndvi))
         
          })

          axios.get('https://gistest.bkk.ag/NDMI_date/'+ growernamer).then(
            (response) =>{
              response.data.map(function (val, index) {
                avgndmi.push(parseFloat(val.ndmi_avg))
             
              })

              axios.get('https://prod.bkk.ag/weather-api/weather/historic/30.21337183/73.19943331/2-04-2022/5-05-2022').then(
            (response) =>{
              console.log(response)
              Object.keys(response.data).map(
                (e)=>{
                  axisdate.push(e)
                  console.log('axisdate',axisdate);

                }
              )
              Object.values(response.data).map((e)=>{
                
                temp.push(e.minTemp)
              })
            
            Highcharts.chart('container', {
              chart: {
                  type  :'scatter'
              },
             
              xAxis: {
                      tickInterval: 5,
                      categories: axisdate.reverse(),
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
                            events: {
                                click: function (event) {
                                  alert("event",event.point.category)
                                  
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
                  }
              }, { // Secondary yAxis
                  title: {
                      text: 'Rainfall',
                      style: {
                          color: Highcharts.getOptions().colors[0]
                      }
                  },
                  labels: {
                      format: '{value} mm',
                      style: {
                          color: Highcharts.getOptions().colors[0]
                      }
                  },
                  opposite: true
              }],
              tooltip: {
                  shared: true
              },
              
                legend: {
                  itemStyle: { 
                     color: '#696969',
                  },
                  layout: 'vertical',
                  // floating: true,
                  align: 'right',
                  verticalAlign: 'top',
                 
                  symbolPadding: 20,
                  symbolWidth: 50
                },
              series: [
                {
                          name: 'Avg NDVI',
                          type: 'spline',
                          data:avgndvi,
                          color:'red',
                          legendColor: 'red', 
                       
                           
                          
                }     
                          ,
                      {
                        name: 'Baseline Avg NDVI',
                        type: 'spline',
                        data:avgbaselinendvi,
                       color:'#FFFF00',
                       legendColor: 'red',   
                      },
                      {
                        name: 'Avg NDMI',
                        data:avgndmi,
                        type: 'spline',
                       color:'blue',
                       legendColor: 'red',   
                      },
                      {
                           name: 'temp',
                           type: 'column',
                           data:temp,
                           yAxis: 1,
                           color:'blue',
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
