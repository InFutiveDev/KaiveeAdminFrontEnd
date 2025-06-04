import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from 'reactstrap'
import { Trash } from 'react-feather'
import { getNotificationCategories, deleteNotificationCategory } from '../../../../redux/actions/notification/category'

const DeleteCategory = ({ row }) => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { globalLoading } = state.loading

  const handleDelete = async () => {
    const result = await dispatch(deleteNotificationCategory(row?._id))
    if (result.success) {
      dispatch(getNotificationCategories())
      setOpen(false)
    }
  }

  return (
    <>
      <Trash size={20} cursor="pointer" className='text-danger' onClick={() => setOpen(!open)} />
      <Modal isOpen={open} toggle={() => setOpen(!open)}>
        <ModalHeader toggle={() => setOpen(!open)}>
          Delete Category
        </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this category?</p>
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

export default DeleteCategory 