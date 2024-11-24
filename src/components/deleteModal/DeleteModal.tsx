import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

interface IProps {
  isOpen: boolean;
  close: () => void;
  deleteItem: () => void;
}
const DeleteModal: React.FC<IProps> = ({ isOpen, close, deleteItem }) => {
  return (
    <>
      <Modal
        isCentered
        motionPreset="slideInBottom"
        // closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={close}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton onClick={() => onClose()} />
          <ModalBody
            p={10}
            margin={"auto"}
            textAlign={"center"}
            className="w-[80%] flex flex-col gap-10 "
          >
            <div className="relative   h-[5vh]   ">
              <div className="absolute z-20  left-1/2 transform -translate-x-1/2 size-10 bg-red-400 opacity-30 rounded-full p-8"></div>
              <div className=" absolute left-1/2 transform -translate-x-1/2  rounded-full z-20  mx-auto pt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M28.0009 8.97338C27.9742 8.97338 27.9342 8.97338 27.8942 8.97338C20.8409 8.26672 13.8009 8.00005 6.82753 8.70672L4.10753 8.97338C3.54753 9.02672 3.0542 8.62672 3.00086 8.06672C2.94753 7.50672 3.34753 7.02672 3.8942 6.97338L6.6142 6.70672C13.7075 5.98672 20.8942 6.26672 28.0942 6.97338C28.6409 7.02672 29.0409 7.52005 28.9875 8.06672C28.9475 8.58672 28.5075 8.97338 28.0009 8.97338Z"
                    fill="#EE1E0E"
                  />
                  <path
                    d="M11.333 7.62663C11.2797 7.62663 11.2264 7.62663 11.1597 7.61329C10.6264 7.51996 10.253 6.99996 10.3464 6.46663L10.6397 4.71996C10.853 3.43996 11.1464 1.66663 14.253 1.66663H17.7464C20.8664 1.66663 21.1597 3.50663 21.3597 4.73329L21.653 6.46663C21.7464 7.01329 21.373 7.53329 20.8397 7.61329C20.293 7.70663 19.773 7.33329 19.693 6.79996L19.3997 5.06663C19.213 3.90663 19.173 3.67996 17.7597 3.67996H14.2664C12.853 3.67996 12.8264 3.86663 12.6264 5.05329L12.3197 6.78663C12.2397 7.27996 11.813 7.62663 11.333 7.62663Z"
                    fill="#EE1E0E"
                  />
                  <path
                    d="M20.2792 30.3333H11.7192C7.06588 30.3333 6.87921 27.76 6.73255 25.68L5.86588 12.2533C5.82588 11.7066 6.25255 11.2266 6.79921 11.1866C7.35921 11.16 7.82588 11.5733 7.86588 12.12L8.73255 25.5466C8.87921 27.5733 8.93255 28.3333 11.7192 28.3333H20.2792C23.0792 28.3333 23.1325 27.5733 23.2659 25.5466L24.1325 12.12C24.1725 11.5733 24.6525 11.16 25.1992 11.1866C25.7459 11.2266 26.1725 11.6933 26.1325 12.2533L25.2659 25.68C25.1192 27.76 24.9325 30.3333 20.2792 30.3333Z"
                    fill="#EE1E0E"
                  />
                  <path
                    d="M18.2134 23H13.7734C13.2268 23 12.7734 22.5467 12.7734 22C12.7734 21.4533 13.2268 21 13.7734 21H18.2134C18.7601 21 19.2134 21.4533 19.2134 22C19.2134 22.5467 18.7601 23 18.2134 23Z"
                    fill="#EE1E0E"
                  />
                  <path
                    d="M19.3327 17.6666H12.666C12.1193 17.6666 11.666 17.2133 11.666 16.6666C11.666 16.12 12.1193 15.6666 12.666 15.6666H19.3327C19.8793 15.6666 20.3327 16.12 20.3327 16.6666C20.3327 17.2133 19.8793 17.6666 19.3327 17.6666Z"
                    fill="#EE1E0E"
                  />
                </svg>{" "}
              </div>
            </div>

            <Box className="text-[1.5rem]">
              are you sure to delete this picture ?{" "}
            </Box>
          </ModalBody>

          <ModalFooter margin={"auto"} className="flex gap-6 capitalize">
            <Button
              colorScheme="gray"
              onClick={() => onClose()}
              transform={"capitalize"}
              className="capitalize"
            >
              No, cancel
            </Button>
            <Button
              colorScheme="red"
              mr={3}
              transform={"capitalize"}
              className="capitalize"
              onClick={() => deleteItem()}
            >
              yes, delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
