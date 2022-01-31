import { Card, CardImg, CardText, CardBody, CardTitle, Row, Col } from 'reactstrap';
import "./CompanyCard.css";


function CompanyCard({ name, description, logoUrl}) {
    return (
        <Card className="CompanyCard">
            <Row>
                <Col>
                    <CardTitle className="CompanyCard-title">{name}</CardTitle>
                </Col>
                <Col>
                    <CardImg className="CompanyCard-img" src={logoUrl} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <CardBody>
                        <CardText className="CompanyCard-text">{description}</CardText>
                    </CardBody>
                </Col>
            </Row>
        </Card>
        );
}

export default CompanyCard;