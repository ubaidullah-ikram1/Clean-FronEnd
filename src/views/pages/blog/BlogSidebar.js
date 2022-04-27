// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import CardAction from '@components/card-actions'

// ** Third Party Components


import * as Icon from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { InputGroup, Input, InputGroupText, Card, CardHeader, CardTitle, CardBody, CardText, Button } from 'reactstrap'

const BlogSidebar = () => {
  // ** States

  const CategoryColorsArr = {
    Quote: 'light-info',
    Fashion: 'light-primary',
    Gaming: 'light-danger',
    Video: 'light-warning',
    Food: 'light-success'
  }

  return (
    <div className='sidebar-detached sidebar-right'>
      <div className='sidebar'>
        <div className='blog-sidebar right-sidebar my-1 my-lg-0'>
          <div className='right-sidebar-content'>
            <div className='blog-search'>
              <InputGroup className='input-group-merge'>
                <Input placeholder='Search here' />
                <InputGroupText>
                  <Icon.Search size={14} />
                </InputGroupText>
              </InputGroup>
            </div>
            <Card className='business-card mt-2'>
              <CardHeader className='pb-1'>
                <CardTitle tag='h4'>Fields</CardTitle>
                <Icon.Edit size={18} className='cursor-pointer' />
              </CardHeader>
              <CardBody>
                <CardText>US Demo Field</CardText>
                <span>10.5 ha</span>
                <br />
                <span >39.5119° N 122.0711° W</span>


              </CardBody>
            </Card>
            <Card className='business-card'>
              <CardHeader className='pb-1'>
                <CardTitle >Crop rotate <Icon.Info size={12} className='cursor-pointer' /></CardTitle>
                <p className='mt-1'>Show more</p>
              </CardHeader>

            </Card>
            <CardAction title='Current weather' actions='collapse'>
              <CardBody className='pt-0'>

                <CardText>
                  Apr 27, 2022, 00:00 - 01:00
                </CardText>

              </CardBody>
            </CardAction>

          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar
