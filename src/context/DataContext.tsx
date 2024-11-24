import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

interface DataContextProps {
  fetchData: (baseURL: string, endPoint: string) => Promise<any>;
}
// create provider
const DataContext = createContext<DataContextProps | undefined>(undefined);
// create a component

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //  fetch data
  const fetchData = useCallback(
    async (baseURL: string, endPoint: string, header?: string) => {
      try {
        const response = await axios.get(`${baseURL}/${endPoint}`, {
          params: {
            type: header,
          },
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to fetch from ${endPoint}:`, error);
        throw new Error(`Error fetching data from ${endPoint}`);
      }
    },
    []
  );

  return (
    <DataContext.Provider value={{ fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the DataContext
export const useData = () => {
  // component provider
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
