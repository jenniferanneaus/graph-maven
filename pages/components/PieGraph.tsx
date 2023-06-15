import { Fragment } from "react";
import styled from "styled-components";
import { lightTheme, pieGraphColourThemes } from "../../styles/theme";
import { GRAPH_IDS } from "./DownloadButton";

interface ISegment {
  label: string;
  weight: number;
}

export interface IPieGraphProps {
  colourTheme: (typeof pieGraphColourThemes)[number];
  diameter?: number;
  segments: ISegment[];
}

const GRAPH_MARGIN = 20;
const LEGEND_SQUARE_DIMENSIONS = 20;

const Segment = styled.circle`
  transition-duration: 2s;
  transition-property: stroke-dashoffset, stroke-dasharray;
`;

export const PieGraph = ({
  colourTheme,
  diameter = 50,
  segments,
}: IPieGraphProps): JSX.Element => {
  const radius = diameter / 2;
  const strokeLength = radius * Math.PI;
  const strokeCentreRadius = radius / 2;
  const svgHeight = diameter + GRAPH_MARGIN;
  const svgWidth = (diameter + GRAPH_MARGIN) * 2 + GRAPH_MARGIN;

  const totalWeight = segments.reduce((sum, { weight }) => weight + sum, 0);
  let cumulativeWeight = 0;
  const segmentsWithCalcs = segments.map((segment) => {
    const startPercent = totalWeight ? cumulativeWeight / totalWeight : 0;
    const segmentPercent = totalWeight ? segment.weight / totalWeight : 0;
    cumulativeWeight += segment.weight;

    return {
      ...segment,
      segmentPercent,
      startPercent,
    };
  });

  return (
    <svg
      id={GRAPH_IDS.PieGraph}
      height={svgHeight}
      width={svgWidth}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="shadow">
          <stop
            offset={`${(radius * 100) / (radius + 4)}%`}
            stopColor={lightTheme.pieGraph.shadowInner}
          />
          <stop offset="100%" stopColor={lightTheme.pieGraph.shadowOuter} />
        </radialGradient>
        {/* Pattern from https://pattern.monster/hexagon-8/ */}
        <pattern
          id="c"
          patternUnits="userSpaceOnUse"
          width="50.41"
          patternTransform="scale(0.8)"
          height="87"
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={lightTheme.pieGraph.emptyStatePattern}
          />
          <path
            d="M25.3 87L12.74 65.25m0 14.5h-25.12m75.18 0H37.68M33.5 87l25.28-43.5m-50.23 29l4.19 7.25L16.92 87h-33.48m33.48 0h16.75-8.37zM8.55 72.5L16.92 58m50.06 29h-83.54m79.53-50.75L50.4 14.5M37.85 65.24L50.41 43.5m0 29l12.56-21.75m-50.24-14.5h25.12zM33.66 29l4.2 7.25 4.18 7.25M33.67 58H16.92l-4.18-7.25M-8.2 72.5l20.92-36.25L33.66 0m25.12 72.5H42.04l-4.19-7.26L33.67 58l4.18-7.24 4.19-7.25M33.67 29l8.37-14.5h16.74m0 29H8.38m29.47 7.25H12.74M50.4 43.5L37.85 21.75m-.17 58L25.12 58M12.73 36.25L.18 14.5M0 43.5l-12.55-21.75M24.95 29l12.9-21.75M12.4 21.75L25.2 0M12.56 7.25h-25.12m75.53 0H37.85M58.78 43.5L33.66 0h33.5m-83.9 0h83.89M33.32 29H16.57l-4.18-7.25-4.2-7.25m.18 29H-8.37M-16.74 0h33.48l-4.18 7.25-4.18 7.25H-8.37m8.38 58l12.73-21.75m-25.3 14.5L0 43.5m-8.37-29l21.1 36.25 20.94 36.24M8.37 72.5H-8.36"
            strokeWidth="1"
            stroke={lightTheme.background.page}
            fill="none"
          />
        </pattern>
      </defs>
      <rect
        width={svgWidth}
        height={svgHeight}
        rx={8}
        ry={8}
        fill={lightTheme.background.page}
      />
      <circle
        id="pie-graph-shadow"
        cx={radius + 1 + GRAPH_MARGIN / 3}
        cy={radius + 1 + GRAPH_MARGIN / 2}
        r={radius + 2}
        fill="url(#shadow)"
      />
      <circle
        id="pie-graph-empty-state"
        cx={radius + GRAPH_MARGIN / 3}
        cy={radius + GRAPH_MARGIN / 2}
        r={radius}
        fill="url(#c)"
      />
      {segmentsWithCalcs.map(({ label, segmentPercent, startPercent }, i) => {
        const segmentColour = lightTheme.pieGraph[colourTheme][i];
        const legendSquareXPos = diameter + GRAPH_MARGIN + 8;
        const labelXPos = legendSquareXPos + LEGEND_SQUARE_DIMENSIONS + 8;
        const labelYPos =
          GRAPH_MARGIN / 2 + (diameter * (i + 0.5)) / segmentsWithCalcs.length;
        const legendSquareYPos = labelYPos - LEGEND_SQUARE_DIMENSIONS / 2;

        return (
          <Fragment key={i}>
            <Segment
              key={i}
              cx={radius + GRAPH_MARGIN / 3}
              cy={radius + GRAPH_MARGIN / 2}
              r={strokeCentreRadius}
              strokeWidth={radius}
              strokeDasharray={`${
                strokeLength * segmentPercent
              } ${strokeLength}`}
              fill="none"
              stroke={segmentColour}
              strokeDashoffset={-strokeLength * startPercent}
            />
            <rect
              x={legendSquareXPos}
              y={legendSquareYPos}
              rx={4}
              ry={4}
              width={LEGEND_SQUARE_DIMENSIONS}
              height={LEGEND_SQUARE_DIMENSIONS}
              fill={segmentColour}
            />
            <text
              x={labelXPos}
              y={labelYPos}
              overflow="visible"
              alignmentBaseline="middle"
              fontFamily="Roboto, sans-serif"
            >
              {`${label} (${Math.round(segmentPercent * 100)}%)`}
            </text>
          </Fragment>
        );
      })}
    </svg>
  );
};
