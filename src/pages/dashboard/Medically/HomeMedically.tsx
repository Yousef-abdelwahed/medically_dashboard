import React from "react";

import TableEditComponent from "../../../components/TableEditeComponent/TableEditComponent";

const HomeMedically = () => {
  return (
    <div className=" h-[80vh]  container text-[#223A84]">
      <section id="ads_home_page_table" className="flex flex-col gap-8 mt-20">
        <div className="flex justify-between">
          <h2 className="text-lg md:text-xl xl:text-3xl capitalize font-medium">
            Banner
          </h2>
        </div>
        <TableEditComponent type="banners" />
      </section>
      {/*address  */}
      <section
        id="address_home_page_table"
        className="flex flex-col gap-8 mt-20"
      >
        <div className="flex justify-between">
          <h2 className="text-lg md:text-xl xl:text-3xl capitalize font-medium">
            address{" "}
          </h2>
        </div>
        <TableEditComponent type="address" />
      </section>
      {/* whydoc */}
      <section
        id="whydoc_home_page_table"
        className="flex flex-col gap-8 mt-20"
      >
        <div className="flex justify-between">
          <h2 className="text-lg md:text-xl xl:text-3xl capitalize font-medium">
            whydoc
          </h2>
        </div>
        <TableEditComponent type="whydoc" />
      </section>
      {/* certifications */}
      <section
        id="certifications_home_page_table"
        className="flex flex-col gap-8 mt-20"
      >
        <div className="flex justify-between">
          <h2 className="text-lg md:text-xl xl:text-3xl capitalize font-medium">
            certifications
          </h2>
        </div>
        <TableEditComponent type="certifications" />
      </section>
      {/* ********* */}
      {/* offers */}
      <section
        id="offers_home_page_table"
        className="flex flex-col gap-8 mt-20"
      >
        <div className="flex justify-between">
          <h2 className="text-lg md:text-xl xl:text-3xl capitalize font-medium">
            offers
          </h2>
        </div>
        <TableEditComponent type="offers" />
      </section>
      {/* reviews */}
      <section
        id="reviews_home_page_table"
        className="flex flex-col gap-8 mt-20"
      >
        <div className="flex justify-between">
          <h2 className="text-lg md:text-xl xl:text-3xl capitalize font-medium">
            reviews
          </h2>
        </div>
        <TableEditComponent type="reviews" />
      </section>
      {/* questions */}
      <section
        id="questions_home_page_table"
        className="flex flex-col gap-8 mt-20"
      >
        <div className="flex justify-between">
          <h2 className="text-lg md:text-xl xl:text-3xl capitalize font-medium">
            questions
          </h2>
        </div>
        <TableEditComponent type="questions" />
      </section>
      {/* services */}
      <section
        id="services_home_page_table"
        className="flex flex-col gap-8 mt-20"
      >
        <div className="flex justify-between">
          <h2 className="text-lg md:text-xl xl:text-3xl capitalize font-medium">
            services
          </h2>
        </div>
        <TableEditComponent type="services" />
      </section>
      {/* categories */}
      <section
        id="categories_home_page_table"
        className="flex flex-col gap-8 mt-20"
      >
        <div className="flex justify-between">
          <h2 className="text-lg md:text-xl xl:text-3xl capitalize font-medium">
            categories
          </h2>
        </div>
        <TableEditComponent type="categories" />
      </section>
    </div>
  );
};

export default HomeMedically;
