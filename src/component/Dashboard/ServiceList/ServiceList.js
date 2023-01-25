import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import SideBar from "../SideBar/SideBar";
import { useForm } from "react-hook-form";
import "./ServiceCard.css";
const ServiceList = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [serviceList, setServiceList] = useState([]);
  useEffect(() => {
    fetch(
      `https://creative-agency-server-livid.vercel.app/serviseList?email=${loggedInUser.email}`
    )
      .then((res) => res.json())
      .then((data) => setServiceList(data));
  }, [loggedInUser]);

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    fetch(`https://creative-agency-server-livid.vercel.app/isAdmin`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: loggedInUser.email }),
    })
      .then((res) => res.json())
      .then((data) => setIsAdmin(data));
  }, [loggedInUser]);
  const [status, setStatus] = useState("");
  const handleChange = (e, service) => {
    const currentstatus = e.target.value;
    fetch("https://creative-agency-server-livid.vercel.app/serviceStatus", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ serviceId: service._id, status: currentstatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Status Changed");
        }
      });
  };

  return (
    <div className="row">
      <SideBar />
      <div className="col-md-9">
        <div className="d-flex justify-content-between p-4">
          <h3>Order</h3>
          <p>{loggedInUser.name}</p>
        </div>
        <div className="order">
          {!isAdmin && (
            <div className="d-flex flex-wrap">
              {serviceList.map((service) => (
                <div className="card p-4 m-2 card-width" key={service._id}>
                  <div className="d-flex justify-content-between">
                    <img
                      src={`data:image/png;base64,${service.services.image.img}`}
                      alt=""
                      width="74px"
                    />
                    <button className="setu-btn">
                      {service.setviceStatus
                        ? service.setviceStatus
                        : "Pending "}
                    </button>
                  </div>
                  <h5 className="py-2">{service.services.title}</h5>
                  <p>{service.services.description}</p>
                </div>
              ))}
            </div>
          )}
          {isAdmin && (
            <>
              <table className="table table-borderless">
                <thead>
                  <tr className="bg-light">
                    <th className="text-secondary" scope="col">
                      Name
                    </th>
                    <th className="text-secondary" scope="col">
                      Email ID
                    </th>
                    <th className="text-secondary" scope="col">
                      Service
                    </th>
                    <th className="text-secondary" scope="col">
                      Project Details
                    </th>
                    <th className="text-secondary" scope="col">
                      Status
                    </th>
                  </tr>
                </thead>
                {serviceList.map((service) => (
                  <tbody key={service._id}>
                    <tr className="bg-white">
                      <td>{service.name}</td>
                      <td>{service.email}</td>
                      <td>{service.service}</td>
                      <td>{service.details}</td>
                      <td>
                        {/* <select {...register("status")} onChange={handleSubmit(onSubmit)}>
                                                        <option value="pending">Pending</option>
                                                        <option value="ongoing">Ongoing</option>
                                                        <option value="Done">Done</option>
                                                    </select> */}

                        {service.setviceStatus === "Pending" && (
                          <>
                            <select
                              className="statusOpyion"
                              style={{ color: "#FF4545" }}
                              defaultValue="status"
                              onChange={(e) => handleChange(e, service)}
                            >
                              <option value="Pending">
                                {service.setviceStatus}
                              </option>
                              <option value="Ongoing">Ongoing</option>
                              <option value="Done">Done</option>
                            </select>
                          </>
                        )}

                        {service.setviceStatus === "Ongoing" && (
                          <>
                            <select
                              className="statusOpyion"
                              style={{ color: "#FFBD3E" }}
                              defaultValue="status"
                              onChange={(e) => handleChange(e, service)}
                            >
                              <option value="Ongoing">
                                {service.setviceStatus}
                              </option>
                              <option value="Pending">Pending</option>
                              <option value="Done">Done</option>
                            </select>
                          </>
                        )}

                        {service.setviceStatus === "Done" && (
                          <>
                            <select
                              className="statusOpyion"
                              style={{ color: "#009444" }}
                              defaultValue="status"
                              onChange={(e) => handleChange(e, service)}
                            >
                              <option value="pending">
                                {" "}
                                {service.setviceStatus}
                              </option>
                              <option value="Pending">Pending</option>
                              <option value="Ongoing">Ongoing</option>
                            </select>
                          </>
                        )}
                        {!service.setviceStatus && (
                          <>
                            <select
                              className="statusOpyion"
                              style={{ color: "#FF4545" }}
                              defaultValue="status"
                              onChange={(e) => handleChange(e, service)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Ongoing">Ongoing</option>
                              <option value="Done">Done</option>
                            </select>
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
