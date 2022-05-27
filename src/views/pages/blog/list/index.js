// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment, useState, useEffect, useLayoutEffect, useContext } from 'react'
import Basemap from '../map/basemap'
import Timeline from '@components/timeline'
import classnames from 'classnames'
import moment from 'moment'
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
import { indexsel } from '../../store/indexselect'
import { Spinner } from 'reactstrap'
import Tempchart from '../map/chart/tempcheck'
import AudioRecorder from './AudioRecorder'
import { basicData } from './data'
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

const BlogList = () => {
  // ** States
  const [isloading, setIsloading] = useState(false)
  const [showGraph, setshowGraph] = useState(false)
  const [data, setData] = useState(null)
  const [advisoryData, setadvisoryData] = useState(null)
  const [picker, setPicker] = useState(new Date())
  const [search, setSearch] = useState(null)
  const [mapHeight, setmapHeight] = useState('85vh')
  const [centeredModal, setCenteredModal] = useState(false)
  const [centeredModalVoice, setcenteredModalVoice] = useState(false)
  const [advisoryTimeline, setadvisoryTimeline] = useState(false)
  const [select, setSelect] = useState(null)
  const [temchek, setTemchek] = useState(false);
  const [indexselect, setIndexselect] = useState(indexsel.getState())
  const [value, setValue] = useState('')
  const { } = useContext(ThemeColors),
    { skin } = useSkin()

  const options = [
    { value: 'NDVI', label: 'NDVI' },
    { value: 'NDMI', label: 'NDMI' },
  ]

  const getAdvisoryList = async (sowingdate) => {
    console.log(sowingdate)


    const res = await axios.get("https://gistest.bkk.ag/advisory_timeline/sms")

    const newObj = res.data.map(item => {
      return {
        content: item.Text,
        meta: item.aftersowing,
        date: (moment(sowingdate, "YYYY-MM-DD").add(parseInt(item.numberofdays), 'days').format('DD-MM-YYYY'))
      };
    });

    setadvisoryData(newObj)
  }
  useEffect(() => {
    axios.get('/blog/list/data').then(res => setData(res.data.slice(0, 1)))
    getAdvisoryList()
  }, [])
  const tempcheck = () => {

    setTemchek(!temchek)

  };

  useLayoutEffect(() => {
    indexsel.subscribe(() => {
      setIndexselect(indexsel.getState())
      console.log('action', indexselect)
    })
  })
  const renderRenderList = () => {
    console.log('select', select)
    return data.map(item => {
      return (

        <Col className='p-0 m-0' style={{ width: '100%' }} key={item.title} md='12' lg='12'>
          {<Basemap mapHeight={mapHeight} />}

          <div className='vertically-centered-modal'>

            <Modal scrollable isOpen={advisoryTimeline} toggle={() => setadvisoryTimeline(!advisoryTimeline)} className='modal-dialog-centered'>
              <ModalHeader toggle={() => setadvisoryTimeline(!advisoryTimeline)}>Advisory  Message </ModalHeader>

              <ModalBody>

                <div class="d-flex justify-content-between">
                  <div>

                  </div>
                  <div>
                    <button disabled type="button" class="btn btn-primary">Send</button>
                  </div>
                </div>

                <hr />
                <Timeline data={advisoryData} />
              </ModalBody>

            </Modal>
          </div>

          <div className='vertically-centered-modal'>

            <Modal isOpen={centeredModalVoice} toggle={() => setcenteredModalVoice(!centeredModalVoice)} className='modal-dialog-centered'>
              <ModalHeader toggle={() => setcenteredModalVoice(!centeredModalVoice)}>Record  Message</ModalHeader>
              <ModalBody>
                <AudioRecorder />

              </ModalBody>
              <ModalFooter>
                <Button color='primary' onClick={() => setcenteredModalVoice(!centeredModalVoice)}>
                  Send
                </Button>{' '}
              </ModalFooter>
            </Modal>
          </div>
          <div className='vertically-centered-modal'>

            <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered'>
              <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Enter Message</ModalHeader>
              <ModalBody>

                <Input
                  name='text'
                  value={value}
                  type='textarea'
                  id='exampleText'
                  placeholder='Message'
                  style={{ minHeight: '100px' }}
                  onChange={e => setValue(e.target.value)}
                  className={classnames({ 'text-danger': value.length > 20 })} />
              </ModalBody>
              <ModalFooter>
                <Button color='primary' onClick={() => setCenteredModal(!centeredModal)}>
                  Send
                </Button>{' '}
              </ModalFooter>
            </Modal>
          </div>

          {showGraph && <Card className='p-0 m-0'>
            <CardHeader >
              <div className='d-flex align-items-center'>
                <CardTitle tag='h4'>Analytics</CardTitle>
              </div>
              {/* <div className='form-check form-check-inline'>
                <Input type='checkbox' onChange={tempcheck} id='basic-cb-checked' />
                <Label for='basic-cb-checked' className='form-check-label'>
                  Checked
                </Label>
              </div> */}
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
                      options={{ altFormat: 'Y', dateFormat: "m.y" }}

                      className='form-control'
                      onChange={date => setPicker(date)} />

                    <Label className='form-label mt-1' for='date-time-picker'>
                      End Date
                    </Label>
                    <Flatpickr
                      value={picker}
                      options={{ altFormat: 'Y', dateFormat: "m.y", showDays: false }}

                      className='form-control'
                      onChange={date => setPicker(date)} />

                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div class="d-flex justify-content-center mt-1">
                      <Button color='primary'>Apply</Button>

                    </div>
                  </Col>
                </Row>
              </PopoverBody>
            </UncontrolledPopover>




            {indexselect == 'Avg NDMI' ? <NDMIdateslider /> : <></>}
            {indexselect == 'Avg NDVI' ? <NDVIdateslider /> : <></>}





            <div style={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}> {isloading ? <Spinner className='me-25' size='lg' color='success' /> : <></>}</div>
            < Chart setIsloading={setIsloading} />
            {/* {temchek ?   <Tempchart /> : <></> } */}


          </Card>
          }
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
        <Sidebar getAdvisoryList={getAdvisoryList} setadvisoryTimeline={setadvisoryTimeline} setCenteredModal={setCenteredModal} setcenteredModalVoice={setcenteredModalVoice} search={setSearch} setIsloading={setIsloading} setshowGraph={setshowGraph} setmapHeight={setmapHeight} />
      </div>
    </Fragment>
  )
}

export default BlogList
