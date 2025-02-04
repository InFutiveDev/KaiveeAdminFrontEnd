import { memo, useState, Fragment, useEffect } from "react";
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
import { ArrowLeft } from "react-feather";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_MEDIA_BY_ID_ADMIN,
  MEDIA_UPDATE_ADMIN,
} from "../../../../redux/actions/media";
import SpinnerComponent from "../../../../@core/components/spinner/Fallback-spinner";

const EditMedia = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const { media } = store.media;
  const { mediaId } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [payload, setPayload] = useState(null);
  const [changImg, setChangeImg] = useState();

  useEffect(() => {
    dispatch(GET_MEDIA_BY_ID_ADMIN(mediaId));
  }, [mediaId]);

  const handleFiles = async (e) => {
    const { name, files } = e.target;
    const imageUrl = URL.createObjectURL(files[0]);
    setChangeImg(imageUrl);
    setPayload({ ...payload, [name]: files[0], media: files[0] });
  };

  const hanleInputBase = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleSubmit = async () => {
    delete payload.image_url;
    setLoading(true);

    const res = await dispatch(MEDIA_UPDATE_ADMIN(mediaId, payload));
    if (res?.success) {
      history.push("/apps/media/all");
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (media?.data && media?.data.length) {
      setPayload({
        link: media?.data[0]?.link,
        text: media?.data[0]?.text,
        media: media?.data[0].media,
        image_url: media.data[0].media,
      });
    }
  }, [media?.data]);
  return (
    <div>
      {!payload ? (
        <SpinnerComponent />
      ) : (
        <Card>
          <CardHeader className="w-100">
            <div className="w-100 d-flex align-items-center justify-content-between">
              <h4>Edit Media</h4>
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
                  <Label for="Media Name">
                    Link <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="text"
                    name="link"
                    id="healthRiskTitle"
                    placeholder="Enter Link"
                    value={payload?.link}
                    onChange={hanleInputBase}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="media">
                    Description <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="textarea"
                    name="text"
                    id="healthRiskTitle"
                    placeholder="Enter Media Name"
                    value={payload?.text}
                    onChange={hanleInputBase}
                    rows="8"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="image">
                    Health Risk Image
                    <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="file"
                    name="media"
                    id="healthRisk_image"
                    placeholder="Health Risk Image"
                    onChange={handleFiles}
                  />
                  <span>Image Preview: </span>
                  <img
                    src={changImg ? changImg : payload?.media}
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
                      <span>Update Media</span>
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
export default memo(EditMedia);
