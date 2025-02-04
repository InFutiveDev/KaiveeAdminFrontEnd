import { memo, useState, Fragment } from "react";

// ** Bootsrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Button,
  Label,
  Spinner,
  CustomInput,
} from "reactstrap";

// ** Icons from react-feather
import { ArrowLeft } from "react-feather";
// ** React routings method  or component
import { useHistory } from "react-router-dom";

// ** redux hools and store
import { useDispatch } from "react-redux";

import { CheckObjectValidation } from "../../../../utility/Utils";
import { ADD_BANNER_BY_ADMIN } from "../../../../redux/actions/banner";

// ** Utils funtion to check validation

const AddBanner = () => {
  // ** redux hools and store
  const dispatch = useDispatch();
  // ** states
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [errorKeyName, setErrorKeyName] = useState("");
  const [payload, setPayload] = useState({
    banner_name: "",
    banner_image: "",
    position: "",
  });

  const handleFiles = async (e) => {
    const { name, files } = e.target;
    const imageUrl = URL.createObjectURL(files[0]);
    setPayload({ ...payload, [name]: files[0], image_url: imageUrl });
  };

  const hanleInputBase = (e) => {
    const { name, value } = e.target;
    if (errorKeyName === name) {
      setErrorKeyName("");
    }
    setPayload({ ...payload, [name]: value });
  };

  const handleSubmit = async () => {
    const checkValidation = CheckObjectValidation(payload, ["position"]);
    setErrorKeyName(checkValidation.keyname);
    if (checkValidation.isvalid) {
      setLoading(true);
      const res = await dispatch(ADD_BANNER_BY_ADMIN(payload));
      if (res?.success) {
        history.push("/apps/banner/all");
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Card>
        <CardHeader className="w-100">
          <div className="w-100 d-flex align-items-center justify-content-between">
            <h4>Add Banner</h4>
            <Button.Ripple
              onClick={() => {
                history.goBack();
              }}
              color="primary"
              outline
            >
              <ArrowLeft size={16} className="mr-1" />
              Back
            </Button.Ripple>
          </div>
        </CardHeader>

        <CardBody>
          <Row>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="banner_name">
                  Banner Name{" "}
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="text"
                  name="banner_name"
                  id="banner_name"
                  placeholder="Enter Banner Name"
                  value={payload?.banner_name}
                  onChange={hanleInputBase}
                />
                {errorKeyName === "banner_name" ? (
                  <span className="text-danger">Banner Name is Required</span>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label for="position">Position </Label>
                <Input
                  type="number"
                  name="position"
                  id="position"
                  placeholder="Enter Position"
                  value={payload?.position}
                  onChange={hanleInputBase}
                />
              </FormGroup>
              <FormGroup>
                <Label for="company">
                  Banner Image
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="file"
                  name="banner_image"
                  id="banner_image"
                  placeholder="Banner Image"
                  onChange={handleFiles}
                />
                {payload.banner_image ? (
                  <div>
                    <span>Image Preview: </span>
                    <img
                      src={payload?.image_url}
                      style={{ height: "100px", width: "100px" }}
                    />
                  </div>
                ) : null}
                {errorKeyName === "banner_image" ? (
                  <span className="text-danger">Banner Image is Required</span>
                ) : null}
              </FormGroup>
            </Col>

            <Col sm="12">
              <FormGroup className="d-flex mb-0">
                <Button
                  type="submit"
                  disabled={loading}
                  className="mr-1"
                  color="primary"
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <Fragment>
                      <Spinner size="sm" />
                      <span className="ml-50">Loading...</span>
                    </Fragment>
                  ) : (
                    <span>Add Banner</span>
                  )}
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};
export default memo(AddBanner);
