import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../App";
const ReviewForm = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.photourl = loggedInUser.photourl;
    fetch("https://creative-agency-server-livid.vercel.app/review", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ data }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          alert("Review Send Succesfullty");
        }
      });
  };
  return (
    <>
      <div className="d-flex justify-content-between p-4">
        <h3>Order</h3>
        <p>{loggedInUser.name}</p>
      </div>
      <div className="order">
        <form onSubmit={handleSubmit(onSubmit)} className="order-form">
          <input {...register("name")} placeholder="Your Name" />
          {errors.name && <span>This field is required</span>}
          <input
            {...register("designation")}
            placeholder="Company’s name, Designation"
          />
          {errors.designation && <span>This field is required</span>}
          <textarea
            {...register("description")}
            placeholder="Description"
            rows="5"
          ></textarea>
          {errors.description && <span>This field is required</span>}

          <button className="btn btn-dark px-5" type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ReviewForm;
