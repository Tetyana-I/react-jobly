import { useState } from 'react';
import { Button, Form, Input, FormGroup, Label, Container } from "reactstrap";
import { useHistory } from 'react-router-dom';
import "./LoginForm.css";



function LoginForm({loginUser}) {
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
        <Container className="LoginForm">
            <h2>Sign Up</h2>
            <Form className="LoginForm-form" onSubmit={handleSubmit}>
                <FormGroup className="LoginForm-username">
                    <Label>Username</Label>
                    <Input 
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required>
                    </Input>                 
                </FormGroup>  
                <FormGroup>
                    <Label>Password</Label>
                    <Input 
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required>
                    </Input>                 
                </FormGroup>  
                <Button color="primary">Submit</Button>
            </Form>              
        </Container>
              
    )
}

export default LoginForm;