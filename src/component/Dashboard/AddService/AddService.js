import React, { useContext, useState } from "react";
import SideBar from "../SideBar/SideBar";
import { useForm } from "react-hook-form";
import { BiCloudUpload } from "react-icons/bi";
import "./AddService.css";
import { AuthContext } from "../../Context/UserContext";
import { toast } from "react-toastify";

const AddService = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState(null);
  const handlefileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", data.title);
    formData.append("description", data.description);

    fetch("https://creative-agency-server-gbpq.vercel.app/addService", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          toast("Service Added SuccessFully");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="row">
      <SideBar />
      <div className="col-md-9">
        <div>
          <div className="d-flex justify-content-between p-4">
            <h3>Order</h3>
            <p>{user?.displayName}</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="addservice-form">
            <div className="order">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="title">Service Title</label>
                  <input {...register("title")} placeholder="Enter title" />
                  {errors.name && <span>This field is required</span>}
                  <label htmlFor="">Description</label>
                  <input
                    {...register("description")}
                    placeholder="Description"
                  />
                  {errors.description && <span>This field is required</span>}
                </div>
                <div className="col-md-6">
                  <div className="position-relative">
                    <input
                      type="file"
                      className="inputFile"
                      onChange={handlefileChange}
                      placeholder="Upload project file"
                    />
                    <label for="file">
                      <BiCloudUpload />
                      Choose a file
                    </label>
                  </div>
                </div>
              </div>

              {errors.photo && <span>This field is required</span>}
            </div>
            <button
              className="btn btn-success float-end me-4 px-3 mt-3 w-25"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
