import { useState } from 'react';
import './SearchForm.css';
import { Button, Form, Input  } from "reactstrap";



function SearchForm({searchFunction}) {
    const [formData, setFormData] = useState({searchTerm: ""});

    const handleSubmit = (evt) => {
        evt.preventDefault();
        searchFunction(formData.term);
    };

    // Updates local state for new item data with current state of input element
    const handleChange = (evt) => {
        const { name, value }= evt.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    return (
        <Form className="SearchForm" onSubmit={handleSubmit}>
            <Input 
                id="term"
                name="term"
                type="text"
                placeholder="Enter search term..."
                value={formData.name}
                onChange={handleChange}
                >
            </Input>                
            <Button color="primary">Search</Button>
        </Form>                
    )
}

export default SearchForm;

