import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { accessImagesOrVideo } from '@utils'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "reactstrap";
import { Trash } from "react-feather";
import {
  DELETE_ADMIN_MANAGE,
  GET_ADMIN_MANAGE,
} from "../../../../redux/actions/adminManage";

const DeleteManage = ({ row }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { globalLoading } = state.loading;

  const handleDelete = async () => {
    const res = await dispatch(DELETE_ADMIN_MANAGE(row?._id));
    if (res.success) {
      dispatch(GET_ADMIN_MANAGE(1, ""));
    }
    setOpen(false);
  };

  return (
    <>
      <Trash
        size={20}
        cursor="pointer"
        className="text-danger"
        onClick={() => setOpen(!open)}
              />
      <Modal isOpen={open} toggle={() => setOpen(!open)}>
        <ModalHeader toggle={() => setOpen(!open)}>Delete Record</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this Record</p>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={globalLoading}
            onClick={handleDelete}
            color="danger"
          >
            {globalLoading ? (
              <Fragment>
                <Spinner size="sm" />
                <span className="ml-50">Loading...</span>
              </Fragment>
            ) : (
              <span>Delete</span>
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default DeleteManage;
