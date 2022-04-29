// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment, useState, useEffect, useContext } from 'react'
import Basemap from '../map/basemap'
// ** Third Party Components
import axios from 'axios'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import Chart from '../map/chart'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'


// ** Utils
import { selectThemeColors } from '@utils'

import { MessageSquare } from 'react-feather'

// ** Custom Components
import Sidebar from '../BlogSidebar'
import Avatar from '@components/avatar'
import Breadcrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  Badge, Label
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'
import { useSkin } from '@hooks/useSkin'

const BlogList = () => {
  // ** States
  const [data, setData] = useState(null)
  const [picker, setPicker] = useState(new Date())
  const [search, setSearch] = useState(null)
  const { } = useContext(ThemeColors),
    { skin } = useSkin(),
    labelColor = skin === 'dark' ? '#b4b7bd' : '#6e6b7b',
    gridLineColor = 'rgba(200, 200, 200, 0.2)',
    lineChartPrimary = '#666ee8',
    lineChartDanger = '#ff4961',
    warningColorShade = '#ffbd1f'

  useEffect(() => {
    axios.get('/blog/list/data').then(res => setData(res.data.slice(0, 1)))
  }, [])


  const renderRenderList = () => {
    return data.map(item => {
      return (
        <Col key={item.title} md='12'>
          <Card>
         < Basemap />
            <CardBody>


              <Row>
                <Col md={4}>
                  <Label className='form-label'>Index</Label>
                  <Select
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'

                    isClearable={false}
                  />
                  <Label className='form-label mt-1' for='date-time-picker'>
                    Start Date
                  </Label>
                  <Flatpickr
                    value={picker}
                    data-enable-time
                    id='date-time-picker'
                    className='form-control'
                    onChange={date => setPicker(date)} />

                  <Label className='form-label mt-1' for='date-time-picker'>
                    End Date
                  </Label>
                  <Flatpickr
                    value={picker}
                    data-enable-time
                    id='date-time-picker'
                    className='form-control'
                    onChange={date => setPicker(date)} />

                  <Label className='form-label mt-1'>Weather Data</Label>
                  <Select
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'

                    isClearable={false}
                  />
                </Col>
                <Col md={8}>
               < Chart />
                </Col>

              </Row>
            </CardBody>
          </Card>
        </Col>
      )
    })
  }

  return (
    <Fragment>

      <div className='blog-wrapper'>
        <div className='content-detached content-left'>
          <div className='content-body'>
            {data !== null ? (
              <div className='blog-list-wrapper'>
                <Row>{renderRenderList()}</Row>

              </div>
            ) : null}
          </div>
        </div>
        <Sidebar search={setSearch}/>
      </div>
    </Fragment>
  )
}

export default BlogList
