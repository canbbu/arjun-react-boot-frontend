import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ViewUser() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    gender: "",
    email: "",
  });
  const { username, password, gender, email } = user;

  useEffect(() => {
    loadUser();
  }, []);

  const { id } = useParams();

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8030/user/${id}`);
    setUser(result.data);
  };

  return (
    <div>
      (
      <div className="container rounded shadow border">
        <div className="row">
          <h2 className="text-center m-4">Register Form</h2>
          <div className="mb-3">
            <label for="dataInput" className="form-label">
              UserName
            </label>
            <h2 type="text" className="form-control">
              {username}
            </h2>
          </div>
          <div className="mb-3">
            <label for="dataInput" className="form-label">
              Gender
            </label>
            <h2 type="text" className="form-control" name="username">
              {gender}
            </h2>
          </div>
          <div className="mb-3">
            <label for="dataInput" className="form-label">
              Email address
            </label>
            <h2 type="email" className="form-control" name="email">
              {email}
            </h2>
          </div>
          <div>
            <Link
              type="submit"
              className="btn btn-outline-dark"
              to={`/edituser/${user.id}`}
            >
              Edit
            </Link>
            <Link className="btn btn-outline-dark" to="/">
              home
            </Link>
          </div>
        </div>
      </div>
      );
    </div>
  );
}
