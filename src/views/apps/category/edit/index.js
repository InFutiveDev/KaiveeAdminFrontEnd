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

import { ArrowLeft } from "react-feather";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditorCom from "../../../../@core/components/editor";
import {
  GET_CATEGORY_BY_ID,
  CATEGORY_UPDATE,
  GET_ALL_CATEGORIES,
} from "../../../../redux/actions/category";

const EditCategory = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const store = useSelector((state) => state.category);
  const { category, categories } = store;
  const [payload, setPayload] = useState(null);
  const [artical, setArtical] = useState(null);
  const [description, setDescription] = useState(null);
  const [errorKeyName, setErrorKeyName] = useState("");

  useEffect(() => {
    dispatch(GET_ALL_CATEGORIES(1, 100, ""));
  }, []);

  const getContent = (htmlContentProp, name) => {
    if (name === "category_desc") setDescription(htmlContentProp);
    if (name === "category_article") setArtical(htmlContentProp);
  };

  const handleFiles = async (e) => {
    const { name, files } = e.target;
    const imageUrl = URL.createObjectURL(files[0]);
    setPayload({ ...payload, [name]: files[0], [`${name}_base64`]: imageUrl });
  };

  const hanleInputBase = (e) => {
    const { name, value } = e.target;
    console.log("value-->", value);
    setPayload({ ...payload, [name]: value });
  };

  const handleRadioButtons = (e) => {
    const { name, value } = e.target;
    if (errorKeyName === name) {
      setErrorKeyName("");
    }
    setPayload({ ...payload, category_menu_active: Number(value) });
  };

  const handleSubmit = async () => {
    setLoading(true);
    let newObj = {
      ...payload,
      category_article: artical,
      category_desc: description,
      perent_category_name: payload?.perent_category_name || "null",
    };

    delete newObj?.home_image_base64;
    delete newObj?.image_url_base64;
    delete newObj?.mobile_banner_base64;
    delete newObj?.parent_category_data;
    console.log("payload", newObj, payload);
    let res = await dispatch(CATEGORY_UPDATE(categoryId, newObj || payload));
    if (res?.success) {
      history.push("/apps/category/all");
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(GET_CATEGORY_BY_ID(categoryId));
  }, [categoryId]);

  useEffect(() => {
    if (category?.data && category?.data.length) {
      category.data[0].image_url_base64 = category.data[0].category_image;
      category.data[0].home_image_base64 = category.data[0].home_image;
      category.data[0].mobile_banner_base64 = category.data[0].mobile_banner;
      setPayload(category.data[0]);
    }
  }, [category?.data]);

  return (
    <div>
      <Card>
        <CardHeader className="w-100">
          <div className="w-100 d-flex align-items-center justify-content-between">
            <h4>Update Category</h4>
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
                <Label>Category</Label>
                <Input
                  type="text"
                  name="category_name"
                  id="category_name"
                  placeholder="Enter Category Name"
                  value={payload?.category_name || ""}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>

            <Col md="6" sm="12">
              <FormGroup>
                <Label for="perent_category_name">
                  Parent Category Name{" "}
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="select"
                  name="perent_category_name"
                  id="perent_category_name"
                  placeholder="Enter Category Name"
                  value={payload?.perent_category_name || ""}
                  onChange={hanleInputBase}
                >
                  <option value={""}>Select Main Category</option>
                  {categories?.data?.categoryData?.map((it) => {
                    return <option value={it?._id}>{it?.category_name}</option>;
                  })}
                  {/* {
                    categories?.data?.categoryData?.filter(it => it?.perent_category_name === null)?.map((it) => {
                      return (
                        <option value={it?._id}>
                          {it?.category_name}
                        </option>
                      )
                    })
                  } */}
                </Input>
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="Category">Category Url</Label>
                <Input
                  type="text"
                  name="category_url"
                  id="category_url"
                  placeholder="Enter Category Url"
                  value={payload?.category_url}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="position">Position</Label>
                <Input
                  type="number"
                  name="position"
                  id="position"
                  placeholder="Position"
                  value={payload?.position}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>
                  Category Image
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <div className="rounded border p-2">
                  <Input
                    type="file"
                    name="category_image"
                    id="category_image"
                    placeholder="Category Image"
                    onChange={handleFiles}
                  />
                  {payload?.image_url_base64 ? (
                    <div>
                      <span>Image Preview: </span>
                      <img
                        src={payload?.image_url_base64}
                        style={{ height: "100px", width: "100px" }}
                      />
                    </div>
                  ) : null}
                </div>
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>
                  Mobile Banner (350*190)
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <div className="rounded border p-2">
                  <Input
                    type="file"
                    name="mobile_banner"
                    id="mobile_banner"
                    placeholder="Mobile Banner"
                    onChange={handleFiles}
                  />
                  {payload?.mobile_banner_base64 ? (
                    <div>
                      <span>Image Preview: </span>
                      <img
                        src={payload?.mobile_banner_base64}
                        style={{ height: "100px", width: "100px" }}
                      />
                    </div>
                  ) : null}
                </div>
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="category_image_altTag">
                  Category Image Alt{" "}
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="text"
                  name="category_image_altTag"
                  id="category_image_altTag"
                  placeholder="Category Image Alt "
                  value={payload?.category_image_altTag}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>
                  Home Page Image
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <div className="rounded border p-2">
                  <Input
                    type="file"
                    name="home_image"
                    id="home_image"
                    placeholder="Category Image"
                    onChange={handleFiles}
                  />
                  {payload?.home_image_base64 ? (
                    <div>
                      <span>Image Preview: </span>
                      <img
                        src={payload?.home_image_base64}
                        style={{ height: "100px", width: "100px" }}
                      />
                    </div>
                  ) : null}
                </div>
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="home_image_altTag">
                  Home Image Alt
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="text"
                  name="home_image_altTag"
                  id="home_image_altTag"
                  placeholder="Category Image Alt "
                  value={payload?.home_image_altTag}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>Menu Link</Label>
                <Row>
                  <Col md="3" sm="12">
                    <CustomInput
                      type="checkbox"
                      id="menu-active"
                      name="category_menu_active"
                      defaultValue="1"
                      onChange={handleRadioButtons}
                      label="Active"
                      checked={payload?.category_menu_active === 1}
                    />
                  </Col>
                  <Col md="3" sm="12">
                    <CustomInput
                      type="checkbox"
                      id="menu-inactive"
                      name="category_menu_active"
                      defaultValue="0"
                      onChange={handleRadioButtons}
                      label="Inactive"
                      checked={payload?.category_menu_active === 0}
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup>
                <Label for="Description">Description</Label>
                <EditorCom
                  dvalue={payload?.category_desc || ""}
                  getContent={getContent}
                  name="category_desc"
                />
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup>
                <Label for="category_article" className="mt-2">
                  Category Article
                </Label>
                <EditorCom
                  dvalue={payload?.category_article || ""}
                  getContent={getContent}
                  name="category_article"
                />
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup>
                <Label for="metatagtile">Meta Tag Title</Label>
                <Input
                  type="text"
                  name="meta_title"
                  id="meta_title"
                  placeholder="Enter Meta Title"
                  value={payload?.meta_title || ""}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup>
                <Label for="metatagdescription">Meta Tag Description</Label>
                <Input
                  type="text"
                  name="meta_desc"
                  id="meta_desc"
                  placeholder="Enter Meta Description"
                  value={payload?.meta_desc || ""}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup>
                <Label for="metatagdescription">Meta Tag Keywords</Label>
                <Input
                  type="test"
                  name="meta_keyword"
                  id="meta_keyword"
                  placeholder="Enter Meta Keywords"
                  value={payload?.meta_keyword || ""}
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
                    <span>Update Category</span>
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
export default memo(EditCategory);
