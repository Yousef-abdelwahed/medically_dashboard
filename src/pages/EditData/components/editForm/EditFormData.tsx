import { Image } from "@chakra-ui/react";
import axios from "axios";
import React, { Fragment } from "react";
import { FiUpload } from "react-icons/fi";
import { useParams } from "react-router-dom";
import useDomainURL from "../../../../hooks/useDomain";
import TextInput from "../TextInput/TextInput";

const EditFormData = ({
  handleImageChange,
  toast,
  textValues,
  fileImgs,
  navigate,
  handleTextChange,
  imagesData,
}) => {
  const [loading, setLoading] = React.useState(false);
  // Base URl
  const { domainImg, domainURL } = useDomainURL();
  const { type, id } = useParams();
  console.log(type);
  function keyChecker(formData, imagesData) {
    if (fileImgs["img"]) {
      formData.append("img", fileImgs["img"]); // Case 1: Only 'img' key
    } else if (fileImgs["img1"] && !fileImgs["img2"]) {
      formData.append("img1", fileImgs["img1"]); // Case 2: Only 'img1' key
    } else if (fileImgs["img2"] && !fileImgs["img1"]) {
      formData.append("img2", fileImgs["img2"]); // Case 2: Only 'img2 fsasd ' key
    } else if (fileImgs["img1"] && fileImgs["img2"]) {
      formData.append("img1", fileImgs["img1"]); // Case 3: Both 'img1' and 'img2' keys
      formData.append("img2", fileImgs["img2"]);
    } else if (fileImgs["img_path"]) {
      formData.append("img_path", fileImgs["img_path"]);
    } else if (fileImgs["images"]) {
      formData.append("images", fileImgs["images"]);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(textValues).forEach(([key, value]) => {
        formData.append(key, value);
      });

      keyChecker(formData, imagesData);

      await axios.post(`${domainURL}/${type}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        params: { _method: "PATCH" },
      });

      toast({
        title: "Data updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(-2);
    } catch (error) {
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      toast({
        title: "Error updating data.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderTextFields = () => {
    // type === "banners" && {
    //   label: "arabic",
    //   name: "text_ar",
    //   value: textValues.text_ar,
    //   placeholder: "Arabic Text",
    // },
    // {
    //   label: "english",
    //   name: "text_en",
    //   value: textValues.text_en,
    //   placeholder: "English Text",
    // },
    // type === "about_us" && {
    //   label: "arabic",
    //   name: "text_ar",
    //   value: textValues.text_ar,
    //   placeholder: "Arabic Text",
    // },
    // {
    //   label: "english",
    //   name: "text_en",
    //   value: textValues.text_en,
    //   placeholder: "English Text",
    // },
    let textFields: {} = [];
    switch (true) {
      case !!textValues.text_ar || !!textValues.text_en:
        textFields = [
          {
            label: "arabic",
            name: "text_ar",
            value: textValues.text_ar || "",
            placeholder: "Arabic Text",
          },
          {
            label: "english",
            name: "text_en",
            value: textValues.text_en || "",
            placeholder: "English Text",
          },
        ];
        break;

      case !!textValues.text1_ar || !!textValues.text1_en:
        textFields = [
          {
            label: "arabic",

            name: "text1_ar",
            value: textValues.text1_ar,
            placeholder: "Additional Arabic Text 1",
          },
          {
            label: "english",
            name: "text1_en",
            value: textValues.text1_en,
            placeholder: "Additional English Text 1",
          },
        ];
        break;

      case !!textValues.text2_ar || !!textValues.text2_en:
        textFields = [
          {
            label: "arabic",
            name: "text2_ar",
            value: textValues.text2_ar,
            placeholder: "Additional Arabic Text 2",
          },
          {
            label: "english",
            name: "text2_en",
            value: textValues.text2_en,
            placeholder: "Additional English Text 2",
          },
        ];
        break;
      case !!textValues.position_ar || !!textValues.position_en:
        textFields = [
          {
            label: "position Ar",
            name: "position_ar",
            value: textValues.position_ar,
            placeholder: "Additional Arabic Text 2",
          },
          {
            label: "position En",
            name: "position_en",
            value: textValues.position_en,
            placeholder: "Additional English Text 2",
          },
          {
            label: "name Ar ",
            name: "name_ar",
            value: textValues.name_ar,
            placeholder: "Additional Arabic Text 2",
          },
          {
            label: "name En",
            name: "name_en",
            value: textValues.name_en,
            placeholder: "Additional English Text 2",
          },
        ];
        break;
      case !!textValues.caption || !textValues.caption:
        textFields = [
          {
            label: "caption",
            name: "caption",
            value: textValues.caption,
            placeholder: "Caption Text",
          },
        ];
        break;
      default:
        textFields = [];
        break;
    }
    return textFields?.map(({ name, value, placeholder, label }) => {
      return (
        <Fragment key={label}>
          <label
            htmlFor={name}
            className="block text-gray-700 text-xl font-medium mb-2 capitalize "
          >
            {label}
          </label>
          <TextInput
            key={name}
            name={name}
            value={value || ""}
            onChange={handleTextChange}
            placeholder={placeholder}
          />
        </Fragment>
      );
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div>
          <h2 className="capitalize text-3xl mb-[3.5rem] ">Change Images</h2>
          <div className="edit_Img flex flex-col justify-start gap-4">
            <div className="image_container flex w-full gap-5 relative">
              {Object.keys(imagesData).map((imgKey, index) => {
                return (
                  imagesData[imgKey] && (
                    <div
                      key={index}
                      className="mt-4 edit_Img relative w-[180px] h-[180px] bg-black overflow-hidden"
                    >
                      {/* Image Upload Input */}
                      <input
                        type="file"
                        onChange={(e) => handleImageChange(e, imgKey)}
                        accept="image/*"
                        style={{ display: "none" }}
                        id={`imageUpload-${index}`}
                      />

                      {/* Label with upload icon */}
                      <label
                        htmlFor={`imageUpload-${index}`}
                        className="absolute z-10 cursor-pointer"
                      >
                        <FiUpload size={50} color="white" />
                      </label>

                      {/* Display the uploaded file preview or existing image */}
                      <Image
                        boxSize="180px"
                        objectFit="cover"
                        src={
                          fileImgs[imgKey] // Display the uploaded file
                            ? URL.createObjectURL(fileImgs[imgKey])
                            : `${domainImg}${imagesData[imgKey]}` // Display existing image if no new file uploaded
                        }
                        alt={`Image ${index + 1}`}
                        borderRadius="md"
                        boxShadow="lg"
                      />
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>

        {/* Text Fields Section */}
        <div className="handel_input_fields">
          {renderTextFields() && (
            <h2 className="capitalize text-3xl mb-[3.5rem] mt-[4.5rem]">
              Change Text
            </h2>
          )}

          <div className="flex flex-col gap-6">{renderTextFields()}</div>
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

export default EditFormData;
