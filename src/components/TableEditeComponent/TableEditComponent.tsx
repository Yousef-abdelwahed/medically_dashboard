import React from "react";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Thead,
  Tr,
  Td,
  Input,
  Button,
  useToast,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";
import LoadingSpinner from "./components/LoadingSpinner";
import useFetchData from "../../hooks/useFetchData";
import axios from "axios";
import { API_BASE } from "../../api/api";

interface BaseData {
  id: number;
  created_at: string;
  updated_at: string;
}

interface PrinciplesOrWhyWordsData extends BaseData {
  title: string;
  text: string;
}

interface QuestionsData extends BaseData {
  question_en: string;
  question_ar: string;
  answer_en: string;
  answer_ar: string;
  add_en: string;
  add_ar: string;
  schedule_en: string;
  schedule_ar: string;
  phone: number;
  name_en: string;
  name_ar: string;
  desc_en: string;
  desc_ar: string;
  title_en: string;
  title_ar: string;
}

type DataItem = PrinciplesOrWhyWordsData | QuestionsData;

interface Props {
  type: string;

  subType?: "services";
}
interface IImageData {
  img?: string;
}

const TableEditComponent: React.FC<{ type: string; subType?: string }> = ({
  type,
  subType,
}) => {
  const [data, setData] = React.useState<DataItem[]>([]);
  const [editingData, setEditingData] = React.useState<DataItem[]>([]);
  const [savingIds, setSavingIds] = React.useState<number[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [fileImgs, setFileImgs] = React.useState<IImageData[]>([]);

  const toast = useToast();

  // Fetch data based on type
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataItem[]>(`${API_BASE}/${type}`);
        setData(response.data);
        setEditingData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type]);

  // Handle Textarea changes
  const handleTextareaChange = (
    id: number,
    field: string,
    value: string | number
  ) => {
    console.log(value);
    setEditingData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };
  const handleFileChange = (id: number | string, file: File | undefined) => {
    setFileImgs((prevImgs) => ({
      ...prevImgs,
      [id]: file, // Use `id` to track the file per row
    }));

    setEditingData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, img: file } : item))
    );
  };

  const saveData = async (id: number) => {
    const updatedItem = editingData.find((item) => item.id === id);
    if (updatedItem) {
      setSavingIds((prevIds) => [...prevIds, id]);
      try {
        const formData = new FormData();

        for (const [key, value] of Object.entries(updatedItem)) {
          if (key === "img" && value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value as string);
          }
        }

        await axios.post(`${API_BASE}/${type}/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          params: { _method: "PATCH" },
        });

        setData((prevData) =>
          prevData.map((item) => (item.id === id ? updatedItem : item))
        );
        toast({
          title: "Success",
          description: "Data updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error updating data:", error);
        toast({
          title: "Error",
          description: "Failed to update data.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setSavingIds((prevIds) => prevIds.filter((savedId) => savedId !== id)); // Re-enable save button
      }
    }
  };

  if (loading || !editingData) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100%">
        <Spinner size="lg" />
      </Flex>
    );
  }
  return (
    <Box p={4} className="text-[#223A84]">
      <h2 className="text-lg md:text-xl xl:text-3xl capitalize font-medium mb-6">
        Change text of {type} section
      </h2>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <TableHeader type={type} />
            </Tr>
          </Thead>
          <Tbody>
            {editingData.map((item) => (
              <React.Fragment key={item.id}>
                <Tr>
                  <TableRow
                    item={item}
                    type={type}
                    handleTextareaChange={handleTextareaChange}
                    handleFileChange={handleFileChange}
                    fileImgs={fileImgs}
                  />

                  <Td>
                    <Button
                      onClick={() => saveData(item.id)}
                      isLoading={savingIds.includes(item.id)}
                      isDisabled={savingIds.includes(item.id)}
                    >
                      {savingIds.includes(item.id) ? "Saving..." : "Save"}
                    </Button>
                  </Td>
                </Tr>
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableEditComponent;
