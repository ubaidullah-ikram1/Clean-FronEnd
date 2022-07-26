// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment, useState, useEffect, useLayoutEffect, useContext } from 'react'
import Basemap from '../map/basemap'

// ** Third Party Components
// import axios from 'axios'
import { ThemeColors } from '@src/utility/context/ThemeColors'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import Sidebar from '../BlogSidebar'
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
  Button,
  CardImg,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Badge, Label, Input, UncontrolledPopover, PopoverHeader, PopoverBody
} from 'reactstrap'
// ** Styles
import '@styles/base/pages/page-blog.scss'
import * as Icon from 'react-feather'
import { useSkin } from '@hooks/useSkin'
import basemap from '../map/basemap'
const BlogList = () => {
  // ** States
  const [picker, setPicker] = useState(new Date())
  const { } = useContext(ThemeColors),
    { skin } = useSkin()
  return (
    <Fragment>
      <div className='blog-wrapper'>
        <div className='content-detached content-left'>
          <div className='content-body'>
           <Basemap/>
          </div>
        </div>
        <Sidebar  />
      </div>
    </Fragment>
  )
}
export default BlogList
