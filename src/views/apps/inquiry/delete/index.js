import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "reactstrap";
import { Trash } from "react-feather";
import { DELETE_TEST_BY_ADMIN } from "../../../../redux/actions/test";
import { DELETE_INQUIRY_BY_ADMIN } from "../../../../redux/actions/inquiry";

const Delete = ({ row }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { globalLoading } = state.loading;
  const {
    inquiries: { data },
  } = state.inquiry;
  const pagination = data?.pagination;
  const handleDelete = async () => {
    const res = await dispatch(DELETE_INQUIRY_BY_ADMIN(row?._id));
    if (res.success) {
      const rm = data?.inquiryData.filter((item) => item?._id !== row?._id);
      console.log("res-->", res);
      dispatch({
        type: "GET_ALL_INQUIRIES",
        data: {
          data: {
            inquiryData: rm,
            pagination: {
              limit: pagination.limit,
              offset: pagination.offset,
              total: pagination.total - 1,
            },
          },
        },
      });
      setOpen(false);
    }
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
        <ModalHeader toggle={() => setOpen(!open)}>Delete Inquiry</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this Inquiry</p>
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

export default Delete;
