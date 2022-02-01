import JoblyApi from "./api";
import { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import { Link } from "react-router-dom";
import { Container } from 'reactstrap';
import "./CompanyList.css";
import SearchForm from "./SearchForm";

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

    async function searchCompanies(searchTerm) {
        try {
            setIsLoading(true); 
            let searchResult = await JoblyApi.getCompaniesByName(searchTerm);
            console.log("companies inside search function:", searchResult);
            setCompanies(searchResult);
            setIsLoading(false); 
        } catch (e) {
            console.log(e);
        }
        
    }
    // renders "Loading" message if data loading is not complete
    if (isLoading) {
        return <p>Loading &hellip;</p>;
        }
    return (
        <Container>
            <SearchForm searchFunction={searchCompanies}/>
            {companies !== [] ? companies.map(company => (
                <Link key={company.handle} to={`companies/${company.handle}`}>
                    <CompanyCard 
                        name={company.name}
                        description={company.description}
                        logoUrl={company.logoUrl}
                     />
                </Link>
            )) : <p>Sorry, no results were found!</p>
            }                
        </Container>
    )
}

export default CompanyList;