import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Order from "../Order/Order";
import SideBar from "../SideBar/SideBar";

const Dashboard = () => {
  const { id } = useParams();

  const [services, setServices] = useState({});
  useEffect(() => {
    fetch(
      `https://creative-agency-server-livid.vercel.app/choosenService/${id}`
    )
      .then((res) => res.json())
      .then((service) => setServices(service[0]));
  }, [id]);
  return (
    <div className="row">
      <SideBar />
      <div className="col-md-9">
        <Order services={services} />
      </div>
    </div>
  );
};

export default Dashboard;
