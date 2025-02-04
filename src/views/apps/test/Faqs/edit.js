import { memo, useState } from "react";

// ** Bootsrap components
import {
  FormGroup,
  Row,
  Col,
  Input,
  Button,
  Label,
  Modal,
  ModalBody,
} from "reactstrap";

// ** Icons from react-feather
import { Edit2, Plus } from "react-feather";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { UPDATE_FAQS_BY_ID, GET_FAQS_BY_ID } from "@store/actions/faqs";
import EditorCom from "../../../../@core/components/editor";

const EditFaqs = ({ row }) => {
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(
    window?.location.search.split("?")[1]
  );
  const test_id = searchParams.get("itemId");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const validateOrg = (orgData) => {
    const errors = {};
    if (!orgData?.faq_title) {
      errors.faq_title = "Enter Title";
    }
    if (!orgData?.faq_description) {
      errors.faq_description = "Enter Description";
    }
    return errors;
  };
  // console.log(row)

  const formik = useFormik({
    initialValues: {
      faq_title: row?.faq_title || "",
      faq_description: row?.faq_description || "",
      test_id,
    },
    validate: validateOrg,
    onSubmit: async (values) => {
      setLoading(true);
      let res = await dispatch(UPDATE_FAQS_BY_ID(values, row?._id));
      if (res?.success) {
        dispatch(GET_FAQS_BY_ID(test_id));
        setOpen(false);
      }
      setLoading(false);
    },
  });
  const getContent = (htmlContentProp, name) => {
    formik.setFieldValue(name, htmlContentProp);
  };

  return (
    <>
      <Edit2 color="red" onClick={() => setOpen(!open)} />
      <Modal isOpen={open} toggle={() => setOpen(!open)}>
        <ModalBody>
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md="12" sm="12">
                <FormGroup>
                  <Label for="faq_title">
                    Faq Title{" "}
                    <span className="text-danger">
                      <sup>
                        <b>*</b>
                      </sup>
                    </span>
                  </Label>
                  <Input
                    type="text"
                    name="faq_title"
                    id="faq_title"
                    placeholder="Faq Title "
                    value={formik.values.faq_title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.faq_title && formik.errors.faq_title ? (
                    <span className="text-danger">
                      {formik.errors.faq_title}
                    </span>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md="12" sm="12">
                <FormGroup>
                  <Label for="faq_description">
                    Faq Description{" "}
                    <span className="text-danger">
                      <sup>
                        <b>*</b>
                      </sup>
                    </span>
                  </Label>
                  <EditorCom
                    getContent={getContent}
                    dvalue={formik.values?.faq_description || ""}
                    name="faq_description"
                  />
                  {/* <Input
                                        type='text'
                                        name='faq_description'
                                        id='faq_description'
                                        placeholder='Faq Description'
                                        value={formik.values.faq_description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    /> */}
                  {formik.touched.faq_description &&
                  formik.errors.faq_description ? (
                    <span className="text-danger">
                      {formik.errors.faq_description}
                    </span>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md="2" sm="2">
                <Button.Ripple
                  disabled={loading}
                  type="submit"
                  className="mt-2"
                  color="primary"
                >
                  <Plus size={16} className="mr-1" />
                  Update
                </Button.Ripple>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default memo(EditFaqs);
