import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import "./JobCard.css";


function JobCard({ title, salary, equity, companyName }) {
    return (
        <Card className="JobCard">
            <CardTitle className="JobCard-title">{title}</CardTitle>
            <CardSubtitle className="JobCard-subtitle">{companyName}</CardSubtitle>
            <CardBody className="JobCard-text">
                <CardText>Salary: {salary}<br/>Equity: {equity}</CardText>
            </CardBody>
        </Card>
        );
}

export default JobCard;