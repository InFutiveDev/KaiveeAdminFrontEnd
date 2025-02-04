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
import SpinnerComponent from "../../../../@core/components/spinner/Fallback-spinner";
import EditorCom from "../../../../@core/components/editor";
import { CheckObjectValidation } from "../../../../utility/Utils";
import {
  GET_OURTEAM_BY_ID_ADMIN,
  OURTEAM_UPDATE_ADMIN,
} from "../../../../redux/actions/ourTeam";

const EditOurTeamData = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const { ourTeam } = store.ourTeam;
  const [errorKeyName, setErrorKeyName] = useState("");
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    dispatch(GET_OURTEAM_BY_ID_ADMIN(id));
  }, [id]);

  const handleFiles = async (e) => {
    const { name, files } = e.target;
    const imageUrl = URL.createObjectURL(files[0]);
    if (name === "team_image") {
      setPayload({ ...payload, [name]: files[0], image_url: imageUrl });
    }
  };

  const hanleInputBase = (e) => {
    const { name, value } = e.target;
    if (errorKeyName === name) {
      setErrorKeyName("");
    }
    setPayload({ ...payload, [name]: value });
  };

  const getContent = (htmlContentProp, name) => {
    setPayload({ ...payload, [name]: htmlContentProp });
  };
  console.log("payload---|>>", payload);
  const handleSubmit = async () => {
    delete payload.image_url;
    setLoading(true);
    const checkValidation = CheckObjectValidation(payload, []);
    setErrorKeyName(checkValidation.keyname);
    // console.log(payload)
    if (checkValidation.isvalid) {
      let tests = payload?.addTest?.map((item) => {
        delete item["value"];
        delete item["label"];
        return item;
      });
      const res = await dispatch(OURTEAM_UPDATE_ADMIN(id, payload, tests));
      if (res?.success) {
        history.push("/apps/our-team/all");
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ourTeam?.data) {
      let copyData = {
        ...ourTeam.data,
        image_url: ourTeam?.data.team_image,
      };
      delete copyData?._id;
      delete copyData?.updatedAt;
      delete copyData?.createdAt;
      delete copyData?.__v;
      setPayload({ ...copyData });
    }
  }, [ourTeam?.data]);
  console.log("ourTeam", ourTeam);
  return (
    <div>
      {!payload ? (
        <SpinnerComponent />
      ) : (
        <Card>
          <CardHeader className="w-100">
            <div className="w-100 d-flex align-items-center justify-content-between">
              <h4>Edit Our-Team</h4>
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
                  <Label for="title">
                    Doctor name
                    <span className="text-danger">
                      <sup>
                        <b>*</b>
                      </sup>
                    </span>
                  </Label>
                  <Input
                    type="text"
                    name="team_name"
                    id="name"
                    placeholder="Enter Doctor name"
                    value={payload?.team_name}
                    onChange={hanleInputBase}
                  />
                  {errorKeyName === "team_name" ? (
                    <span className="text-danger">Doctor name is Required</span>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="image">
                    Doctor image
                    <span className="text-danger">
                      <sup>
                        <b>*</b>
                      </sup>
                    </span>
                  </Label>
                  <Input
                    type="file"
                    name="team_image"
                    id="team_image"
                    placeholder="doctor image"
                    onChange={handleFiles}
                  />
                  {payload?.team_image ? (
                    <div>
                      <span>Doctor image: </span>
                      <img
                        src={payload?.image_url}
                        style={{ height: "100px", width: "100px" }}
                      />
                    </div>
                  ) : null}
                  {errorKeyName === "team_image" ? (
                    <span className="text-danger">
                      Doctor image is Required
                    </span>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="title">
                    Doctor specialisation{" "}
                    <span className="text-danger">
                      <sup>
                        <b>*</b>
                      </sup>
                    </span>
                  </Label>
                  <Input
                    type="text"
                    name="team_qualification"
                    id="team_qualification"
                    placeholder="Enter Doctor specialisation"
                    value={payload?.team_qualification}
                    onChange={hanleInputBase}
                  />
                  {errorKeyName === "team_image" ? (
                    <span className="team_qualification">
                      Doctor image is Required
                    </span>
                  ) : null}
                </FormGroup>
              </Col>

              <Col md="12" sm="12">
                <FormGroup>
                  <Label for="title">
                    Doctor qualification{" "}
                    <span className="text-danger">
                      <sup>
                        <b>*</b>
                      </sup>
                    </span>
                  </Label>
                  <EditorCom
                    dvalue={payload?.team_description || ""}
                    getContent={getContent}
                    name="team_description"
                  />
                  {errorKeyName === "team_description" ? (
                    <span className="text-danger">
                      Doctor qualification is Required
                    </span>
                  ) : null}
                </FormGroup>
              </Col>

              <Col md="12" sm="12">
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
                      <span>Update Our-Team</span>
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
export default memo(EditOurTeamData);
