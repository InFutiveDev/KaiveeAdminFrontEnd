import { memo, useState, Fragment, useEffect } from "react";

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
import { useHistory, useParams } from "react-router-dom";

// ** redux hools and store
import { useDispatch, useSelector } from "react-redux";

import {
  EDIT_BANNER_BY_ADMIN,
  GET_BANNER_BY_ID,
} from "../../../../redux/actions/banner";
import SpinnerComponent from "../../../../@core/components/spinner/Fallback-spinner";

// ** Utils funtion to check validation

const EditBanner = () => {
  // ** redux hools and store
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const { banner } = store.banner;
  const { bannerId } = useParams();
  // ** states
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [payload, setPayload] = useState(null);

  useEffect(() => {
    dispatch(GET_BANNER_BY_ID(bannerId));
  }, [bannerId]);

  const handleFiles = async (e) => {
    const { name, files } = e.target;
    const imageUrl = URL.createObjectURL(files[0]);
    setPayload({ ...payload, [name]: files[0], image_url: imageUrl });
  };

  const hanleInputBase = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleSubmit = async () => {
    delete payload.image_url;
    setLoading(true);
    const res = await dispatch(EDIT_BANNER_BY_ADMIN(bannerId, payload));
    if (res?.success) {
      history.push("/apps/banner/all");
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (banner?.data && banner?.data.length) {
      setPayload({
        banner_name: banner.data[0].banner_name,
        position: banner.data[0]?.position,
        banner_image: banner.data[0].banner_image,
        image_url: banner.data[0].banner_image,
      });
    }
  }, [banner?.data]);

  return (
    <div>
      {!payload ? (
        <SpinnerComponent />
      ) : (
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
                    Banner Name <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="text"
                    name="banner_name"
                    id="banner_name"
                    placeholder="Enter Banner Name"
                    value={payload?.banner_name}
                    onChange={hanleInputBase}
                  />
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
                    <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="file"
                    name="banner_image"
                    id="banner_image"
                    placeholder="Banner Image"
                    onChange={handleFiles}
                  />
                  <span>Image Preview: </span>
                  <img
                    src={payload?.image_url}
                    style={{ height: "100px", width: "100px" }}
                  />
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
                      <span>Update Banner</span>
                    )}
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
export default memo(EditBanner);
