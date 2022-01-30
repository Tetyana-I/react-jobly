import JoblyApi from "./api";
import { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import { Link } from "react-router-dom";

// import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";

// CompanyCard renders a short company info: name, description and jobs for this company
// state: 
//  - company: company object
//  - isLoading: loading status

function CompanyList() {
    const [isLoading, setIsLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    
    // renders once when the component is mounted, sets up local states
    useEffect(() => {
        async function getCompanies() {
        try {
            let companies = await JoblyApi.getAllCompanies();
            console.log("companies object inside function:", companies);
            setCompanies(companies);
            setIsLoading(false); 
        } catch (e) {
            console.log(e);
        }
        }
        getCompanies();
    }, []);

    // renders "Loading" message if data loading is not complete
    if (isLoading) {
        return <p>Loading &hellip;</p>;
        }
    return (
        <div>
            <h1>Companies:</h1>
            {companies.map(company => (
                <Link to={`companies/${company.handle}`}>
                    <CompanyCard 
                        name={company.name}
                        description={company.description}
                        logoUrl={company.logoUrl}
                     />
                </Link>
            ))}                
        </div>
    )
}

export default CompanyList;