import React from "react";
import { Tr, Td, Textarea, Button, Box, IconButton } from "@chakra-ui/react";
import { API_IMG } from "../../../api/api";
import { FaEdit } from "react-icons/fa";

interface TableRowProps {
  item: any;
  type: string;
  savingIds: number[];
  fileImgs: any;
  handleTextareaChange: (id: number, field: string, value: string) => void;
  saveData: (id: number) => void;
  handleFileChange?: (id: number, file: File) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  item,
  type,
  savingIds,
  fileImgs,
  handleTextareaChange,
  saveData,
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
                  if (e.target.files && e.target.files[0]) {
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
