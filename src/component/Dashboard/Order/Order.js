import React, { useContext, useState } from "react";
import "./Order.css";
import { useForm } from "react-hook-form";
import { BiCloudUpload } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";

const Order = ({ services }) => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();

  const onSubmit = (data) => {
    const file = data.photo[0];

    data.photo = file;

    fetch("https://creative-agency-server-gbpq.vercel.app/serviceDetails", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...data, services }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Service Added SuccessFully");
          navigate("/home", { replace: true });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <div className="d-flex justify-content-between p-4">
        <h3>Order</h3>
        <p>{user?.displayName}</p>
      </div>
      <div className="order">
        <form onSubmit={handleSubmit(onSubmit)} className="order-form">
          <input
            {...register("name")}
            placeholder="Your name / company’s name"
          />
          {errors.name && <span>This field is required</span>}
          <input {...register("email")} placeholder="Your email address" />
          {errors.email && <span>This field is required</span>}
          <input
            {...register("service")}
            placeholder={services.title}
            value={services.title}
          />
          {errors.service && <span>This field is required</span>}
          <input {...register("details")} placeholder="Project Details" />
          {errors.details && <span>This field is required</span>}
          <div className="d-flex justify-content-between">
            <input type="number" {...register("price")} placeholder="Price" />

            {errors.price && <span>This field is required</span>}
            <div className="position-relative">
              <input
                type="file"
                className="inputFile"
                {...register("photo")}
                placeholder="Upload project file"
              />
              <label for="file">
                <BiCloudUpload />
                Choose a file
              </label>
            </div>
            {errors.photo && <span>This field is required</span>}
          </div>

          <button className="btn btn-dark px-5" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Order;
