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
import { selectThemeColors } from '@utils'
import Sidebar from '../BlogSidebar'
import NDVIdateslider from '../map/NDVIdateslider'
import { indexselection } from '../../store/indexselection'
import NDMIdateslider from '../map/NDMIdateslider'
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
  CardImg,
  Badge, Label, Input, UncontrolledPopover, PopoverHeader, PopoverBody
} from 'reactstrap'
// ** Styles
import '@styles/base/pages/page-blog.scss'
import * as Icon from 'react-feather'
import { useSkin } from '@hooks/useSkin'

const BlogList = () => {
  // ** States
  const [data, setData] = useState(null)
  const [picker, setPicker] = useState(new Date())
  const [search, setSearch] = useState(null)
  const [select, setSelect] = useState(null)
  const { } = useContext(ThemeColors),
    { skin } = useSkin(),
    labelColor = skin === 'dark' ? '#b4b7bd' : '#6e6b7b',
    gridLineColor = 'rgba(200, 200, 200, 0.2)',
    lineChartPrimary = '#666ee8',
    lineChartDanger = '#ff4961',
    warningColorShade = '#ffbd1f'

  const options = [
    { value: 'NDVI', label: 'NDVI' },
    { value: 'NDMI', label: 'NDMI' },
  ]
  useEffect(() => {
    axios.get('/blog/list/data').then(res => setData(res.data.slice(0, 1)))
  }, [])
  useEffect(() => {

  }, [])
  const renderRenderList = () => {
    console.log('select', select)
    return data.map(item => {
      return (

        <Col style={{ width: '100%' }} key={item.title} md='12' lg='12'>
          < Basemap />

          <Card><CardHeader>
            <div className='d-flex align-items-center'>
              <CardTitle tag='h4'>Crop Timeline</CardTitle>
            </div>

            <Icon.Filter id='popClick' size={18} className='cursor-pointer' />
          </CardHeader>
            <UncontrolledPopover trigger='click' placement='top' target='popClick'>
              <PopoverHeader>Apply Filters</PopoverHeader>
              <PopoverBody>
                <Row>
                  <Col md={12}>


                    <Label className='form-label'>Index</Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      options={options}
                      isClearable={false}
                      onChange={(e) => {
                        setSelect(e.label)
                        select ? indexselection.dispatch({ type: 'index', index: select }) : <></>
                      }}
                    >
                    </Select>
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
                  </Col>
                </Row>
              </PopoverBody>
            </UncontrolledPopover>


            {
              select == 'NDVI' ? <NDVIdateslider /> : <></>
            }
            {select == 'NDMI' ? <NDMIdateslider /> : <></>}


            <CardBody>
              <Row>

                <Col md={12}>
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
          <div  className='content-body'>
            {data !== null ? (
              <div className='blog-list-wrapper'>
                <Row>{renderRenderList()}</Row>

              </div>
            ) : null}
          </div>
        </div>
        <Sidebar search={setSearch} />
      </div>
    </Fragment>
  )
}

export default BlogList
