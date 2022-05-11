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

              axios.get('https://prod.bkk.ag/weather-api/weather/historic/30.21337183/73.19943331/2022-04-02/2022-05-05').then(
            (response) =>{
             
              Object.values(response.data).map((e)=>{
                console.log(e)
                temp.push(e.minTemp)
              })
              Highcharts.chart('container', {
                chart: {
                
                  height:300,
                  backgroundColor:'rgba(248, 248, 248, 0.95)' ,
                  color : '#FF0000' ,
                  style: {
                    fontFamily: 'monospace',
                    color: "#FFFFFF"
                }             
                },
                title: {
                  text: 'NDVI',
                  style: {
                    fontFamily: 'monospace',
                    color: "#FFFFFF"
                }   
                },
                subtitle: {
                
                  style: {
                    fontFamily: 'monospace',
                    color: "#FFFFFF"
                }   
                },     
                yAxis: {
                  title: {
                    text: 'NDVI'
                  }
                },
                style: {
                  fontFamily: 'monospace',
                  color: "#696969"
              }   ,
                xAxis: {
                  tickInterval: 2,
                  categories: date,
                  labels: {
                      enabled: true,
                  },
                  style: {
                    fontFamily: 'monospace',
                    color: "#696969"
                }        
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
                    data:avgndvi,
                   color:'red',
                   legendColor: 'red',   
                  }  ,
                {
                  name: 'Baseline Avg NDVI',
                  data:avgbaselinendvi,
                 color:'#FFFF00',
                 legendColor: 'red',   
                },
                {
                  name: 'Avg NDMI',
                  data:avgndmi,
                 color:'blue',
                 legendColor: 'red',   
                },
                {
                  name: 'temp',
                  data:temp,
                 color:'blue',
                 legendColor: 'red',   
                },
                // {
                //   name: 'Avg NDMI',
                //   data:temp,
                //  color:'blue',
                //  legendColor: 'red',   
                // }
                // {avgndmi avgndvi
                //   name: 'Baseline NDVI',
                //   data: avgbaselinendvi,
                //   style: {
                //     fontFamily: 'monospace',
                  
                //     fill : '#FFFFFF'
                // }   
                // }
              ],
          
                responsive: {
                  rules: [{
                    condition: {
                      maxWidth: 500
                    },
                    chartOptions: {
                      legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                      }
                    }
                  }]
                }
              })
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
