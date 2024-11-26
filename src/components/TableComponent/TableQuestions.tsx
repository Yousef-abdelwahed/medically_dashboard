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
  Input,
  TableContainer,
  Spinner,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { API_BASE } from "../../api/api";
import axios from "axios";

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
}

type DataItem = PrinciplesOrWhyWordsData | QuestionsData;

interface Props {
  type: "principles" | "address" | "questions";
}

const TableQuestions: React.FC<Props> = ({ type }) => {
  const [data, setData] = React.useState<DataItem[]>([]);
  const [editingData, setEditingData] = React.useState<DataItem[]>([]);
  const [savingIds, setSavingIds] = React.useState<number[]>([]);
  const [loading, setLoading] = React.useState(true);

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

  // Handle input changes
  const handleInputChange = (
    id: number,
    field: string,
    value: string | number
  ) => {
    setEditingData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Save updates to server
  const saveData = async (id: number) => {
    const updatedItem = editingData.find((item) => item.id === id);
    if (updatedItem) {
      setSavingIds((prevIds) => [...prevIds, id]); // Disable save button for this item

      try {
        await axios.put(`${API_BASE}/${type}/${id}`, updatedItem);
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
      } finally {
        setSavingIds((prevIds) => prevIds.filter((savedId) => savedId !== id)); // Re-enable save button
      }
    }
  };

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100%">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <Box p={4}>
      <h2 className="text-lg md:text-xl xl:text-3xl capitalize font-medium mb-6">
        Change text of {type} section
      </h2>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {type === "questions" ? (
                <>
                  <Th>Question (EN)</Th>
                  <Th>Question (AR)</Th>
                  <Th>Answer (EN)</Th>
                  <Th>Answer (AR)</Th>
                </>
              ) : (
                <>
                  <Th>Address (EN)</Th>
                  <Th>Address (AR)</Th>
                  <Th>schedule (EN)</Th>
                  <Th>schedule (AR)</Th>
                  <Th>phone</Th>
                </>
              )}
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {editingData.map((item) => (
              <Tr key={item.id}>
                {type === "questions" && (
                  <>
                    <Td>
                      <Input
                        value={(item as QuestionsData).question_en}
                        onChange={(e) =>
                          handleInputChange(
                            item.id,
                            "question_en",
                            e.target.value
                          )
                        }
                      />
                    </Td>
                    <Td>
                      <Input
                        value={(item as QuestionsData).question_ar}
                        onChange={(e) =>
                          handleInputChange(
                            item.id,
                            "question_ar",
                            e.target.value
                          )
                        }
                      />
                    </Td>
                    <Td>
                      <Input
                        value={(item as QuestionsData).answer_en}
                        onChange={(e) =>
                          handleInputChange(
                            item.id,
                            "answer_en",
                            e.target.value
                          )
                        }
                      />
                    </Td>
                    <Td>
                      <Input
                        value={(item as QuestionsData).answer_ar}
                        onChange={(e) =>
                          handleInputChange(
                            item.id,
                            "answer_ar",
                            e.target.value
                          )
                        }
                      />
                    </Td>
                  </>
                )}
                {type === "address" && (
                  <>
                    <Td>
                      <Input
                        value={(item as QuestionsData).add_en}
                        onChange={(e) =>
                          handleInputChange(item.id, "add_en", e.target.value)
                        }
                      />
                    </Td>
                    <Td>
                      <Input
                        value={(item as QuestionsData).add_ar}
                        onChange={(e) =>
                          handleInputChange(item.id, "add_ar", e.target.value)
                        }
                      />
                    </Td>
                    <Td>
                      <Input
                        value={(item as QuestionsData).schedule_en}
                        onChange={(e) =>
                          handleInputChange(
                            item.id,
                            "schedule_en",
                            e.target.value
                          )
                        }
                      />
                    </Td>
                    <Td>
                      <Input
                        value={(item as QuestionsData).schedule_ar}
                        onChange={(e) =>
                          handleInputChange(
                            item.id,
                            "schedule_ar",
                            e.target.value
                          )
                        }
                      />
                    </Td>{" "}
                    <Td>
                      <Input
                        value={(item as QuestionsData).phone}
                        onChange={(e) =>
                          handleInputChange(item.id, "phone", e.target.value)
                        }
                      />
                    </Td>
                  </>
                )}
                <Td>
                  <Button
                    size="sm"
                    onClick={() => saveData(item.id)}
                    isDisabled={savingIds.includes(item.id)}
                  >
                    {savingIds.includes(item.id) ? "Saving..." : "Save"}
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableQuestions;
