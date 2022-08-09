// ** React Imports

import { useEffect, useLayoutEffect, useState } from 'react'
// ** Reactstrap Imports
import { Card, CardBody, CardText, Col, Input,Label, InputGroup, InputGroupText, Row, UncontrolledTooltip, Button,Form } from 'reactstrap'
// ** Third Party Components
import { x1data,x2data,y1data,y2data } from './store/inputdata'

const BlogSidebar = (props) => {
  // ** States

 
  const[x1, setX1] = useState();
  const[y1, setY1] = useState();
  const[x2, setX2] = useState();
  const[y2, setY2] = useState(); 
    function x1value(e) {
      setX1(e.target.value )
    }
    function y1value(e) {
      setY1(e.target.value )
  }
  function x2value(e) {
    setX2(e.target.value )
}
function y2value(e) {
  setY2(e.target.value )
}
function triger(){
  x1? x1data.dispatch({ type: 'input', input: x1 }) : <></>
  x2data.dispatch({ type: 'input', input: x2 })
  y1data.dispatch({ type: 'input', input: y1 })
  y2data.dispatch({ type: 'input', input: y2 })
}
  

  return (
    <div className='sidebar-detached sidebar-right'>
      <div className='sidebar'>
        <div className='blog-sidebar right-sidebar my-0 my-lg-0'>
          <div className='right-sidebar-content'>
            <Card className='card-transaction' >



            <Form action = "http://localhost:4000/"  method = "POST">
              <CardBody>
                <h6 style={{ textAlign: 'center', color: 'green' }}>Reactangle</h6>
               
                <Row className='mt-2'>
                
            <Label className='form-label' for='basicInput'>
              X1
            </Label>
            <Input onChange={x1value} type='email' id='basicInput' placeholder='Enter X1' />
                </Row>
                <Row className='mt-2'>
            <Label className='form-label' for='basicInput'>
              Y1
            </Label>
            <Input onChange={y1value} type='email' id='basicInput' placeholder='Enter Y1' />
                </Row>
                <Row className='mt-2'>
            <Label className='form-label' for='basicInput'>
              X2
            </Label>
            <Input   onChange={x2value} type='email' id='basicInput' placeholder='Enter X2' />
                </Row>
                <Row className='mt-2'>
            <Label className='form-label' for='basicInput'>
            Y2
            </Label>
            <Input  onChange={y2value} type='email' id='basicInput' placeholder='Enter Y2' />
                </Row>
                <Row className='mt-2'>
         <Button type='submit' onClick={triger} className='btn-success' >Filter</Button>
         
                </Row>
              </CardBody>
              </Form>

            </Card>
        
            

                    </div>

        </div>
      </div>
    </div>
  )
}
export default BlogSidebar
