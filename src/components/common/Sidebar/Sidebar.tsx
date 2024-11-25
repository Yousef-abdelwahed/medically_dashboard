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
import { customIcon } from "../../../assets/icons/customIcon";

const navLinks = [
  {
    page: "home",
    url: "/dashboard/home",
    icon: customIcon.sideIcon.home,
  },
  {
    page: "requests",
    url: "/dashboard/requests",
    icon: customIcon.sideIcon.requests,
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
        className="md:hidden"
      />

      {/* Sidebar for larger screens */}
      <Box
        w="64"
        minH="100vh"
        bg="white"
        display={{ base: "none", md: "block" }} // Hide on small screens
        className="said_menu_large_screen flex flex-col justify-between h-screen shadow-md max-md:hidden "
      >
        <nav className="  h-[80vh] flex flex-col justify-between bg-dark">
          <Box
            as="figure"
            marginBottom="5px"
            className="font-medium capitalize text-[#223A84]"
          >
            <h2 className="ps-4 py-6 capitalize text-xl text-[#223A84] mb-[4.5rem]">
              dashboard
            </h2>

            {navLinks?.map((link, index) => (
              <NavLink
                key={index}
                to={link.url}
                style={({ isActive }) => ({
                  display: "block",
                  padding: "0px",
                  fontSize: "18px",
                  backgroundColor: isActive ? "#FF8F12" : "",
                  color: isActive ? "white" : "#2D3748",
                  borderRadius: "8px",
                  transition: "background-color 0.2s",
                  width: "100%",
                })}
                className={"group "}
              >
                <Box
                  flex="1"
                  textAlign="left"
                  padding={"23px"}
                  fontSize={20}
                  className={`flex  gap-4 text-[#223A84] group-hover:bg-[#4766C8]  group-hover:text-white`}
                  key={link.page}
                >
                  <span className="group-hover:stroke-white group-hover:fill-white  stroke-[#223A84]  transition-colors duration-200">
                    {link.icon}
                  </span>{" "}
                  <span> {link.page}</span>
                </Box>
              </NavLink>
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
