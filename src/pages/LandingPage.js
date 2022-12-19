import React from "react";
import ContentLandingPage from "../components/ContentLandingPage";
import FooterLandingPage from "../components/FooterLandingPage";
import HeaderLandingPage from "../components/HeaderLandingPage";
import NavLandingPage from "../components/NavLandingPage";

const LandingPage = () => {
  return (
    <main>
      <NavLandingPage />
    
      <HeaderLandingPage />

      <ContentLandingPage />

      <FooterLandingPage />
    </main>
  );
};

export default LandingPage;
