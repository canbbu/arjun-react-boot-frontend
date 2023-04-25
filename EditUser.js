import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function EditUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    username: "",
    password: "",
    gender: "",
    email: "",
  });
  const { username, password, gender, email } = users;

  useEffect(() => {
    loadUser();
  }, []);

  const { id } = useParams();

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8030/user/${id}`);
    setUsers(result.data);
  };

  const onInputChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8030/user/${id}`, users);
    navigate("/");
  };

  return (
    <div className="container rounded shadow border">
      <div className="row">
        <form onSubmit={(e) => onSubmit(e)}>
          <h2 className="text-center m-4">Edit Form</h2>
          <div className="mb-3">
            <label for="dataInput" className="form-label">
              UserName
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={(e) => onInputChange(e)}
            ></input>
          </div>
          <div className="mb-3">
            <label for="dataInput" className="form-label">
              Password
            </label>
            <input
              type="text"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            ></input>
          </div>
          <div className="mb-3">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="inlineRadio1"
                value="male"
                onClick={(e) => onInputChange(e)}
              ></input>
              <label className="form-check-label" for="inlineRadio1">
                male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="female"
                id="inlineRadio2"
                onClick={(e) => onInputChange(e)}
              ></input>
              <label className="form-check-label" for="inlineRadio2">
                female
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label for="dataInput" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={(e) => onInputChange(e)}
              value={email}
            ></input>
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <button type="submit" className="btn btn-outline-dark">
            Update
          </button>
          <Link className="btn btn-outline-dark" to="/">
            cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
