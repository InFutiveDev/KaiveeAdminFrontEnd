import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "reactstrap"
import { Trash } from "react-feather"
import { getNotifications, deleteNotification } from "../../../../redux/actions/notification/notification"

const DeleteNotification = ({ row }) => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { globalLoading } = state.loading

  const handleDelete = async () => {
    const result = await dispatch(deleteNotification(row?._id))
    if (result.success) {
      dispatch(getNotifications())
      setOpen(false)
    }
  }

  return (
    <>
      <Trash size={20} cursor="pointer" className='text-danger' onClick={() => setOpen(!open)} />
      <Modal isOpen={open} toggle={() => setOpen(!open)}>
        <ModalHeader toggle={() => setOpen(!open)}>
          Delete Notification
        </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this Notification?</p>
        </ModalBody>
        <ModalFooter>
          <Button disabled={globalLoading} onClick={handleDelete} color='danger'>
            {globalLoading ? (
              <Fragment>
                <Spinner size='sm' />
                <span className='ml-50'>Loading...</span>
              </Fragment>
            ) : (
              <span>Delete</span>
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default DeleteNotification