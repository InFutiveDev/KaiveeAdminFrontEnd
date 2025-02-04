import "@styles/react/apps/app-users.scss";
import AddFaqs from './add'
import { Card, CardBody } from "reactstrap";
import FaqsListingById from "./listing";

const FaqsApp = () => {

  return (
    <div className="app-user-list">
      <Card>
        <CardBody>
          <AddFaqs />
        </CardBody>
      </Card>
      <FaqsListingById />
    </div>
  );
};
export default FaqsApp;
