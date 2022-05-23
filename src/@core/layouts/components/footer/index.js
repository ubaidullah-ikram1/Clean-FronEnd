// ** Icons Import
import { Heart } from 'react-feather'
import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap'

const Footer = () => {
  const [centeredModal, setCenteredModal] = useState(false)

  return (
    <div>
      <div className='vertically-centered-modal'>

        <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered modal-lg'>
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Privacy Policy</ModalHeader>
          <ModalBody>
            <iframe src="https://bakhabarkissan.com/policy/" height="300vh" width="100%" title="Iframe Example"></iframe>
          </ModalBody>

        </Modal>
      </div>

      <p className='clearfix mb-0'>

        <span className='float-md-start d-block d-md-inline-block mt-25'>

          Ba-Khabar Kissan Pvt Ltd. (c) {new Date().getFullYear()}{'Copy right.'}
          <a style={{ color: 'green', cursor: 'pointer' }} onClick={() => setCenteredModal(!centeredModal)}>Privacy Statement
          </a>
          <span className='d-none d-sm-inline-block'>, All rights Reserved</span>
        </span>
        {/* <span className='float-md-end d-none d-md-block'>
        Hand-crafted & Made with
        <Heart size={14} />
      </span> */}
      </p>
    </div>
  )
}

export default Footer
