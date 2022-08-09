// import React, { useLayoutEffect, useState, useEffect } from 'react'
// import Highcharts from 'highcharts'
// import axios from "axios"
// import { farmidcommunicator } from '../../../store/farmidcommunicator';

// // import { ndvilayer } from '../../store/ndvilayer';
// // import { fetchfarmid } from '../../../stores/visibilty';
// const Tempchart = (props) => {
 


//   // const [dates, setDates] = useState([])
//   // const [cloudesdate, setCloudesdate] = useState(clouddate.getState())
//   const [growernamer, setGrowernamer] = useState(farmidcommunicator.getState())
//   useLayoutEffect(() => {
//     farmidcommunicator.subscribe(() => {
//       setGrowernamer(farmidcommunicator.getState())
//     })
  
    
//   }, [])
//   useEffect(() => {
//     //   fetchfarmid.dispatch({type:'farmid',farmid :growernamer})
//     //   console.log('cloudates',dates)
    
//     var axisdate = []
//     var temperature = []
//               axios.get('https://prod.bkk.ag/weather-api/weather/historic/30.21337183/73.19943331/3-04-2022/5-05-2022').then(
//                 (response) => {
              
//                   Object.keys(response.data).map(
//                     (e) => {
//                       axisdate.push(e)
                     
//                     }
//                   )
//             //  var readldate   =  axisdate.filter((i)=>{ return i>= '4/2/2022' && i <= '5/5/2022';})
                 
//                   Object.values(response.data).map((e) => {
                    
//                     temperature.push(e.minTemp)
//                   })

//                   Highcharts.chart('tempcontainer', {
//                     chart: {
                      
//                       height : '300px'
//                     },
//                     title: {
//                       text: ''
//                             // text: null // as an alternative
//                     },
//                     subtitle: {
//                       text: ''
//                             // text: null // as an alternative
//                     },
                  
//                     xAxis: {
//                       tickInterval: 5,
//                       categories: axisdate.reverse(),
//                       labels: {
//                         enabled: true,

//                       },
//                       crosshair: true,
//                       style: {
//                         fontFamily: 'monospace',
//                         color: "#696969"
//                       }
//                     },
                    
//                     yAxis: [{ // Primary yAxis
//                       title: {
//                         text: 'Temp',
//                         style: {
//                           color: Highcharts.getOptions().colors[1]
//                         }
//                       },
//                       crosshair: true
//                     }],
//                     tooltip: {
//                       shared: true,
                     
//                     },

//                     legend: {
//                       itemStyle: {
//                         color: '#696969',
//                       },
//                       layout: 'horizontal',
//                       // floating: true,
//                       align: 'right',
//                       verticalAlign: 'bottom',

//                       symbolPadding: 20,
//                       symbolWidth: 50
//                     },
//                     series: [
//                         {
//                             name: 'Temp',
//                             type: 'spline',
//                             data: temperature,
//                             color: '#90ee90',
                            
//                           }
                
                      
//                     ]
//                   });


//                 }
//               )

//   }, [growernamer])
//   return (
//     <div  >

//       <div className='highcharts-figure'>
//         <div className=' text-center'  id="tempcontainer"></div>
//       </div>

//     </div>
//   );
// };
// export default Tempchart;
