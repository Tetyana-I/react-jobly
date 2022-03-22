import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import "./JobCard.css";
import UserContext from "./UserContext";
import { useEffect, useContext, useState } from "react";



function JobCard({ id, title, salary, equity, companyName }) {
    const { hasAppliedToJob, applyToJob } = useContext(UserContext);
    const [applied, setApplied] = useState();
  
    useEffect(function updateAppliedStatus() {
      console.debug("JobCard useEffect updateAppliedStatus", "id=", id);
  
      setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);
  
    /** Apply for a job */
    async function handleApply(evt) {
      if (hasAppliedToJob(id)) return;
      applyToJob(id);
      setApplied(true);
    }

    return (
        <Card className="JobCard">
            <CardTitle className="JobCard-title">{title}</CardTitle>
            <CardSubtitle className="JobCard-subtitle">{companyName}</CardSubtitle>
            <CardBody className="JobCard-text">
                <CardText>Salary: {salary}<br/>Equity: {equity} </CardText>
                <button
                    id={id}
                    className="btn btn-danger font-weight-bold text-uppercase float-right"
                    onClick={handleApply}
                    disabled={applied}
                    >
                    {applied ? "Applied" : "Apply"}
                </button>
            </CardBody>
        </Card>
        );
}

export default JobCard;