import React, { useLayoutEffect, useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import axios from "axios"
import { farmidcommunicator } from '../../store/farmidcommunicator';
// import { datestore } from '../../../stores/datesstore';
// import { fetchfarmid } from '../../../stores/visibilty';
// import { clouddate } from '../../../stores/datesstore';
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
    axios.get('https://gistest.bkk.ag/NDVI_polygon/' + growernamer).then((response) => {

      response.data ?
        response.data.map(function (val, index) {
          if (parseFloat(val.cloud_cover) < 60.00) {
            avgndvi.push(parseFloat(val.ndvi_avg))
            date.push(val.date)
            //   setDates(date)
          }
        }) : <></>

      if (growernamer) {

        // datestore.dispatch({type:'date',date :date})
        axios.get('https://gistest.bkk.ag/NDVI_baseline/' + growernamer, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
          }
        }).then((response) => {
          response.data.map(function (val, index) {
            avgbaselinendvi.push(parseFloat(val.baseline_max_ndvi))
          })
          Highcharts.chart('container', {
            chart: {

              height: 230,
              backgroundColor: '#292929',
              color: '#FF0000',
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
              color: "#FFFFFF"
            },
            xAxis: {
              tickInterval: 2,
              categories: date,
              labels: {
                enabled: true,
              },
              style: {
                fontFamily: 'monospace',
                color: "#FFFFFF"
              }
            },

            legend: {
              itemStyle: {
                color: '#FFFFFF',

              },
              layout: 'vertical',
              // floating: true,
              align: 'right',
              verticalAlign: 'top',

              symbolPadding: 20,
              symbolWidth: 50
            },
            series: [{
              name: 'Avg NDVI',
              data: avgndvi,
              style: {
                fontFamily: 'monospace',

                fill: '#FFFFFF'
              }
            },
            {
              name: 'Baseline Avg NDVI',
              data: avgbaselinendvi,
              color: '#FFFF00',
              legendColor: 'red',
            },
              // {
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
