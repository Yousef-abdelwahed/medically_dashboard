import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

const RequestTableComponent = ({
  data,
  tableHeader,
  deleteRow = () => {},
  apiSource,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal hooks
  const [selectedRow, setSelectedRow] = React.useState<any>(null);
  const [currentPage, setCurrentPage] = React.useState(1); // State to track current page
  const rowsPerPage = 5; // Number of rows per page
  const [searchTerm, setSearchTerm] = React.useState(""); // State for search term
  const [sortConfig, setSortConfig] = React.useState<{
    key: string | null;
    direction: "asc" | "desc" | null;
  }>({
    key: null,
    direction: null,
  });

  // Handle opening the delete modal
  const handleDeleteClick = (row: any) => {
    setSelectedRow(row);
    onOpen();
  };

  // Handle confirming the delete action
  const handleConfirmDelete = () => {
    if (selectedRow) {
      deleteRow(selectedRow.id, apiSource); // Call the deleteRow function
      onClose(); // Close the modal after deletion
    }
  };

  // Filtered data based on the search term
  const filteredData = React.useMemo(() => {
    return data?.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Calculate paginated data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData?.slice(indexOfFirstRow, indexOfLastRow);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Total number of pages
  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);

  // Handle sorting of columns
  const handleSort = (column: string) => {
    const direction = sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key: column, direction });
  };

  // Sort data based on the selected column and direction
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  return (
    <>
      <Box p={4} overflowX="scroll" className="">
        {/* Search Field */}
        <Flex
          mb={4}
          justifyContent="space-between"
          rounded={"50%"}
          className="pb-10"
        >
          <InputGroup width="300px" className="mx-auto ">
            <InputLeftElement pointerEvents="none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11 20.75C5.62 20.75 1.25 16.38 1.25 11C1.25 5.62 5.62 1.25 11 1.25C16.38 1.25 20.75 5.62 20.75 11C20.75 16.38 16.38 20.75 11 20.75ZM11 2.75C6.45 2.75 2.75 6.45 2.75 11C2.75 15.55 6.45 19.25 11 19.25C15.55 19.25 19.25 15.55 19.25 11C19.25 6.45 15.55 2.75 11 2.75Z"
                  fill="#223A84"
                />
                <path
                  d="M20.1601 22.79C20.0801 22.79 20.0001 22.78 19.9301 22.77C19.4601 22.71 18.6101 22.39 18.1301 20.96C17.8801 20.21 17.9701 19.46 18.3801 18.89C18.7901 18.32 19.4801 18 20.2701 18C21.2901 18 22.0901 18.39 22.4501 19.08C22.8101 19.77 22.7101 20.65 22.1401 21.5C21.4301 22.57 20.6601 22.79 20.1601 22.79ZM19.5601 20.49C19.7301 21.01 19.9701 21.27 20.1301 21.29C20.2901 21.31 20.5901 21.12 20.9001 20.67C21.1901 20.24 21.2101 19.93 21.1401 19.79C21.0701 19.65 20.7901 19.5 20.2701 19.5C19.9601 19.5 19.7301 19.6 19.6001 19.77C19.4801 19.94 19.4601 20.2 19.5601 20.49Z"
                  fill="#223A84"
                />
              </svg>
            </InputLeftElement>
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderRadius="2xl"
            />
          </InputGroup>
        </Flex>

        <TableContainer className="tableLayout ">
          <Table variant="simple">
            <Thead>
              <Tr>
                {tableHeader?.map((tbHeader: string, index: number) => (
                  <Th
                    key={index}
                    fontSize={{ base: 16, md: 20 }}
                    fontWeight={500}
                    onClick={() => handleSort(tbHeader)}
                    color={"#223A84"}
                  >
                    {tbHeader}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody className="text-[#223A84] odd:bg-slate-200">
              {sortedData.length > 0 ? (
                <AnimatePresence>
                  {currentRows?.map((row: any, index: number) => {
                    const { fullname, phone, email, message } = row || {};
                    return (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{
                          opacity: 0, // Fade out the row before removal
                          transition: { duration: 0.3 },
                        }}
                        className="odd:bg-white even:bg-slate-50"
                      >
                        <Td>{fullname}</Td>
                        <Td>{phone}</Td>
                        <Td>{email}</Td>
                        <Td>{message}</Td>
                        <Td>
                          <Button
                            colorScheme="red"
                            onClick={() => handleDeleteClick(row)}
                          >
                            Delete
                          </Button>
                        </Td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              ) : (
                <Tr className="text-lg mx-auto">
                  <Td
                    colSpan={tableHeader.length}
                    textAlign="center"
                    color={"#4766C8"}
                    fontWeight={"500"}
                    fontSize={"20px"}
                  >
                    No data found
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
        {filteredData?.length > rowsPerPage && (
          <Flex justifyContent="center" mt={4}>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              mx={2}
            >
              Previous
            </Button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              mx={2}
            >
              Next
            </Button>
          </Flex>
        )}
        {/* Modal for delete confirmation */}
        <Modal
          isCentered
          motionPreset="slideInBottom"
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody
              p={10}
              margin={"auto"}
              textAlign={"center"}
              className="w-[80%] flex flex-col gap-10 "
            >
              <Text fontSize="lg">Are you sure to delete this entry?</Text>
            </ModalBody>
            <ModalFooter margin={"auto"} className="flex gap-6 capitalize">
              <Button colorScheme="gray" onClick={onClose}>
                No, cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirmDelete}>
                Yes, delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default RequestTableComponent;
