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
} from "reactstrap";

// ** Icons from react-feather
import { ArrowLeft } from "react-feather";
// ** React routings method  or component
import { useHistory, useParams } from "react-router-dom";

// ** redux hools and store
import { useDispatch, useSelector } from "react-redux";
import {
  GET_HEALTH_RISKS_BY_ID,
  HEALTH_RISKS_UPDATE,
} from "../../../../redux/actions/healthRisk";
import SpinnerComponent from "../../../../@core/components/spinner/Fallback-spinner";

const EditHealthRisk = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const { healthRiskInfo } = store.healthRisk;
  const { riskId } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [payload, setPayload] = useState(null);

  useEffect(() => {
    dispatch(GET_HEALTH_RISKS_BY_ID(riskId));
  }, [riskId]);

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
    const res = await dispatch(HEALTH_RISKS_UPDATE(riskId, payload));
    if (res?.success) {
      history.push("/apps/risk/all");
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (healthRiskInfo?.data && healthRiskInfo?.data.length) {
      setPayload({
        healthRiskTitle: healthRiskInfo?.data[0].healthRiskTitle,
        healthRisk_image: healthRiskInfo?.data[0].healthRisk_image,
        healthRisk_image_alt: healthRiskInfo?.data[0].healthRisk_image_alt,
        description: healthRiskInfo?.data[0].description,
        image_url: healthRiskInfo.data[0].healthRisk_image,
      });
    }
  }, [healthRiskInfo?.data]);

  return (
    <div>
      {!payload ? (
        <SpinnerComponent />
      ) : (
        <Card>
          <CardHeader className="w-100">
            <div className="w-100 d-flex align-items-center justify-content-between">
              <h4>Edit Health Risk</h4>
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
                  <Label for="title">Title</Label>
                  <Input
                    type="text"
                    name="healthRiskTitle"
                    id="healthRiskTitle"
                    placeholder="Enter Health Risk Name"
                    value={payload?.healthRiskTitle}
                    onChange={hanleInputBase}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Description</Label>
                  <Input
                    name="description"
                    id="description"
                    rows="8"
                    placeholder="Enter Health Risk description"
                    value={payload?.description}
                    onChange={hanleInputBase}
                    type="textarea"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="image">Health Risk Image</Label>
                  <Input
                    type="file"
                    name="healthRisk_image"
                    id="healthRisk_image"
                    placeholder="Health Risk Image"
                    onChange={handleFiles}
                  />
                  <span>Image Preview: </span>
                  <img
                    src={payload?.healthRisk_image}
                    style={{ height: "100px", width: "100px" }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="image">Health Risk Image Alt Text</Label>
                  <Input
                    type="text"
                    name="healthRisk_image_alt"
                    id="healthRisk_image_alt"
                    placeholder="Enter Alt Text for Image"
                    value={payload?.healthRisk_image_alt}
                    onChange={hanleInputBase}
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
                      <span>Update Health Risk</span>
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
export default memo(EditHealthRisk);
