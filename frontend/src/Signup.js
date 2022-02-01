import { useState } from 'react';
import { Button, Form, Input, FormGroup, Label } from "reactstrap";
import { useHistory } from 'react-router-dom';



function Signup({signupUser}) {
    const history = useHistory();
    const [formData, setFormData] = useState({

    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // const itemToAdd = { 
        //     id: formData.name,
        //     name: formData.name,
        //     description: formData.description,
        //     recipe: formData.recipe,
        //     serve: formData.serve,
        //   }
        // addFoodItem(itemToAdd, itemType);
        // history.push(`/${formData.itemType}`);
        // searchFunction(formData.term);

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
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Description:</Label>
                <Input 
                    name="description"
                    type="textarea"
                    placeholder="Enter a description ..."
                    value={formData.description}
                    onChange={handleChange}
                    required>
                </Input>                 
            </FormGroup>              
            <Button color="primary">Submit</Button>
        </Form>                
    )
}

export default Signup;