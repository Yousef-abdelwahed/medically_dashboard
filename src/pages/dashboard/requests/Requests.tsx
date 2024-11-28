import React from "react";
import RequestTableComponent from "./components/RequestTableComponent";
import { API_BASE } from "../../../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../context/DataContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Requests = () => {
  const { fetchData } = useData();

  // Base API
  const domainURL = API_BASE;
  // const domainImg = API_IMG_Ads;

  const navigate = useNavigate();

  const tableGroupHeader = [
    "name",
    "phone number",
    "e-mail",
    "Messages",
    "Action",
  ];
  // fetch all data
  const fetchAllData = async (fetchData: any) => {
    const [
      groupContactRequest,
      solutionContactRequest,
      adsContactsSolutionRequest,
    ] = await axios.all([fetchData(API_BASE, `contacts`)]);
    const solutionContactData = [solutionContactRequest].map((item) => ({
      ...item,
      apiSource: "contacts",
    }));
    return {
      groupContactData: groupContactRequest,
      solutionContactData: solutionContactRequest,
      adsContactsSolutionData: adsContactsSolutionRequest,
    };
  };

  // react query
  const { data, isLoading, error, isPending, refetch } = useQuery({
    queryKey: ["homePageData"],
    queryFn: () => fetchAllData(fetchData),
    staleTime: 200,
  });
  const {
    solutionContactData = [],
    groupContactData = [],
    adsContactsSolutionData = [],
  } = data || {};

  if (isLoading) {
    return "loading";
  }

  const deleteContact = async ({
    id,
    apiSource,
  }: {
    id: string;
    apiSource: string;
  }) => {
    // Determine the correct URL based on the apiSource
    const url = `${API_BASE}/contacts/${id}`;
    try {
      const response = await axios.delete(url);
      refetch();
      return response.data;
    } catch (error) {
      console.error("Error during delete request:", error);
      throw error;
    }
  };
  const handleDelete = async (id: string, apiSource: string) => {
    try {
      const result = await deleteContact({ id, apiSource });
      console.log("Successfully deleted:", result);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };
  return (
    <>
      {" "}
      <section id="nia_home_page_table" className="flex flex-col gap-8 mt-10">
        
        {!isPending && (
          <RequestTableComponent
            data={groupContactData}
            baseImg={""}
            tableHeader={tableGroupHeader}
            deleteRow={handleDelete}
            apiSource="group"
          />
        )}
      </section>
    </>
  );
};

export default Requests;
