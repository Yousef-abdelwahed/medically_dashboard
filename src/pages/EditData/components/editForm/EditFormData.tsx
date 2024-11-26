import { Image } from "@chakra-ui/react";
import axios from "axios";
import React, { Fragment } from "react";
import { FiUpload } from "react-icons/fi";
import { useParams } from "react-router-dom";
import useDomainURL from "../../../../hooks/useDomain";
import TextInput from "../TextInput/TextInput";
import { API_BASE, API_IMG } from "../../../../api/api";

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
  const { type, id } = useParams();
  function keyChecker(formData, imagesData) {
    console.log(fileImgs);
    if (fileImgs["img"]) {
      formData.append("img", fileImgs["img"]);
    }
    // else if (fileImgs["img1"] && !fileImgs["img2"]) {
    //   formData.append("img1", fileImgs["img1"]); // Case 2: Only 'img1' key
    // } else if (fileImgs["img2"] && !fileImgs["img1"]) {
    //   formData.append("img2", fileImgs["img2"]); // Case 2: Only 'img2 fsasd ' key
    // } else if (fileImgs["img1"] && fileImgs["img2"]) {
    //   formData.append("img1", fileImgs["img1"]); // Case 3: Both 'img1' and 'img2' keys
    //   formData.append("img2", fileImgs["img2"]);
    // } else if (fileImgs["img_path"]) {
    //   formData.append("img_path", fileImgs["img_path"]);
    // } else if (fileImgs["images"]) {
    //   formData.append("images", fileImgs["images"]);
    // }
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

      await axios.post(`${API_BASE}/${type}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        params: { _method: "PATCH" },
      });

      toast({
        title: "Data updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(-1);
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
    const commonFields = [
      {
        id: 1,
        label: "ar",
        name: "text_ar",
        value: textValues.text_ar,
        placeholder: "text_ar Arabic Text",
      },
      {
        id: 2,
        label: "en",
        name: "text_en",
        value: textValues.text_en,
        placeholder: "text_en English Text",
      },
      {
        id: 3,
        label: "title_ar",
        name: "title_ar",
        value: textValues.title_ar,
        placeholder: "Arabic Text",
      },
      {
        id: 4,
        label: "en",
        name: "title_en",
        value: textValues.title_en,
        placeholder: "English Text",
      },
    ];

    const certificationsFields = [
      {
        id: 5,
        label: "title (AR)",
        name: "title_ar",
        value: textValues.title_ar,
        placeholder: "title Arabic Text",
      },
      {
        id: 6,
        label: "title (EN)",
        name: "title_en",
        value: textValues.title_en,
        placeholder: "title English Text",
      },
      {
        id: 7,
        label: "description (AR)",
        name: "description_ar",
        value: textValues.description_ar,
        placeholder: "description_ar Arabic Text",
      },
      {
        id: 15,
        label: "description (EN)",
        name: "description_en",
        value: textValues.description_en,
        placeholder: "description_ar Arabic Text",
      },
      {
        id: 13,
        label: "description (AR)",
        name: "qualification1_ar",
        value: textValues.qualification1_ar,
        placeholder: "qualification1_ar English Text",
      },
      {
        id: 14,
        label: "description (EN)",
        name: "qualification1_en",
        value: textValues.qualification1_en,
        placeholder: "qualification1_en English Text",
      },
      {
        id: 8,
        label: "qualification2 (AR)",
        name: "qualification2_ar",
        value: textValues.qualification2_ar,
        placeholder: "description_en English Text",
      },
      {
        id: 8,
        label: "qualification2 (EN)",
        name: "qualification2_en",
        value: textValues.qualification2_en,
        placeholder: "description_en English Text",
      },
      {
        id: 9,
        label: "qualification3 (AR)",
        name: "qualification3_ar",
        value: textValues.qualification3_ar,
        placeholder: "qualification3_ar English Text",
      },
      {
        id: 10,
        label: "en",
        name: "qualification3 (EN)",
        value: textValues.qualification3_en,
        placeholder: "qualification3_en English Text",
      },
      {
        id: 11,
        label: "ar",
        name: "qualification4 (AR)",
        value: textValues.qualification4_ar,
        placeholder: "qualification4_ar English Text",
      },
      {
        id: 12,
        label: "en",
        name: "qualification4 (EN)",
        value: textValues.qualification4_en,
        placeholder: "qualification4_en English Text",
      },
    ];
    const offersFields = [
      {
        id: 5,
        label: "caption (AR)",
        name: "caption_ar",
        value: textValues.caption_ar,
        placeholder: "caption_ar Arabic Text",
      },
      {
        id: 7,
        label: "caption (EN)",
        name: "caption_en",
        value: textValues.caption_en,
        placeholder: "caption_en Arabic Text",
      },
      {
        id: 6,
        label: "description (AR)",
        name: "description_ar",
        value: textValues.description_ar,
        placeholder: "description_ar English Text",
      },

      {
        id: 15,
        label: "description (EN)",
        name: "description_en",
        value: textValues.description_en,
        placeholder: "description_en Arabic Text",
      },
    ];

    //
    const servicesFields = [
      {
        id: 5,
        label: "title (Ar)",
        name: "title_ar",
        value: textValues.title_ar,
        placeholder: "title_ar Arabic Text",
      },
      {
        id: 7,
        label: "title (En)",
        name: "title_en",
        value: textValues.title_en,
        placeholder: "title_en Arabic Text",
      },
      {
        id: 6,
        label: "description (Ar)",
        name: "desc_ar",
        value: textValues.desc_ar,
        placeholder: "desc_ar English Text",
      },

      {
        id: 15,
        label: "description (En)",
        name: "desc_en",
        value: textValues.desc_en,
        placeholder: "desc_en Arabic Text",
      },
      // {
      //   id: 15,
      //   label: "name (En)",
      //   name: "name_en",
      //   value: textValues.name_en,
      //   placeholder: "name_en Arabic Text",
      // },
    ];
    const textFields =
      type === "banners" || type === "whydoc"
        ? commonFields
        : type === "certifications"
        ? [...certificationsFields]
        : type === "offers"
        ? [...commonFields, ...offersFields]
        : type === "services"
        ? [servicesFields]
        : "";

    // switch (true) {
    //   case !!textValues.text_ar || !!textValues.text_en:
    //     textFields = [
    //       {
    //         label: "arabic",
    //         name: "text_ar",
    //         value: textValues.text_ar || "",
    //         placeholder: "Arabic Text",
    //       },
    //       {
    //         label: "english",
    //         name: "text_en",
    //         value: textValues.text_en || "",
    //         placeholder: "English Text",
    //       },
    //     ];
    //     break;

    //   case !!textValues.text1_ar || !!textValues.text1_en:
    //     textFields = [
    //       {
    //         label: "arabic",

    //         name: "text1_ar",
    //         value: textValues.text1_ar,
    //         placeholder: "Additional Arabic Text 1",
    //       },
    //       {
    //         label: "english",
    //         name: "text1_en",
    //         value: textValues.text1_en,
    //         placeholder: "Additional English Text 1",
    //       },
    //     ];
    //     break;

    //   case !!textValues.text2_ar || !!textValues.text2_en:
    //     textFields = [
    //       {
    //         label: "arabic",
    //         name: "text2_ar",
    //         value: textValues.text2_ar,
    //         placeholder: "Additional Arabic Text 2",
    //       },
    //       {
    //         label: "english",
    //         name: "text2_en",
    //         value: textValues.text2_en,
    //         placeholder: "Additional English Text 2",
    //       },
    //     ];
    //     break;
    //   case !!textValues.position_ar || !!textValues.position_en:
    //     textFields = [
    //       {
    //         label: "position Ar",
    //         name: "position_ar",
    //         value: textValues.position_ar,
    //         placeholder: "Additional Arabic Text 2",
    //       },
    //       {
    //         label: "position En",
    //         name: "position_en",
    //         value: textValues.position_en,
    //         placeholder: "Additional English Text 2",
    //       },
    //       {
    //         label: "name Ar ",
    //         name: "name_ar",
    //         value: textValues.name_ar,
    //         placeholder: "Additional Arabic Text 2",
    //       },
    //       {
    //         label: "name En",
    //         name: "name_en",
    //         value: textValues.name_en,
    //         placeholder: "Additional English Text 2",
    //       },
    //     ];
    //     break;
    //   case !!textValues.caption:
    //     textFields = [
    //       {
    //         label: "caption",
    //         name: "caption",
    //         value: textValues.caption,
    //         placeholder: "Caption Text",
    //       },
    //     ];
    //     break;
    //   default:
    //     textFields = [];
    //     break;
    // }
    console.log(textFields[0]);
    return type === "services"
      ? textFields[0]?.map(({ name, value, placeholder, label, id }) => {
          return (
            <div key={placeholder} className="">
              <label
                htmlFor={name}
                className=" text-gray-700 text-xl font-medium mb-2 capitalize "
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
            </div>
          );
        })
      : textFields?.map(({ name, value, placeholder, label, id }) => {
          return (
            <div key={placeholder} className="">
              <label
                htmlFor={name}
                className=" text-gray-700 text-xl font-medium mb-2 capitalize "
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
            </div>
          );
        });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="">
        {/* Image Upload Section */}
        {!Object.values(imagesData).every((value) => value === "") && (
          <div className="bg-white rounded-lg shadow-md p-10 mt-10 ">
            <h2 className="capitalize text-3xl mb-[3.5rem] ">Change Images</h2>
            <div className="edit_Img flex flex-col justify-start gap-4">
              <div className="image_container flex w-full gap-5 relative  ">
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
                              : `${API_IMG}${imagesData[imgKey]}` // Display existing image if no new file uploaded
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
        )}

        {/* Text Fields Section */}
        <div className="handel_input_fields bg-white p-4 rounded-lg shadow-md mt-10">
          {renderTextFields() && (
            <h2 className="capitalize text-3xl mb-[3.5rem] mt-[4.5rem]">
              Change Text
            </h2>
          )}

          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
            {renderTextFields()}
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

export default EditFormData;
