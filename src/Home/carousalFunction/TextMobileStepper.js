import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import "./TextMobileStepper.css";

const steps = [
  {
    description: `Crack any exam with India's One and Only Gamified Quiz Platform !`,
  },
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus, erat eget tristique viverra, nibh lacus gravida augue, vitae aliquet risus enim in justo. Suspendisse sed ultricies enim.",
  },
  {
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit !`,
  },
];

export default function TextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        width: "98vw",
        flexGrow: 1,

      }}
    >
      <Box
        sx={{
          height: "50vh",
          width: "98vw",
          p: 2,
          color: "#fff",
          fontSize: "2.5vw",
          display: "flex",
          justifyContent: "center",
          alignItems:"center",
          letterSpacing:"0.2vw",
          fontWeight:"bold"
        }}
      >
        {steps[activeStep].description}
      </Box>
      <MobileStepper
      className="navigationTool"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
          
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
           
          </Button>
        }
      />
    </Box>
  );
}
