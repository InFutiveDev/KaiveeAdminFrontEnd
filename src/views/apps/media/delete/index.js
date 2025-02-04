import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "reactstrap"
import { Trash } from "react-feather"
import {  GET_ALL_MEDIA } from "../../../../redux/actions/media"
import { DELETE_MEDIA_BY_ID } from "../../../../redux/constant"
import { DELETE_MEDIA_BY_ADMIN } from "../../../../redux/actions/media"

const DeleteMedia = ({ row }) => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { globalLoading } = state.loading
  const {bannerData} = state.media.media
  const handleDelete = async () => {
    const res = await dispatch(DELETE_MEDIA_BY_ADMIN(row?._id))
    if (res.success) {
      dispatch({
        type: DELETE_MEDIA_BY_ID,
        data: res
      })
      dispatch(GET_ALL_MEDIA(1))
    }
    setOpen(false)
  }
  return (
    <>
      <Trash size={20} cursor="pointer" className='text-danger' onClick={() => setOpen(!open)} />
      <Modal isOpen={open} toggle={() => setOpen(!open)}>
        <ModalHeader toggle={() => setOpen(!open)}>
          Delete Media
        </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this Media?</p>
        </ModalBody>
        <ModalFooter>
          <Button disabled={globalLoading} onClick={handleDelete} color='danger'>
            {globalLoading ? <Fragment>
              <Spinner size='sm' />
              <span className='ml-50'>Loading...</span>
            </Fragment> : <span>Delete</span>}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default DeleteMedia