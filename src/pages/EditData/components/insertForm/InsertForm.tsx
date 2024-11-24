import { Image } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { FiUpload } from "react-icons/fi";
import {
  API_BASE_URL_NIA_Group,
  API_BASE_URL_NIA_Solution,
} from "../../../../api/api";
import { useParams } from "react-router-dom";
import TextInput from "../TextInput/TextInput";
import useDomainURL from "../../../../hooks/useDomain";

const InsertForm = ({ toast, navigate, imagesData }) => {
  const [loading, setLoading] = React.useState(false);
  const [fileImg, setFileImg] = React.useState(false);
  const [textValues, setTextValues] = React.useState({});
  const { domainURL } = useDomainURL();
  const { type, id } = useParams();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileImg(file);
    }
  };
  const [error, setError] = React.useState(""); // State for error message

  const linkedinRegex =
    /^(https?:\/\/)?(www\.)?(linkedin\.com\/(in|pub|company|school|groups|search|events)\/.*)$/;

  const handleInsertSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);
    // Validate LinkedIn URL
    if (textValues.linkedin && !linkedinRegex.test(textValues.linkedin)) {
      setError("Please enter a valid LinkedIn URL."); // Set error message
      setLoading(false); // Stop loading
      return; // Stop form submission
    }
    const formData = new FormData();
    formData.append("img", fileImg); // Append the image
    Object.keys(textValues).forEach((key) => {
      formData.append(key, textValues[key]); // Append text values
    });

    try {
      await axios.post(`${domainURL}/${type}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Navigate to the previous page
      navigate(-1);

      // Display success toast
      toast({
        title: "Data inserted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // Display error toast
      toast({
        title: "Error inserting data.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setTextValues((prev) => ({ ...prev, [name]: value }));
    // Update text values (you need to have this function in your props)
    textValues[name] = value;

    // Clear error message if the LinkedIn field is changed and the input is valid
    if (name === "linkedin") {
      if (value && linkedinRegex.test(value)) {
        setError(""); // Clear error message
      } else if (!value) {
        setError(""); // Optionally clear error if input is empty
      }
    }
  };
  return (
    <>
      <form onSubmit={handleInsertSubmit}>
        {/* Image Upload Section */}
        <div>
          <h2 className="capitalize text-3xl mb-[3.5rem]">Change Images</h2>
          <div className="edit_Img flex flex-col justify-start gap-4">
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: "none" }}
              id="imageUpload"
              className="absolute z-10"
            />
            <label htmlFor="imageUpload" className="absolute">
              <span className="absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                <FiUpload size={50} color="white" />
              </span>
            </label>
            <div className="mt-4 edit_Img relative size-[500px] bg-black">
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-md"></div>
              {fileImg ? (
                <Image
                  objectFit="cover"
                  width="100%"
                  src={URL.createObjectURL(fileImg)} // Display uploaded image preview
                  alt="Uploaded Image"
                  borderRadius="md"
                  boxShadow="lg"
                />
              ) : (
                <p>No image uploaded</p>
              )}
            </div>
          </div>
        </div>

        {/* Text Fields Section */}
        <div className="handel_input_fields">
          <h2 className="capitalize text-3xl mb-[3.5rem] mt-[4.5rem]">
            Change Text
          </h2>
          <div className="flex flex-col gap-6">
            {[
              {
                id: 1,
                label: "Position AR",
                name: "position_ar",
                placeholder: "Arabic position",
              },
              {
                id: 2,
                label: "Position EN",
                name: "position_en",
                placeholder: "English position",
              },
              {
                id: 3,
                label: "Name AR",
                name: "name_ar",
                placeholder: "Arabic name",
              },
              {
                id: 4,
                label: "Name EN",
                name: "name_en",
                placeholder: "English name",
              },
              {
                id: 5,
                label: "linked in Link",
                name: "linkedin",
                placeholder: "linked in url",
              },
            ].map(({ id, name, placeholder, label }) => (
              <div key={id}>
                <label
                  htmlFor={name}
                  className="block text-gray-700 text-xl font-medium mb-2 capitalize "
                >
                  {label}
                </label>
                <TextInput
                  name={name}
                  onChange={handleTextChange}
                  placeholder={placeholder}
                />
              </div>
            ))}

            {error ? (
              // Display error message if exists
              <div>{error}</div>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-10">
          <button
            type="submit"
            className="submit_btn mx-auto text-white px-4 py-2 mt-4 rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default InsertForm;
