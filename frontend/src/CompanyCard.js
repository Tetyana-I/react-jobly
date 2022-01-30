import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function CompanyCard({ name, description, logoUrl}) {
    return (
        <div>
            <Card>
                <CardImg top width="100%" src={logoUrl} />
                <CardBody>
                    <CardTitle>{name}</CardTitle>
                    <CardText>{description}</CardText>
                </CardBody>
            </Card>
        </div>
        );
}

export default CompanyCard;