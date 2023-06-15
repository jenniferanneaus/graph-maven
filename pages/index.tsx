import type { NextPage } from "next";
import Head from "next/head";
import { Logo, LOGO_HEIGHT, LOGO_WIDTH } from "./components/Logo";
import styled from "styled-components";
import { BarGraphCreator, HomePage, PieGraphCreator } from "./subpages";
import { lightTheme } from "../styles/theme";
import { Button } from "@mui/material";
import { styled as MuiStyled } from "@mui/material/styles";
import { useState } from "react";

const MENU_BREAK_POINT_LARGE = 1300;
const MENU_BREAK_POINT_SMALL = 650;
enum PAGE_OPTIONS {
  Home = "Home",
  PieGraph = "Pie Graph",
  BarGraph = "Bar Graph",
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${lightTheme.background.page};
  font-family: Roboto;
  height: 100%;
  width: 100%;

  @media (max-width: ${MENU_BREAK_POINT_LARGE}px) {
    flex-direction: column;
  }
`;
const MenuWrapper = styled.div`
  height: 100vh;
  width: ${LOGO_WIDTH + 40}px;
  padding: 20px;
  background-color: ${lightTheme.background.menu};
  display: flex;
  flex-direction: column;
  z-index: 1;

  @media (max-width: ${MENU_BREAK_POINT_LARGE}px) {
    height: ${LOGO_HEIGHT + 40}px;
    width: 100%;
    flex-direction: row;
  }

  @media (max-width: ${MENU_BREAK_POINT_SMALL}px) {
    padding: 20px 10px;
  }
`;
const MenuOptionsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  @media (max-width: ${MENU_BREAK_POINT_LARGE}px) {
    flex-direction: row;
    margin-left: 40px;

    & > * {
      margin-right: 24px;
    }
  }

  @media (max-width: ${MENU_BREAK_POINT_SMALL}px) {
    margin-left: 12px;

    & > * {
      margin-right: 0;
    }
  }
`;
const MenuButton = MuiStyled(Button)({
  textTransform: "none",
  color: lightTheme.text.primary,
  paddingBlock: 10,
  fontWeight: 400,
  fontSize: "1rem",
});
const ContentWrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media (max-width: ${MENU_BREAK_POINT_LARGE}px) {
    min-height: 100%;
  }
`;

// todo: colour scheme toggle (light/dark), reduce motion toggle
const App: NextPage = (): JSX.Element => {
  const [content, setContent] = useState<PAGE_OPTIONS>(PAGE_OPTIONS.Home);

  return (
    <div>
      <Head>
        <title>Graph Maven</title>
        <meta name="description" content="Beautiful graphs with ease" />
        <link rel="icon" href="/static/favicon.ico" />
      </Head>

      <PageWrapper>
        <MenuWrapper>
          <Logo />
          <MenuOptionsWrapper>
            {Object.values(PAGE_OPTIONS).map((option) => (
              <MenuButton
                key={option.toLocaleLowerCase().replace(/ /, "-")}
                onClick={() => setContent(option)}
              >
                {option}
              </MenuButton>
            ))}
          </MenuOptionsWrapper>
        </MenuWrapper>
        <ContentWrapper>
          {content === PAGE_OPTIONS.Home && <HomePage />}
          {content === PAGE_OPTIONS.PieGraph && <PieGraphCreator />}
          {content === PAGE_OPTIONS.BarGraph && <BarGraphCreator />}
        </ContentWrapper>
      </PageWrapper>
    </div>
  );
};

export default App;
