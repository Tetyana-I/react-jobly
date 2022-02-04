import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';
import "./LoginForm.css";



function LoginForm({login}) {
    const history = useHistory();
    const [formErrors, setFormErrors] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    console.debug(
        "LoginForm",
        "login=", typeof login,
        "formData=", formData,
        "formErrors=", formErrors,
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);  
        console.log("result", result);
        if (result.success) {
            console.debug("Going to companies route...");
            history.push("/companies"); 
        } else {
            setFormErrors(result.errors);
            console.log("formErrors", formErrors);
        }
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
        <div className="SignupForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h2 className="mb-3">Log In</h2>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                  <label>Username</label>
                  <input
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group my-3">
                  <label>Password</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                  />
                </div>

                {formErrors.length
                    ? <ErrorMessage type="danger" messages={formErrors} />
                    : null
                }

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default LoginForm;