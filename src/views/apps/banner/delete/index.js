import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "reactstrap"
import { Trash } from "react-feather"
import { DELETE_BANNER_BY_ADMIN } from "../../../../redux/actions/banner"

const Delete = ({ row }) => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { globalLoading } = state.loading
  const { banners: { data } } = state.banner
  const pagination = data?.pagination
  const handleDelete = async () => {
    const res = await dispatch(DELETE_BANNER_BY_ADMIN(row?._id))
    if (res.success) {
      const rm = data?.bannerData?.filter(item => item?._id !== row?._id)
      dispatch({
        type: 'GET_ALL_BANNERS',
        data: {
          data: {
            bannerData: rm,
            pagination: { limit: pagination.limit, offset: pagination.offset, total: pagination.total - 1 }
          }
        }
      })
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
          <p>Are you sure you want to delete this Banner?</p>
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

export default Delete