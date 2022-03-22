import JoblyApi from "./api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import "./CompanyDetails.css";

// import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";

// CompanyCard renders a short company info: name, description and jobs for this company
// state: 
//  - company: company object
//  - isLoading: loading status

function CompanyDetails() {
    const { handle } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState({});
    
    // renders once when the component is mounted, sets up local states
    useEffect(() => {
        async function getCompanyByHandle() {
        try {
            let res = await JoblyApi.getCompany(handle);
            let company = {
                name: res.name,
                description: res.description,
                logoUrl: res.logoUrl,
                jobs: res.jobs,
                numEmployees: res.numEmployees
            }
            console.log("company object inside function:", company);
            setCompany(company);
            setIsLoading(false); 
        } catch (e) {
            console.log(e);
        }
        }
        getCompanyByHandle();
    },[handle]);

    // renders "Loading" message if data loading is not complete
    if (isLoading) {
        return <p>Loading &hellip;</p>;
        }
    return (
        <div className="CompanyDetails"> 
            <div className="CompanyDetails-info">
                <h3>{company.name}</h3>
                <p>{company.description}</p>            
            </div>
            { company.jobs.map(job => (
                <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    salary={job.salary}
                    equity={job.equity}
                />
            ))}
        </div>            
    )
}

export default CompanyDetails;

