import {
  Box,
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const RequestTableComponent = ({
  data,
  tableHeader,
  deleteRow = () => {},
  apiSource,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal hooks
  const [selectedRow, setSelectedRow] = React.useState<any>(null);
  const [currentPage, setCurrentPage] = React.useState(1); // State to track current page
  const rowsPerPage = 10; // Number of rows per page
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
  const filteredData = useMemo(() => {
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
  const sortedData = useMemo(() => {
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
      <Box p={4} overflowX="scroll" className="tableLayout">
        {/* Search Field */}
        <Flex mb={4} justifyContent="space-between">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            width="300px"
          />
        </Flex>

        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                {tableHeader?.map((tbHeader: string, index: number) => (
                  <Th
                    key={index}
                    fontSize={{ base: 16, md: 20 }}
                    fontWeight={500}
                    onClick={() => handleSort(tbHeader)}
                  >
                    {tbHeader}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
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
                  <Td colSpan={tableHeader.length} textAlign="center">
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
