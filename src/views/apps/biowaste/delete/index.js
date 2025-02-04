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

import {
  DELETE_BIOWASTE_BY_ID,
  DELETE_LANDING_BY_ID,
} from "../../../../redux/constant";
import {
  DELETE_LANDING_BY_ADMIN,
  GET_ALL_LANDINGS,
} from "../../../../redux/actions/ladningPage";
import {
  DELETE_BIOWASTE_BY_ADMIN,
  GET_ALL_BIOWASTES,
} from "../../../../redux/actions/biowaste";

const DeleteBioWaste = ({ row }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { globalLoading } = state.loading;
  const { bioWaste } = state.biowaste;
  const pagination = bioWaste?.pagination;
  console.log("|bioWaste", bioWaste);
  // const { hebitData } = state.habit.Habits;
  const handleDelete = async () => {
    const res = await dispatch(DELETE_BIOWASTE_BY_ADMIN(row?._id));
    if (res.success) {
      const rm = bioWaste?.wasteData?.filter((item) => item?._id !== row?._id);
      dispatch({
        type: DELETE_BIOWASTE_BY_ID,
        data: {
          // data: {
          wasteData: rm,
          pagination: {
            limit: pagination.limit,
            offset: pagination.offset,
            total: pagination.total - 1,
          },
          // },
        },
      });
      // dispatch({
      //   type: DELETE_BIOWASTE_BY_ID,
      //   data: res,
      // });
      // dispatch(GET_ALL_BIOWASTES(1));
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
        <ModalHeader toggle={() => setOpen(!open)}>
          Delete Bio Waste
        </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this Bio Waste?</p>
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

export default DeleteBioWaste;
