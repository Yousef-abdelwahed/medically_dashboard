import React from "react";

const Requests = () => {
  const { fetchData } = useData();

  // Base API
  const domainURL = API_BASE_URL_NIA_Ads;
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
    ] = await axios.all([
      fetchData(API_BASE_URL_NIA_Group, `contact`),
      fetchData(API_BASE_URL_NIA_Solution, "contacts"),
      fetchData(API_BASE_URL_NIA_Ads, "contacts"),
    ]);
    const solutionContactData = [solutionContactRequest].map((item) => ({
      ...item,
      apiSource: "Group",
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
    const url =
      apiSource === "group"
        ? `${API_BASE_URL_NIA_Group}/contact/${id}`
  

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
  return <>   <section id="nia_home_page_table" className="flex flex-col gap-8 mt-10">
  <h2 className="text-lg md:text-xl xl:text-3xl capitalize font-medium">
    nia group
  </h2>
  {!isPending && (
    <CustomerTableComponent
      data={groupContactData}
      baseImg={""}
      tableHeader={tableGroupHeader}
      deleteRow={handleDelete}
      apiSource="group"
    />
  )}
</section></>;
};

export default Requests;
