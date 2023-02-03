import React, { useContext, useEffect, useState } from "react";
import "./Service.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/UserContext";

const Service = ({ service }) => {
  const { user } = useContext(AuthContext);

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    fetch(`https://creative-agency-server-gbpq.vercel.app/isAdmin`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: user?.email }),
    })
      .then((res) => res.json())
      .then((data) => setIsAdmin(data));
  }, [user]);
  const navigate = useNavigate();
  const handleService = () => {
    if (!isAdmin) {
      navigate(`/service/${service._id}`);
    } else {
      navigate(`/service`);
    }
  };
  return (
    <div
      onClick={handleService}
      className="card d-flex justify-content-center flex-wrap align-items-center mx-3 py-4 px-2 text-center border-0 service w-50"
    >
      <img
        src={`data:image/png;base64,${service.image.img}`}
        width="74px"
        alt=""
      />
      <h4 className="m-3">{service.title}</h4>
      <p>{service.description}</p>
    </div>
  );
};

export default Service;
