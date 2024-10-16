import { Fragment } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { PhoneCall } from 'react-feather'

const ContactUsModal = ({ show, setShow }) => {
  const ContactNumber = ({ name, number }) => {
    return (
      <div className="d-flex w-50 my-2 justify-content-between m-auto">
        <div>{name}</div>
        <div className="text-primary">
          <PhoneCall size={15} color="purple" className="me-2" />
          {number}
        </div>
      </div>
    )
  }

  return (
    <Fragment>
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg">
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className=" d-flex flex-column text-center mb-2">
            <h1 className="mb-1">Contact Us</h1>
            <p>For any queries you can contact by using the following information.</p>
          </div>
          <div>
            <ContactNumber name="Furqan" number="+923080464784" />
            <ContactNumber name="Taha" number="+923179834311" />
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default ContactUsModal
