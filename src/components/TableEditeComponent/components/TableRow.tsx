import React from "react";
import { Tr, Td, Textarea, Button, Box, IconButton } from "@chakra-ui/react";
import { API_IMG } from "../../../api/api";
import { FaEdit } from "react-icons/fa";

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
interface TableRowProps {
  item: any;
  type: string;
  fileImgs: any;
  handleTextareaChange: (id: number, field: string, value: string) => void;
  handleFileChange?: ((id: number, file: File) => void | any) | undefined;
}

const TableRow: React.FC<TableRowProps> = ({
  item,
  type,
  fileImgs,
  handleTextareaChange,
  handleFileChange,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <React.Fragment key={item.id}>
      {type === "banners" && (
        <>
          {/* Image cell with upload functionality */}
          <Td>
            <Box position="relative" w="96px" h="96px">
              <img
                src={
                  fileImgs[item.id] // Display the uploaded file for this row
                    ? URL.createObjectURL(fileImgs[item.id])
                    : `${API_IMG}${item.img}` // Display existing image if no new file uploaded
                }
                alt="banner"
                className="w-full h-full object-cover rounded-md"
              />
              <IconButton
                icon={<FaEdit />}
                aria-label="Edit Image"
                size="sm"
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                colorScheme="blue"
                onClick={handleIconClick}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0] && handleFileChange) {
                    handleFileChange(item.id, e.target.files[0]);
                  }
                }}
              />
            </Box>
          </Td>

          {/* Text inputs */}
          <Td>
            <Textarea
              minH="4rem"
              value={item.title_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "title_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.title_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "title_ar", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.text_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "text_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.text_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "text_ar", e.target.value)
              }
            />
          </Td>
        </>
      )}
      {type === "address" && (
        <>
          <Td>
            <Textarea
              minH={"4rem"}
              value={(item as QuestionsData).add_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "add_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH={"4rem"}
              value={(item as QuestionsData).add_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "add_ar", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH={"4rem"}
              value={(item as QuestionsData).schedule_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "schedule_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH={"4rem"}
              value={(item as QuestionsData).schedule_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "schedule_ar", e.target.value)
              }
            />
          </Td>{" "}
          <Td>
            <Textarea
              minH={"4rem"}
              value={(item as QuestionsData).phone}
              onChange={(e) =>
                handleTextareaChange(item.id, "phone", e.target.value)
              }
            />
          </Td>
        </>
      )}
      {type === "whydoc" && (
        <>
          {/* Image cell with upload functionality */}
          <Td>
            <Box position="relative" w="96px" h="96px">
              <img
                src={
                  fileImgs[item.id] // Display the uploaded file for this row
                    ? URL.createObjectURL(fileImgs[item.id])
                    : `${API_IMG}${item.img}` // Display existing image if no new file uploaded
                }
                alt="banner"
                className="w-full h-full object-cover rounded-md"
              />
              <IconButton
                icon={<FaEdit />}
                aria-label="Edit Image"
                size="sm"
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                colorScheme="blue"
                onClick={handleIconClick}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0] && handleFileChange) {
                    handleFileChange(item.id, e.target.files[0]);
                  }
                }}
              />
            </Box>
          </Td>

          {/* Text inputs */}
          <Td>
            <Textarea
              minH="4rem"
              value={item.title_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "title_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.title_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "title_ar", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.text_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "text_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.text_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "text_ar", e.target.value)
              }
            />
          </Td>
        </>
      )}
      {type === "certifications" && (
        <>
          {/* Text inputs */}
          <Td>
            <Textarea
              minH="4rem"
              value={item.title_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "title_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.title_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "title_ar", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.description_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "description_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.description_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "description_ar", e.target.value)
              }
            />
          </Td>
          {/*  */}
          <Td>
            <Textarea
              minH="4rem"
              value={item.qualification1_en}
              onChange={(e) =>
                handleTextareaChange(
                  item.id,
                  "qualification1_en",
                  e.target.value
                )
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.qualification1_ar}
              onChange={(e) =>
                handleTextareaChange(
                  item.id,
                  "qualification1_ar",
                  e.target.value
                )
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.qualification2_en}
              onChange={(e) =>
                handleTextareaChange(
                  item.id,
                  "qualification2_en",
                  e.target.value
                )
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.qualification2_ar}
              onChange={(e) =>
                handleTextareaChange(
                  item.id,
                  "qualification2_ar",
                  e.target.value
                )
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.qualification3_en}
              onChange={(e) =>
                handleTextareaChange(
                  item.id,
                  "qualification3_en",
                  e.target.value
                )
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.qualification3_ar}
              onChange={(e) =>
                handleTextareaChange(
                  item.id,
                  "qualification3_ar",
                  e.target.value
                )
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.qualification4_en}
              onChange={(e) =>
                handleTextareaChange(
                  item.id,
                  "qualification4_en",
                  e.target.value
                )
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.qualification4_ar}
              onChange={(e) =>
                handleTextareaChange(
                  item.id,
                  "qualification4_ar",
                  e.target.value
                )
              }
            />
          </Td>
        </>
      )}
      {type === "questions" && (
        <>
          <Td>
            <Textarea
              minH={"4rem"}
              value={(item as QuestionsData).question_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "question_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH={"4rem"}
              value={(item as QuestionsData).question_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "question_ar", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH={"4rem"}
              value={(item as QuestionsData).answer_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "answer_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH={"4rem"}
              value={(item as QuestionsData).answer_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "answer_ar", e.target.value)
              }
            />
          </Td>
        </>
      )}
      {type === "categories" && (
        <>
          {" "}
          <Td>
            <Textarea
              minH={"4rem"}
              value={(item as QuestionsData).name_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "name_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH={"4rem"}
              value={(item as QuestionsData).name_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "name_ar", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH={"4rem"}
              value={(item as QuestionsData).desc_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "desc_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH={"4rem"}
              value={(item as QuestionsData).desc_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "desc_ar", e.target.value)
              }
            />
          </Td>{" "}
        </>
      )}
      {type === "offers" && (
        <>
          {/* Image cell with upload functionality */}
          <Td>
            <Box position="relative" w="96px" h="96px">
              <img
                src={
                  fileImgs[item.id] // Display the uploaded file for this row
                    ? URL.createObjectURL(fileImgs[item.id])
                    : `${API_IMG}${item.img}` // Display existing image if no new file uploaded
                }
                alt="banner"
                className="w-full h-full object-cover rounded-md"
              />
              <IconButton
                icon={<FaEdit />}
                aria-label="Edit Image"
                size="sm"
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                colorScheme="blue"
                onClick={handleIconClick}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0] && handleFileChange) {
                    handleFileChange(item.id, e.target.files[0]);
                  }
                }}
              />
            </Box>
          </Td>

          {/* Text inputs */}
          <Td>
            <Textarea
              minH="4rem"
              value={item.title_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "title_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.title_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "title_ar", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.text_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "text_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.text_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "text_ar", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.caption_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "caption_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.caption_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "caption_ar", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.description_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "description_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.description_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "description_ar", e.target.value)
              }
            />
          </Td>
        </>
      )}
      {type === "reviews" && (
        <>
          {/* Image cell with upload functionality */}
          <Td>
            <Box position="relative" w="96px" h="96px">
              <img
                src={
                  fileImgs[item.id] // Display the uploaded file for this row
                    ? URL.createObjectURL(fileImgs[item.id])
                    : `${API_IMG}${item.img}` // Display existing image if no new file uploaded
                }
                alt="banner"
                className="w-full h-full object-cover rounded-md"
              />
              <IconButton
                icon={<FaEdit />}
                aria-label="Edit Image"
                size="sm"
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                colorScheme="blue"
                onClick={handleIconClick}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0] && handleFileChange) {
                    handleFileChange(item.id, e.target.files[0]);
                  }
                }}
              />
            </Box>
          </Td>

          {/* Text inputs */}
          <Td>
            <Textarea
              minH="4rem"
              value={item.title_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "title_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.title_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "title_ar", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.text_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "text_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.text_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "text_ar", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.name_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "name_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.name_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "name_ar", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.desc_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "desc_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH="4rem"
              value={item.desc_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "desc_ar", e.target.value)
              }
            />
          </Td>
        </>
      )}
      {type === "services" && (
        <>
          {" "}
          <Td>
            <Textarea
              minH={"4rem"}
              value={(item as QuestionsData).title_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "title_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH={"4rem"}
              value={(item as QuestionsData).title_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "title_", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH={"4rem"}
              value={(item as QuestionsData).desc_en}
              onChange={(e) =>
                handleTextareaChange(item.id, "desc_en", e.target.value)
              }
            />
          </Td>
          <Td>
            <Textarea
              minH={"4rem"}
              value={(item as QuestionsData).desc_ar}
              onChange={(e) =>
                handleTextareaChange(item.id, "desc_ar", e.target.value)
              }
            />
          </Td>{" "}
        </>
      )}
      {/* Save button */}
      {/* <Td>
        <Button
          size="sm"
          onClick={() => saveData(item.id)}
          isDisabled={savingIds.includes(item.id)}
        >
          {savingIds.includes(item.id) ? "Saving..." : "Save"}
        </Button>
      </Td> */}
    </React.Fragment>
  );
};

export default TableRow;
