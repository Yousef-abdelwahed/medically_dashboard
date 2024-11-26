import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditFormData from "./components/editForm/EditFormData";
import InsertForm from "./components/insertForm/InsertForm";
// import useDomainURL from "../../hooks/useDomain";

interface ITextData {
  text_ar?: string;
  text_en?: string;
  text1_ar?: string;
  text1_en?: string;
  text2_ar?: string;
  text2_en?: string;
  name_ar?: string;
  name_en?: string;
  position_ar?: string;
  position_en?: string;
}

const EditData = () => {
  const [fileImgs, setFileImgs] = useState<File[]>([]);
  const [textValues, setTextValues] = useState<ITextData>({});
  const [imagesData, setImagesData] = useState({});
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState("");
  const navigate = useNavigate();

  const { type, id } = useParams();
  const location = useLocation();
  const toast = useToast();
  const { data } = location.state || {};
  useEffect(() => {
    if (data) {
      console.log(data.categories);
      const initialTextValues = {
        text_ar: data.text_ar || "",
        text_en: data.text_en || "",
        title_ar: data.title_ar || "",
        title_en: data.title_en || "",
        add_en: data.add_en || "",
        add_ar: data.add_ar || "",
        phone: data.phone || "",
        schedule_ar: data.schedule_ar || "",
        schedule_en: data.schedule_en || "",
        description_ar: data.description_ar || "",
        description_en: data.description_en || "",
        qualification1_ar: data.qualification1_ar || "",
        qualification1_en: data.qualification1_en || "",
        qualification2_ar: data.qualification2_ar || "",
        qualification2_en: data.qualification2_en || "",
        qualification3_ar: data.qualification3_ar || "",
        qualification3_en: data.qualification3_en || "",
        qualification4_ar: data.qualification4_ar || "",
        qualification4_en: data.qualification4_en || "",
        caption_en: data.caption_en || "",
        caption_ar: data.caption_ar || "",
        name_ar: data.name_ar || "",
        name_en: data.name_en || "",
        desc_ar: data.desc_ar || "",
        desc_en: data.desc_en || "",

        question_ar: data.question_ar || "",
        question_en: data.question_en || "",
        answer_ar: data.answer_ar || "",
        answer_en: data.answer_en || "",
      };

      const initialImagesData = {
        img: data.img || "",
        img1: data.img1 || "",
        img2: data.img2 || "",
        img_path: data.img_path || "",
        images: data.images || "",
      };

      setTextValues(initialTextValues);
      setImagesData(initialImagesData);
    }
  }, [data]);

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
        />
      )}
    </section>
  );
};

export default EditData;
