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
          <Th>Title (EN)</Th>
          <Th>Title (AR)</Th>
          <Th>text (EN)</Th>
          <Th>text (AR)</Th>
          <Th>Active</Th>
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
    case "questions":
      return (
        <>
          <Th>Question (EN)</Th>
          <Th>Question (AR)</Th>
          <Th>Answer (EN)</Th>
          <Th>Answer (AR)</Th>
          <Th>Active</Th>
        </>
      );
    case "whydoc":
      return (
        <>
          <Th>image</Th>
          <Th>Title (EN)</Th>
          <Th>Title (AR)</Th>
          <Th>text (EN)</Th>
          <Th>text (AR)</Th>
          <Th>Active</Th>
        </>
      );
    case "certifications":
      return (
        <>
          <Th>Title (EN)</Th>
          <Th>Title (AR)</Th>
          <Th>Description (EN)</Th>
          <Th>Description (AR)</Th>
          <Th>qualification1 (EN)</Th>
          <Th>qualification1 (AR)</Th>
          <Th>qualification2 (EN)</Th>
          <Th>qualification2 (AR)</Th>
          <Th>qualification3 (EN)</Th>
          <Th>qualification3 (AR)</Th>
          <Th>qualification4 (EN)</Th>
          <Th>qualification4 (AR)</Th>
          <Th>Active</Th>
        </>
      );
    case "offers":
      return (
        <>
          <Th>image </Th>
          <Th>Title (EN)</Th>
          <Th>Title (AR)</Th>
          <Th>text (EN)</Th>
          <Th>text (AR)</Th>
          <Th>caption (EN)</Th>
          <Th>caption (AR)</Th>
          <Th>Description (EN)</Th>
          <Th>Description (AR)</Th>
          <Th>Active</Th>
        </>
      );
    case "reviews":
      return (
        <>
          <Th>image </Th>
          <Th>Title (EN)</Th>
          <Th>Title (AR)</Th>
          <Th>text (EN)</Th>
          <Th>text (AR)</Th>
          <Th>name (EN)</Th>
          <Th>name (AR)</Th>
          <Th>description (EN)</Th>
          <Th>description (AR)</Th>
          <Th>Active</Th>
        </>
      );

    case "services":
      return (
        <>
          <Th>services (EN)</Th>
          <Th>services (AR)</Th>
          <Th>description (EN)</Th>
          <Th>description (AR)</Th>
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
