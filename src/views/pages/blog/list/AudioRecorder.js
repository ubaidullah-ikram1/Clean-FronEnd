import { useReactMediaRecorder } from "react-media-recorder";
import React, { useEffect, useState, Fragment } from "react";
import { Button, Row, Col } from 'reactstrap'
import * as Icon from 'react-feather'
// import DoneIcon from '@material-ui/icons/Done';
// import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

const RecordView = (props) => {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);



  function stopTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond("00");
    setMinute("00");
  }

  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true,
    onStop: (blobUrl, blob) => {

      const url = URL.createObjectURL(blob)
      if (blob) {

        // props?.setaudioblob(blob)
      }



    }
  });







  const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.mediaBlobUrl);

      reader.onload = () =>
        resolve({
          fileName: file.title,
          base64: reader.result
        });
      reader.onerror = reject;
    });

  return (

    <Fragment>
      <Row style={{ marginTop: "15%" }}>


        <Col md={12} align="center" >
          <div style={{ fontSize: "15px" }}>
            <span >{minute}</span>
            <span>:</span>
            <span >{second}</span>
            <span >/00:30</span>
          </div>


          <Col md={3}  >
            <div style={{ border: "1px solid grey", padding: '6px', borderRadius: !isActive ? '50%' : '0%' }}>
              <div style={{ backgroundColor: 'red', width: '100px', height: '100px', borderRadius: !isActive ? '50%' : '0%' }} onClick={() => {
                if (!isActive) {
                  startRecording();
                } else {
                  pauseRecording();
                }
                setIsActive(!isActive);
              }} >

              </div>


            </div>

          </Col>
          <Row>


            <Col md={6} style={{ marginTop: '1vh' }}  >
              {isActive && <Icon.X size={25} onClick={stopTimer} fontSize="large" style={{ color: 'red' }} />}
            </Col>
            <Col md={6} style={{ marginTop: '1vh' }} >
              {isActive && <Icon.Check size={25} onClick={() => {
                stopRecording();
                stopTimer()
              }} fontSize="large" style={{ color: 'green' }} />}

            </Col>
          </Row>

        </Col>

        <Col md={12} align="center" style={{ margin: '2vh', height: '10vh' }}>
          <div style={{ height: "38px" }}>

            {mediaBlobUrl && <audio src={mediaBlobUrl} controls loop />}
          </div>
        </Col>


      </Row>

    </Fragment>

  );
};
export default RecordView;
