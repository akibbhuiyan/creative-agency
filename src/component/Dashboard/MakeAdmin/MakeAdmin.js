import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/UserContext";
import SideBar from "./../SideBar/SideBar";
import { toast } from "react-toastify";

const MakeAdmin = () => {
  const { user } = useContext(AuthContext);

  const [admin, setAdmin] = useState("");
  console.log(admin);
  const handleSubmit = (e) => {
    fetch("https://creative-agency-server-gbpq.vercel.app/makeAdmin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ adminemail: admin }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast("Admin Created SuccesFully");
        } else {
          console.log("somthing is wrong");
        }
      });
    e.preventDefault();
  };
  return (
    <div className="row">
      <SideBar />
      <div className="col-md-9">
        <div className="d-flex justify-content-between p-4">
          <h3>Order</h3>
          <p>{user?.displayName}</p>
        </div>
        <div className="order">
          <form className="addminInput" onSubmit={handleSubmit}>
            <label htmlFor="email" className="mb-2 fw-bold">
              Email
            </label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="jon@gamil.com"
              onChange={(e) => setAdmin(e.target.value)}
            />
            <input type="submit" value="Submit" className="btn btn-success" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakeAdmin;
