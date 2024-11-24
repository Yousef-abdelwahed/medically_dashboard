import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL_NIA_Group, API_IMG_GROUP } from "../../../api/api";
import { useData } from "../../../context/DataContext";

const HomeMedically = () => {
  const { fetchData } = useData();
  const baseImg = API_IMG_GROUP;
  const navigate = useNavigate();
  const tableGroupHeader = ["Section", "Image", "Text", "Action"];
  const tableGroupTeamHeader = ["name", "Image", "position", "Action"];

  const fetchAllData = async (fetchData: any) => {
    const [bannerResponse, aboutUsResponse, teams] = await axios.all([
      fetchData(API_BASE_URL_NIA_Group, `banners`),
      fetchData(API_BASE_URL_NIA_Group, "about_us"),
      fetchData(API_BASE_URL_NIA_Group, "teams"),
    ]);
    const bannerData = [bannerResponse[0]].map((item) => ({
      ...item,
      apiSource: "banner",
    }));
    const aboutUsData = [aboutUsResponse[0]].map((item) => ({
      ...item,
      apiSource: "about_us",
    }));
    const updatedTeamData = teams.map((item) => ({
      ...item,
      apiSource: "teams",
    }));

    return {
      bannerData,
      aboutUsData,
      ourTeamData: updatedTeamData,
    };
  };

  // react query
  const { data, isLoading, error, isPending } = useQuery({
    queryKey: ["homePageData"],
    queryFn: () => fetchAllData(fetchData),
    staleTime: 200,
  });
  const { bannerData, aboutUsData, ourTeamData } = data || {};

  if (isLoading) {
    return "loading";
  }
  const mergedData = [bannerData, aboutUsData];
  const editDataRow = (data: any) => {
    const { id, apiSource, img } = data;
    if (apiSource === "about_us") {
      navigate(`../about_us/${id}`, { state: { data } });
    } else if (apiSource === "banner") {
      navigate(`../banners/${id}`, { state: { data } });
    } else if (apiSource === "teams") {
      navigate(`../teams/${id}`, { state: { data } });
    }
  };
  const deleteItem = async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL_NIA_Group}/${id}`);
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
        {/* {!isPending && (
          <TableComponent
            data={mergedData}
            baseImg={baseImg}
            tableHeader={tableGroupHeader}
            editAction={editDataRow}
          />
        )} */}
      </section>
      {/* <section id="nia_home_page_table" className="flex flex-col gap-8 mt-20">
        <div className="flex justify-between">
          <h2 className="text-lg md:text-xl xl:text-3xl capitalize font-medium">
            our team
          </h2>
          <Button
            size="sm"
            className="mx-4"
            onClick={() => insertMember("teams")}
          >
            {customIcon.insert}
          </Button>
        </div>
        <TableComponent
          data={ourTeamData}
          baseImg={baseImg}
          tableHeader={tableGroupTeamHeader}
          editAction={editDataRow}
          deleteItem={deleteItem}
        />
      </section> */}
    </div>
  );
};

export default HomeMedically;
