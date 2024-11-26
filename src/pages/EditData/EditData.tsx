import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditFormData from "./components/editForm/EditFormData";

interface ITextData {
  text_ar?: string;
  text_en?: string;
  title_ar?: string;
  title_en?: string;
  desc_ar?: string;
  desc_en?: string;
  add_ar?: string;
  add_en?: string;
  phone?: string;
  schedule_ar?: string;
  schedule_en?: string;
  qualification1_ar?: string;
  qualification1_en?: string;
  qualification2_ar?: string;
  qualification2_en?: string;
  qualification3_ar?: string;
  qualification3_en?: string;
  qualification4_ar?: string;
  qualification4_en?: string;
  caption_ar?: string;
  caption_en?: string;
  name_ar?: string;
  name_en?: string;
  question_ar?: string;
  question_en?: string;
  answer_ar?: string;
  answer_en?: string;
  [key: string]: any; // Allow dynamic category fields
}

interface IImageData {
  img?: string;
  img1?: string;
  img2?: string;
  img_path?: string;
  images?: string;
}

const EditData = () => {
  const [fileImgs, setFileImgs] = useState<File[]>([]);
  const [textValues, setTextValues] = useState<ITextData>({});
  const [imagesData, setImagesData] = useState<IImageData>({});
  const navigate = useNavigate();
  const { type, id } = useParams<{ type: string; id: string }>();
  const location = useLocation();
  const toast = useToast();
  const { data } = location.state || {};

  // Utility function to initialize text values
  const initializeTextValues = (data: any, type: string): ITextData => {
    if (type === "services") {
      const categoriesData = data?.categories?.reduce(
        (acc: any, category: any) => {
          acc[category.id] = {
            name_ar: category.name_ar || "",
            name_en: category.name_en || "",
            desc_ar: category.desc_ar || "",
            desc_en: category.desc_en || "",
          };
          return acc;
        },
        {}
      );

      return {
        title_ar: data.title_ar || "",
        title_en: data.title_en || "",
        desc_ar: data.desc_ar || "",
        desc_en: data.desc_en || "",
        cat: { ...categoriesData },
      };
    }

    // Default initialization for other types
    return {
      text_ar: data.text_ar || "",
      text_en: data.text_en || "",
      title_ar: data.title_ar || "",
      title_en: data.title_en || "",
      desc_ar: data.desc_ar || "",
      desc_en: data.desc_en || "",
      add_ar: data.add_ar || "",
      add_en: data.add_en || "",
      phone: data.phone || "",
      schedule_ar: data.schedule_ar || "",
      schedule_en: data.schedule_en || "",
      qualification1_ar: data.qualification1_ar || "",
      qualification1_en: data.qualification1_en || "",
      qualification2_ar: data.qualification2_ar || "",
      qualification2_en: data.qualification2_en || "",
      qualification3_ar: data.qualification3_ar || "",
      qualification3_en: data.qualification3_en || "",
      qualification4_ar: data.qualification4_ar || "",
      qualification4_en: data.qualification4_en || "",
      caption_ar: data.caption_ar || "",
      caption_en: data.caption_en || "",
      name_ar: data.name_ar || "",
      name_en: data.name_en || "",
      question_ar: data.question_ar || "",
      question_en: data.question_en || "",
      answer_ar: data.answer_ar || "",
      answer_en: data.answer_en || "",
    };
  };

  // Utility function to initialize image values
  const initializeImageValues = (data: any): IImageData => ({
    img: data.img || "",
    img1: data.img1 || "",
    img2: data.img2 || "",
    img_path: data.img_path || "",
    images: data.images || "",
  });

  useEffect(() => {
    if (data) {
      setTextValues(initializeTextValues(data, type || ""));
      setImagesData(initializeImageValues(data));
    }
  }, [data, type]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTextValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    imgKey: string
  ) => {
    const files = e.target.files;
    if (files) {
      setFileImgs((prevImgs) => ({
        ...prevImgs,
        [imgKey]: files[0], // Dynamically set the image for 'img', 'img1', or 'img2'
      }));
    }
  };
  return (
    <section className="container">
      <h1 className="capitalize text-[40px]">{type}</h1>
      {data && (
        <EditFormData
          textValues={textValues}
          toast={toast}
          handleImageChange={handleImageChange}
          fileImgs={fileImgs}
          navigate={navigate}
          handleTextChange={handleTextChange}
          imagesData={imagesData}
          catServices={textValues.cat}
        />
      )}
    </section>
  );
};

export default EditData;
