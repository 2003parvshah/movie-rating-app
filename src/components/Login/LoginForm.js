import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../App";

export default function LoginForm() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusError, setStatusError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      console.log(username , password);
      const apiUrl = `${server}/user/login`; 
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username , password , }),
      });
      if (response.ok)
       {
        const data = await response.json();  
        setStatusError("");
              alert("Sign Up Successful");
              window.localStorage.setItem("token", data.id);
              window.localStorage.setItem("displayName", data.name);
              // console.log(data.name);
              navigate(`/`);
        // console.log(data);
      }
    }
     catch (error)
    {
      console.error('Error during login:', error);
    }





    // fetch(`${server}/user/login`, {
    //   method: "POST",
    //   crossDomain: true,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   body: JSON.stringify({
    //     username,
    //     password,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.status === "ok") {
    //       setStatusError("");
    //       alert("Login Successful");
    //       window.localStorage.setItem("token", data.data.token);
    //       window.localStorage.setItem("displayName", data.data.name);
    //       navigate(`/`);
    //     } else {
    //       setStatusError(data.error);
    //     }
    //   });
  };

  return (
    <div
      className="tab-pane fade show active"
      id="pills-login"
      role="tabpanel"
      aria-labelledby="tab-login"
    >
      {statusError !== "" && (
        <div>
          <p className="text-danger">{statusError}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>

        <div className="form-outline mb-4">
          <label className="form-label"htmlFor="loginName">
            Email or username
          </label>
          <input
            type="text"
            id="loginName"
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label"htmlFor="loginPassword">
            Password
          </label>
          <input
            type="password"
            id="loginPassword"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        
        {/* <a href="/forgotpassword" className="link-light">
          Forget Password? (Click Here)
        </a> */}

        <div className="justify-content-center d-flex mt-4">
          <button type="submit" className="btn btn-submit px-4">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
