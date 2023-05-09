import React from "react";
// import {GeneralContext} from '../../context/GeneralContextProvider';
import { Box, } from "@mui/material";
import styles from "./ultis.module.css";
import ServiceDisplay from './ServiceDisplay';

const Services = () => {
  

  const arr = [
    {
      id: 1,
      name: "strategy",
      whatWeDo: {
        desc:"We combine your request with existing sites and services and streamline client services through a 3-click outcome.",
        name: "What We Do",
        services: [
          { name: "Design Analysis" },
          { name: "Admin Analysis" },
          { name: "Data Analysis" },
        ],
      },
      result:
        "We find the best backend / frontend design within the 3-click scheme, taking product-type, service-type and corporate mission directives."
    },
    {
      id: 2,
      name: "design",
      whatWeDo: {
        desc:"Using a 3-click scheme, we maximize your space and customer experience.",
        name: "Objective",
        services: [
          { name: "Design Analysis" },
          { name: "Admin Analysis" },
          { name: "Photography" },
          { name: "UX Design using the golden Rule" },
        ],
      },
      result:
        "We provide a sample of the design as the starting point to you, then customize the design to your satisfaction"
    },
    {
      id: 3,
      name: "technology",
      whatWeDo: {
        desc:"We implement the 3-click scheme using using specialized methods",
        name: "Implement",
        services: [
          { name: "Custom Software Development" },
          { name: "Security & Compliance" },
          { name: "Performance Improvements" },
          { name: "Platform & Migration" },
          { name: "Ongoing Maintenance" },
          { name: "3rd party integration" },
        ],
      },
      result:
        "We finalize on your site, upon your approval."
    },
      
  ];

  

  return (
    <Box
      sx={{
        padding: "auto 10px",
        width:{md: "90%",sm:"80%",xs:"100%"},
        backgroundColor: {
          xs: "rgba(0,0,0,.4)",
          sm: "rgba(0,0,0,.4)",
          md: "rgba(0,0,0,.2)",
        },
      }}
    >
      <ServiceDisplay arr={arr}/>
    </Box>
  );
};

export default Services;
