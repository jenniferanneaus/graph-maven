import { useEffect, useState } from "react";

import { AreaChart, Area } from "recharts";
import { palette } from "../../styles/palette";
import styled from "styled-components";
import { lightTheme } from "../../styles/theme";

interface ICurvePoint {
  back: number;
  mid: number;
  fore: number;
}

export const LOGO_WIDTH = 250;
export const LOGO_HEIGHT = 100;

const CURVE_DATA = [
  {
    back: 24,
    mid: 24,
    fore: 21,
  },
  {
    back: 20,
    mid: 20,
    fore: 30,
  },
  {
    back: 28,
    mid: 18,
    fore: 19,
  },
  {
    back: 22,
    mid: 32,
    fore: 25,
  },
  {
    back: 24,
    mid: 22,
    fore: 21,
  },
  {
    back: 20,
    mid: 27,
    fore: 18,
  },
];

const Container = styled.div`
  position: relative;
  width: ${LOGO_WIDTH}px;
  height: ${LOGO_HEIGHT}px;
  margin: 0 -6px;
  filter: grayscale(20%);
`;
const Title = styled.h2`
  position: absolute;
  bottom: -${LOGO_WIDTH / 14}px;
  left: ${LOGO_WIDTH / 11}px;
  vertical-align: bottom;
  color: ${lightTheme.background.page};
  font-size: ${LOGO_WIDTH / 7}px;
`;
const TitleAccent = styled.span`
  color: ${palette.pink[30]};
`;

export const Logo = () => {
  const [data, setData] = useState<Array<ICurvePoint>>();

  useEffect(() => {
    setData(CURVE_DATA);
  }, []);

  return data ? (
    <Container>
      <AreaChart width={LOGO_WIDTH} height={LOGO_HEIGHT} data={data}>
        <defs>
          <linearGradient id="backColor" x1="0" y1="0" x2="0.5" y2="1">
            <stop offset="2%" stopColor={palette.pink[30]} />
            <stop offset="95%" stopColor={palette.pink[60]} />
          </linearGradient>
          <linearGradient id="midColor" x1="0.5" y1="0" x2="0" y2="1">
            <stop offset="1%" stopColor={palette.blue[70]} />
            <stop offset="12%" stopColor={palette.blue[50]} />
          </linearGradient>
          <linearGradient id="foreColor" x1="0" y1="0" x2="1" y2="0.5">
            <stop offset="2%" stopColor={palette.purpleBlue[100]} />
            <stop offset="10%" stopColor={palette.purpleBlue[80]} />
            <stop offset="75%" stopColor={palette.purpleBlue[20]} />
            <stop offset="80%" stopColor={palette.purpleBlue[20]} />
            <stop offset="90%" stopColor={palette.purpleBlue[30]} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="back"
          fill="url(#backColor)"
          stroke="none"
          dot={{ r: 0 }}
          fillOpacity="0.75"
        />
        <Area
          type="monotone"
          dataKey="mid"
          fill="url(#midColor)"
          stroke="none"
          dot={{ r: 0 }}
          fillOpacity="0.8"
        />
        <Area
          type="monotone"
          dataKey="fore"
          fill="url(#foreColor)"
          stroke="none"
          dot={{ r: 0 }}
          fillOpacity="0.85"
        />
      </AreaChart>
      <Title>
        <TitleAccent>Graph</TitleAccent>Maven
      </Title>
    </Container>
  ) : (
    <></>
  );
};
