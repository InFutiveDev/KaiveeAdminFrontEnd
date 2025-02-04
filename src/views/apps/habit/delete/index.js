import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "reactstrap"
import { Trash } from "react-feather"
import { DELETE_HEBIT_BY_ADMIN, GET_ALL_HEBITS } from "../../../../redux/actions/habit"
import { DELETE_HABIT_BY_ID, GET_ALL_HEBIT } from "../../../../redux/constant"

const DeleteHabit = ({ row }) => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { globalLoading } = state.loading
  const {hebitData} = state.habit.Habits
  const handleDelete = async () => {
    const res = await dispatch(DELETE_HEBIT_BY_ADMIN(row?._id))
    if (res.success) {
      dispatch({
        type: DELETE_HABIT_BY_ID,
        data: res
      })
      dispatch(GET_ALL_HEBITS(1))
    }
    setOpen(false)
  }
  return (
    <>
      <Trash size={20} cursor="pointer" className='text-danger' onClick={() => setOpen(!open)} />
      <Modal isOpen={open} toggle={() => setOpen(!open)}>
        <ModalHeader toggle={() => setOpen(!open)}>
          Delete Habit
        </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this Habit?</p>
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

export default DeleteHabit