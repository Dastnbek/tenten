import React from "react";
import { Container } from "@radix-ui/themes";
import MainContainer from "./MainContainer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const App = () => {
  return (
    <Container>
      <MainContainer />
      <SpeedInsights />
    </Container>
  );
};

export default App;
