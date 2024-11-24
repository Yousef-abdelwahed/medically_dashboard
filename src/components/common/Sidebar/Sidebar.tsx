import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { niaLogo } from "../../../assets";
import LogoutButton from "../../LogoutButton/LogoutButton";

const navLinks = [
  {
    page: "home",
    url: "/home",
    subLinks: [{ name: "Home", url: "group/home" }],
  },
  {
    page: "requests",
    url: "/requests",
  },
];

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  return (
    <>
      {/* Hamburger Menu Icon  */}
      <IconButton
        aria-label="Open menu"
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        display={{ base: "block", md: "none" }} // Show only on small screens
        onClick={isOpen ? onClose : onOpen}
        position="fixed"
        top="4"
        left="4"
        zIndex="1000"
      />

      {/* Sidebar for larger screens */}
      <Box
        w="64"
        minH="100vh"
        bg="white"
        display={{ base: "none", md: "block" }} // Hide on small screens
        className="said_menu flex flex-col justify-between h-screen "
      >
        <nav className="  h-[80vh] flex flex-col justify-between bg-dark">
          <Box as="figure" marginBottom="10px" className="">
            <Image src={niaLogo} alt="NIA Logo" width={70} />

            {navLinks?.map((link) => (
              <Box
                flex="1"
                textAlign="left"
                padding={"23px"}
                fontSize={20}
                className={`   `}
                key={link.page}
              >
                {link.page}
              </Box>
            ))}
          </Box>
          <Box display="flex" alignItems="center" gap={2} cursor={"pointer"}>
            <LogoutButton />
          </Box>
        </nav>
      </Box>

      {/* Drawer for small screens */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent h={"100vh"} bg={"white"}>
            <DrawerHeader borderBottomWidth="1px">
              <Box as="figure">
                <Image src={niaLogo} alt="NIA Logo" width={70} />
              </Box>
            </DrawerHeader>
            <DrawerBody h={"50vh"} className="flex flex-col justify-between">
              <Accordion allowToggle>
                {navLinks.map((link, index) => (
                  <Box key={link.page} flex="1" textAlign="left">
                    {link.page}
                  </Box>
                ))}
              </Accordion>
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                cursor={"pointer"}
                className="pb-10"
              >
                <LogoutButton />
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default Sidebar;
