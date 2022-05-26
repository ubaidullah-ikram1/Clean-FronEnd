import { useEffect, useState,useLayoutEffect } from 'react'
import RangeSlider from 'react-bootstrap-range-slider';
import { cloudcoverstore } from '../../store/cloudcoverstore';
// import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
 function Cloudcoverslider(){
    
  const[clouddate,setClouddate]=useState( cloudcoverstore.getState())
  
    useLayoutEffect(()=>{
      
        cloudcoverstore.subscribe(()=>{ 
            setClouddate(cloudcoverstore.getState() )
          })
      })
      useEffect(() => { 
        console.log('clou',clouddate)
      },[clouddate])
return (
    <>
   { clouddate ?
     <RangeSlider 
     variant='success'
      value={parseInt(clouddate)}
      tooltip='on'
      
      tooltipLabel={() => 'Cloud_Cover ' + " : "+ parseInt(clouddate) + "%"}
      
     /> : <></> 
    }
     </>
   
)
 }
 export default Cloudcoverslider;
 