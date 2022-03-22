import { useState, useEffect } from "react";
import { Container } from 'reactstrap';
import JobCard from "./JobCard";
import JoblyApi from "./api";
import "./CompanyList.css";
import SearchForm from "./SearchForm";

function JobList() {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    
    // renders once when the component is mounted, sets up local states
    useEffect(() => {
        async function getJobs() {
            try {
                let jobs = await JoblyApi.getAllJobs();
                console.log("jobs object inside function:", jobs);
                setJobs(jobs);
                setIsLoading(false); 
            } catch (e) {
                console.log(e);
            }
        }
        getJobs();
    }, []);

    async function searchJobs(searchTerm) {
        try {
            setIsLoading(true); 
            let searchResult = await JoblyApi.getJobsByTitle(searchTerm);
            console.log("Jobs inside search function:", searchResult);
            setJobs(searchResult);
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
            <SearchForm searchFunction={searchJobs}/>
            {jobs.map(job => (
                <JobCard 
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    salary={job.salary}
                    equity={job.equity}
                    companyName={job.companyName}
                />
            ))}                
        </Container>
    )
}

export default JobList;
