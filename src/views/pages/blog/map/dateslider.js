import HorizontalSlider from 'react-horizontal-slider'
export default ()=>{
 //other logic
    return(
        <>
 <HorizontalSlider
        title="Menu 1"
        data={items1}
        height={300}
        width={300}
        id={1} 
        />
    //You can add Multiple Sliders if you want    
   <HorizontalSlider
        title="Menu 2"
        data={items2}
        height={400}
        width={350}
        id={2} 
        />
        
        
        </>
    
    );
   }
