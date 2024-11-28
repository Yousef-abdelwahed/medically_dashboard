import React from "react";
import { Th } from "@chakra-ui/react";
interface TableHeaderProps {
  type: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ type }) => {
  switch (type) {
    case "banners":
      return (
        <>
          <Th>image</Th>
          <Th>text (EN)</Th>
          <Th>text (AR)</Th>
          <Th>Title (EN)</Th>
          <Th>Title (AR)</Th>
          <Th>Active</Th>
        </>
      );
    case "questions":
      return (
        <>
          <Th>Question (EN)</Th>
          <Th>Question (AR)</Th>
          <Th>Answer (EN)</Th>
          <Th>Answer (AR)</Th>
        </>
      );
    case "address":
      return (
        <>
          <Th>Address (EN)</Th>
          <Th>Address (AR)</Th>
          <Th>schedule (EN)</Th>
          <Th>schedule (AR)</Th>
          <Th>phone</Th>
        </>
      );
    case "categories":
      return (
        <>
          <Th>services (EN)</Th>
          <Th>services (AR)</Th>
          <Th>description (EN)</Th>
          <Th>description (AR)</Th>
        </>
      );
    case "services":
      return (
        <>
          <Th>title (EN)</Th>
          <Th>title (AR)</Th>
          <Th>text (EN)</Th>
          <Th>text (AR)</Th>
        </>
      );

    default:
      return null;
  }
};

export default TableHeader;
