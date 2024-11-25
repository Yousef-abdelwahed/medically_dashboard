import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE, API_IMG } from "../../../api/api";
import { useData } from "../../../context/DataContext";
import TableComponent from "../../../components/TableComponent/TableComponent";

const HomeMedically = () => {
  const { fetchData } = useData();
  const baseImg = API_IMG;
  const navigate = useNavigate();
  const tableGroupHeader = ["Section", "Image", "Text", "Action"];
  const tableGroupTeamHeader = ["name", "Image", "position", "Action"];

  const fetchAllData = async (fetchData: any) => {
    const [
      bannerResponse,
      addressResponse,
      aboutUsResponse,
      whyDocRequest,
      certificateRequest,
      reviewsRequest,
      questionsRequest,
      servicesRequest,
    ] = await axios.all([
      fetchData(API_BASE, `banners`),
      fetchData(API_BASE, "address"),
      fetchData(API_BASE, "whydoc"),
      fetchData(API_BASE, "certifications"),
      fetchData(API_BASE, "offers"),
      fetchData(API_BASE, "reviews"),
      fetchData(API_BASE, "questions"),
      fetchData(API_BASE, "services"),
    ]);
    const bannerData = [bannerResponse[0]].map((item) => ({
      ...item,
      apiSource: "banners",
    }));
    const addressData = [addressResponse[0]].map((item) => ({
      ...item,
      apiSource: "address",
    }));
    const aboutUsData = [aboutUsResponse[0]].map((item) => ({
      ...item,
      apiSource: "whydoc",
    }));
    const whyDocData = [whyDocRequest[0]].map((item) => ({
      ...item,
      apiSource: "certifications",
    }));
    const certificateData = [certificateRequest[0]].map((item) => ({
      ...item,
      apiSource: "offers",
    }));
    const reviewsData = [reviewsRequest[0]].map((item) => ({
      ...item,
      apiSource: "reviews",
    }));
    const questionsData = [questionsRequest[0]].map((item) => ({
      ...item,
      apiSource: "questions",
    }));
    const servicesData = [servicesRequest[0]].map((item) => ({
      ...item,
      apiSource: "services",
    }));

    return {
      bannerData,
      addressData,
      aboutUsData,
      whyDocData,
      certificateData,
      reviewsData,
      questionsData,
      servicesData,
    };
  };

  // react query
  const { data, isLoading, error, isPending } = useQuery({
    queryKey: ["homePageData"],
    queryFn: () => fetchAllData(fetchData),
    staleTime: 200,
  });
  const {
    bannerData,
    addressData,
    aboutUsData,
    whyDocData,
    certificateData,
    reviewsData,
    questionsData,
    servicesData,
  } = data || {};
  if (isLoading) {
    return "loading";
  }
  const mergedData = [
    bannerData,

    aboutUsData,
    whyDocData,
    certificateData,
    reviewsData,
    questionsData,
    servicesData,
  ];
  const editDataRow = (data: any) => {
    const { id, apiSource, img } = data;
    if (apiSource === "banners") {
      navigate(`../banners/${id}`, { state: { data } });
    } else if (apiSource === "whydoc") {
      navigate(`../whydoc/${id}`, { state: { data } });
    } else if (apiSource === "certifications") {
      navigate(`../certifications/${id}`, { state: { data } });
    } else if (apiSource === "offers") {
      navigate(`../offers/${id}`, { state: { data } });
    } else if (apiSource === "questions") {
      navigate(`../questions/${id}`, { state: { data } });
    } else if (apiSource === "services") {
      navigate(`../services/${id}`, { state: { data } });
    }
  };
  const deleteItem = async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE}/${id}`);
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const insertMember = async (type) => {
    navigate(`../insert/${type}`);
  };
  return (
    <div className=" h-[80vh]  container">
      <section id="nia_home_page_table" className="flex flex-col gap-8">
        <h2 className="text-lg md:text-xl xl:text-3xl capitalize font-medium ">
          home page
        </h2>
        {!isPending && (
          <TableComponent
            data={mergedData}
            baseImg={baseImg}
            tableHeader={tableGroupHeader}
            editAction={editDataRow}
          />
        )}
      </section>
      <section id="ads_home_page_table" className="flex flex-col gap-8 mt-20">
        <div className="flex justify-between">
          <h2 className="text-lg md:text-xl xl:text-3xl capitalize font-medium">
            Address
          </h2>
        </div>
        <TableComponent
          data={addressData}
          baseImg={baseImg}
          tableHeader={tableGroupTeamHeader}
          editAction={editDataRow}
          deleteItem={deleteItem}
        />
      </section>
    </div>
  );
};

export default HomeMedically;