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
      const initialTextValues = {
        text_ar: data.text_ar || "",
        text_en: data.text_en || "",
        text1_ar: data.text1_ar || "",
        text1_en: data.text1_en || "",
        position_en: data.position_en || "",
        position_ar: data.position_ar || "",
        name_ar: data.name_en || "",
        name_en: data.name_ar || "",
        caption: data.caption || "",
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
      {data ? (
        <EditFormData
          textValues={textValues}
          toast={toast}
          handleImageChange={handleImageChange}
          fileImgs={fileImgs}
          navigate={navigate}
          handleTextChange={handleTextChange}
          imagesData={imagesData}
        />
      ) : (
        <InsertForm
          textValues={textValues}
          toast={toast}
          navigate={navigate}
          handleTextChange={handleTextChange}
          imagesData={imagesData}
        />
      )}
    </section>
  );
};

export default EditData;
