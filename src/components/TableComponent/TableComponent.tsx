import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Image,
  TableContainer,
  Flex,
  Text,
} from "@chakra-ui/react";
import { customIcon } from "../../assets/icons/customIcon";
import { motion, AnimatePresence } from "framer-motion";

interface IProps {
  data: object[];
  baseImg?: string;
  tableHeader: string[];
  editAction: (data: any) => void;
  openModal?: (data: any) => void;
}

const TableComponent = ({
  data,
  baseImg = "",
  tableHeader,
  editAction,
  openModal,
}: IProps) => {
  return (
    <Box p={4} overflowX="auto" className="tableLayout">
      <TableContainer>
        <Table variant="simple" size="sm">
          {/* Table Headers */}
          <Thead>
            <Tr>
              {tableHeader?.map((tbHeader, index) => (
                <Th
                  key={index}
                  fontSize={{ base: "12px", md: "16px" }}
                  fontWeight={500}
                  px={{ base: 2, md: 4 }}
                >
                  {tbHeader}
                </Th>
              ))}
            </Tr>
          </Thead>

          {/* Table Body */}
          <Tbody>
            <AnimatePresence>
              {data?.map((row, index) => {
                const isRowArray = Array.isArray(row);
                const rowData = isRowArray && row.length > 0 ? row[0] : row;
                const {
                  apiSource,
                  img,
                  img1,
                  img2,
                  img_path,
                  images,
                  text1_en,
                  text_en,
                  name_ar,
                  position_ar,
                } = rowData || {};
                const reduceText = (text: string) =>
                  text?.split(" ").slice(0, 4).join(" ");

                // Handle images
                const allImages = images?.length
                  ? images
                  : [img, img1, img2, img_path].filter(Boolean);

                const maxImagesToShow = 3;
                const remainingImages = allImages.length - maxImagesToShow;

                return (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Column 1: Name */}
                    <Td
                      fontSize={{ base: "12px", md: "14px" }}
                      px={{ base: 2, md: 4 }}
                    >
                      {name_ar || apiSource}
                    </Td>

                    {/* Column 2: Images */}
                    <Td>
                      <Flex alignItems="center" wrap="wrap" gap={2}>
                        {allImages
                          .slice(0, maxImagesToShow)
                          .map((image, imgIndex) => (
                            <Image
                              key={imgIndex}
                              borderRadius="full"
                              boxSize={{ base: "30px", md: "50px" }}
                              objectFit="cover"
                              src={`${baseImg}/${image}`}
                              alt={`Image ${imgIndex + 1}`}
                              loading="lazy"
                            />
                          ))}
                        {remainingImages > 0 && (
                          <Text fontSize={{ base: "10px", md: "14px" }}>
                            +{remainingImages}
                          </Text>
                        )}
                      </Flex>
                    </Td>

                    {/* Column 3: Text */}
                    <Td
                      fontSize={{ base: "10px", md: "14px" }}
                      px={{ base: 2, md: 4 }}
                    >
                      {reduceText(text_en) ||
                        reduceText(text1_en) ||
                        position_ar}
                    </Td>

                    {/* Column 4: Actions */}
                    <Td>
                      <Flex gap={2}>
                        <Button
                          size="sm"
                          onClick={() => editAction(row[0] || row)}
                          fontSize={{ base: "10px", md: "12px" }}
                        >
                          {customIcon.editIcon}
                        </Button>
                        {data[0]?.apiSource === "teams" && (
                          <Button
                            size="sm"
                            onClick={() => openModal?.(row.id)}
                            fontSize={{ base: "10px", md: "12px" }}
                          >
                            {customIcon.deleteIcon}
                          </Button>
                        )}
                      </Flex>
                    </Td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
