import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../App";

export default function RegisterForm() {
  let navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [termsIsValid, setTermsIsValid] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    email: "",  
  });
  const [statusError, setStatusError] = useState("");

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(termsIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [termsIsValid, passwordIsValid]);

  // const namehandleChange = (event) => {
  //   setUser((prevState) => {
  //     return { ...prevState, name: event.target.value };
  //   });
  // };

  // const usernamehandleChange = (event) => {
  //   setUser((prevState) => {
  //     return { ...prevState, username: event.target.value };
  //   });
  // };

  // const emailhandleChange = (event) => {
  //   setUser((prevState) => {
  //     return { ...prevState, email: event.target.value };
  //   });
  // };

  // const passwordhandleChange = (event) => {
  //   setUser((prevState) => {
  //     return { ...prevState, password: event.target.value };
  //   });
  // };

  // const repeatPasswordhandleChange = (event) => {
  //   if (user.password === event.target.value) {
  //     setPasswordIsValid(true);
  //   } else {
  //     setPasswordIsValid(false);
  //   }
  // };




  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  const termshandleChange = (event) => {
    setTermsIsValid((current) => !current);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("in url user =" , user);
    try 
    {
      const apiUrl = `${server}/user/register`; 

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name : user.name , username : user.username , email : user.email , password : user.password }),
      });

      if (response.ok)
       {
        const data = await response.json();  
        setStatusError("");
              alert("Sign Up Successful");
              window.localStorage.setItem("token", data.id);
              window.localStorage.setItem("displayName", data.name);
              navigate(`/`);
        console.log(data);
      }
    }
     catch (error)
    {
      console.error('Error during login:', error);
    }
    // fetch(`${server}/register_user/register_user`, {
    //   method: "POST",
    //   crossDomain: true,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   body: JSON.stringify({
    //     name: user.name,
    //     username: user.username,
    //     email: user.email,
    //     password: user.password,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.status === "ok") {
    //       setStatusError("");
    //       alert("Sign Up Successful");
    //       navigate(`/login`);
    //     } else {
    //       setStatusError(data.error);
    //     }
    //   });
  };

  return (
    <div
      className="tab-pane fade"
      id="pills-register"
      role="tabpanel"
      aria-labelledby="tab-register"
    >
      {statusError !== "" && (
        <div>
          <p className="text-danger">{statusError}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="form-outline mb-4">
          <label className="form-label"htmlFor="registerName">
            Name
          </label>
          <input
            type="text"
            id="registerName"
            name="name"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label"htmlFor="registerUsername">
            Username
          </label>
          <input
            type="text"
            name = "username"
            id="registerUsername"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label"htmlFor="registerEmail">
            Email
          </label>
          <input
            // type="email"
            type="text"
            id="registerEmail"
            name = "email"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label"htmlFor="registerPassword">
            Password
          </label>
          <input
            type="password"
            name = "password"
            id="registerPassword"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        {/* <div className="form-outline mb-4">
          <label className="form-label"htmlFor="registerRepeatPassword">
            Repeat password
          </label>
          <input
            type="password"
            id="registerRepeatPassword"
            onChange={handleChange}
            className="form-control"
          />
        </div> */}

        {/* <div className="form-check d-flex justify-content-start mb-4">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value={termsIsValid}
            id="registerCheck"
            onChange={termshandleChange}
          />
          <label className="form-check-label"htmlFor="registerCheck">
            I have read and agree to the terms
          </label>
        </div> */}

        <div className="justify-content-center d-flex">
          {/* <button className="btn btn-submit px-4" disabled={!formIsValid}> */}
          <button className="btn btn-submit px-4">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
