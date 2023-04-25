import axios, { AxiosHeaders } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get("http://localhost:8030/users");
    setUsers(result.data);
  };

  const onDeleteClick = async (id) => {
    await axios.delete(`http://localhost:8030/user/${id}`);
    loadUser();
  };

  return (
    <div>
      <table class="table table-dark ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Gender</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <th scope="row" key={index}>
                {index + 1}
              </th>
              <td>{user.username}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>
                <Link
                  className="btn btn-outline-primary"
                  to={`/viewuser/${user.id}`}
                >
                  View
                </Link>
                <Link
                  className="btn btn-outline-success"
                  to={`/edituser/${user.id}`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDeleteClick(user.id)}
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
