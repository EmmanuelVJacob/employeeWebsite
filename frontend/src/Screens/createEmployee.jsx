import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobileNo: Yup.string()
    .matches(/^\d{10,15}$/, "Mobile number must be between 10 and 15 digits")
    .required("Mobile number is required"),
  designation: Yup.string().required("Designation is required"),
  gender: Yup.string().required("Gender is required"),
  course: Yup.array()
    .min(1, "At least one course must be selected")
    .required("Courses are required"),
});

const CreateEmployeeForm = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [imageUpload, setImageUpload] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNo: "",
      designation: "",
      gender: "",
      course: [],
    },
    validationSchema,
    onSubmit: (values) => {
      if (imageUrl.length === 0) {
        toast.error("please upload and image");
        return;
      }
      axiosInstance
        .post("/employee/addEmployee", { ...values, image: imageUrl })
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message, { autoClose: 3000 });
            navigate("/employeeList");
          } else {
            console.log(res);
            toast.error(res.data.message);
            console.log(`Error ${res.data}`);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    },
  });

  const handleImageUpload = async (event) => {
    setImageUpload(true);
    const file = event.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Only JPG and PNG images are allowed.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should not exceed 5 MB.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "yrm214ld");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dtjuhypa0/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Upload response:", data);
        setImageUrl(data.secure_url);
        formik.setFieldValue("image", data.secure_url);
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Image upload failed.");
      } finally {
        setImageUpload(false);
      }
    }
  };

  useEffect(() => {
    const token = localStorage?.getItem("accessToken");

    if (!token) {
      navigate("/login");
    }
  });

  return (
    <div className="">
      <div className="max-w-md mx-auto p-4 bg-customGrey rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4">Create New Employee</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border border-gray-300 rounded-lg p-2 bg-white placeholder:text-slate-500"
              placeholder="Enter employee name"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border border-gray-300 rounded-lg p-2 bg-white placeholder:text-slate-500"
              placeholder="Enter employee email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="mobileNo">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNo"
              name="mobileNo"
              value={formik.values.mobileNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border border-gray-300 rounded-lg p-2 bg-white placeholder:text-slate-500"
              placeholder="Enter employee mobile number"
            />
            {formik.touched.mobileNo && formik.errors.mobileNo ? (
              <div className="text-red-500 text-sm">
                {formik.errors.mobileNo}
              </div>
            ) : null}
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="designation">
              Designation
            </label>
            <select
              id="designation"
              name="designation"
              value={formik.values.designation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border border-gray-300 rounded-lg p-2 bg-white placeholder:text-slate-500"
            >
              <option value="" label="Select designation" />
              <option value="HR" label="HR" />
              <option value="Manager" label="Manager" />
              <option value="Sales" label="Sales" />
            </select>
            {formik.touched.designation && formik.errors.designation ? (
              <div className="text-red-500 text-sm">
                {formik.errors.designation}
              </div>
            ) : null}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Gender</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formik.values.gender === "Male"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mr-2 bg-white placeholder:text-slate-500"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formik.values.gender === "Female"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mr-2"
                />
                Female
              </label>
            </div>
            {formik.touched.gender && formik.errors.gender ? (
              <div className="text-red-500 text-sm">{formik.errors.gender}</div>
            ) : null}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Course</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="course"
                  value="BCA"
                  checked={formik.values.course.includes("BCA")}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    if (checked) {
                      formik.setFieldValue("course", [
                        ...formik.values.course,
                        value,
                      ]);
                    } else {
                      formik.setFieldValue(
                        "course",
                        formik.values.course.filter((c) => c !== value)
                      );
                    }
                  }}
                  onBlur={formik.handleBlur}
                  className="mr-2"
                />
                BCA
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="course"
                  value="MCA"
                  checked={formik.values.course.includes("MCA")}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    if (checked) {
                      formik.setFieldValue("course", [
                        ...formik.values.course,
                        value,
                      ]);
                    } else {
                      formik.setFieldValue(
                        "course",
                        formik.values.course.filter((c) => c !== value)
                      );
                    }
                  }}
                  onBlur={formik.handleBlur}
                  className="mr-2"
                />
                MCA
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="course"
                  value="BSC"
                  checked={formik.values.course.includes("BSC")}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    if (checked) {
                      formik.setFieldValue("course", [
                        ...formik.values.course,
                        value,
                      ]);
                    } else {
                      formik.setFieldValue(
                        "course",
                        formik.values.course.filter((c) => c !== value)
                      );
                    }
                  }}
                  onBlur={formik.handleBlur}
                  className="mr-2"
                />
                BSC
              </label>
            </div>
            {formik.touched.course && formik.errors.course ? (
              <div className="text-red-500 text-sm">{formik.errors.course}</div>
            ) : null}
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="image">
              Image
            </label>
            <div className="flex justify-center items-center mt-4">
              {imageUpload ? (
                <div>
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                  <p className="mt-2 text-blue-600">Uploading Image...</p>
                </div>
              ) : (
                imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    className="object-contain h-52 w-52"
                  />
                )
              )}
            </div>
            <input
              type="file"
              id="image"
              name="image"
              accept=".jpg,.jpeg,.png"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            {formik.touched.image && formik.errors.image ? (
              <div className="text-red-500 text-sm">{formik.errors.image}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-customVioletDark3 text-white py-2 rounded-lg"
          >
            Create Employee
          </button>
          <Link to="/employeeList">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg mt-2">
              Cancel
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployeeForm;
