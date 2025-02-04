import { memo, useState } from "react";

// ** Bootsrap components
import {
  FormGroup,
  Row,
  Col,
  Input,
  Button,
  Label,
  FormText,
} from "reactstrap";

// ** Icons from react-feather
import { Plus } from "react-feather";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { ADD_FAQS_BY_ID, GET_FAQS_BY_ID } from "@store/actions/faqs";
import EditorCom from "../../../../@core/components/editor";

const AddFaqs = () => {
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(
    window?.location.search.split("?")[1]
  );
  const test_id = searchParams.get("itemId");
  const [loading, setLoading] = useState(false);

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

  const formik = useFormik({
    initialValues: {
      faq_title: "",
      faq_description: "",
      test_id,
    },
    validate: validateOrg,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      let res = await dispatch(ADD_FAQS_BY_ID(values));
      if (res?.success) {
        resetForm({ aq_title: "", faq_description: "", test_id: "" });
        dispatch(GET_FAQS_BY_ID(test_id));
      }
    },
  });

  const getContent = (htmlContentProp, name) => {
    formik.setFieldValue(name, htmlContentProp);
    // setPayload({ ...payload, [name]: htmlContentProp });
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md="3" sm="3">
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
                <span className="text-danger">{formik.errors.faq_title}</span>
              ) : null}
            </FormGroup>
          </Col>
          <Col md="7" sm="7">
            <FormGroup>
              <Label for="faq_description">
                Faq Description{" "}
                <span className="text-danger">
                  <sup>
                    <b>*</b>
                  </sup>
                </span>
              </Label>
              <EditorCom getContent={getContent} name="faq_description" />
              {/* <Input
                type="text"
                name="faq_description"
                id="faq_description"
                placeholder="Faq Description"
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
              Add
            </Button.Ripple>
          </Col>
        </Row>
      </form>
    </>
  );
};
export default memo(AddFaqs);
