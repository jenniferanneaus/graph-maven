import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, Fragment, ReactNode, useState } from "react";
import styled from "styled-components";
import {
  MAX_PIE_GRAPH_SEGMENTS,
  pieGraphColourThemes,
} from "../../styles/theme";
import { DownloadButton, GRAPH_IDS } from "../components/DownloadButton";
import { IPieGraphProps, PieGraph } from "../components/PieGraph";

const MIN_PIE_GRAPH_SEGMENTS = 1;

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 60px 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const PieGraphContainer = styled.div`
  margin-bottom: 40px;
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: center;
`;

const SelectNumSegments = ({
  numSegments,
  onChange,
}: {
  numSegments: number;
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
}) => (
  <FormControl fullWidth variant="outlined">
    <InputLabel>Number of segments</InputLabel>
    <Select
      value={numSegments.toString()}
      label="Number of segments"
      onChange={onChange}
    >
      {Array.from({
        length: MAX_PIE_GRAPH_SEGMENTS - MIN_PIE_GRAPH_SEGMENTS + 1,
      }).map((_, i) => {
        const num = MIN_PIE_GRAPH_SEGMENTS + i;
        return (
          <MenuItem key={num} value={num}>
            {num}
          </MenuItem>
        );
      })}
    </Select>
  </FormControl>
);

const SelectColourTheme = ({
  colourTheme,
  onChange,
}: {
  colourTheme: IPieGraphProps["colourTheme"];
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
}) => (
  <FormControl fullWidth variant="outlined">
    <InputLabel>Colour theme</InputLabel>
    <Select value={colourTheme} label="Colour theme" onChange={onChange}>
      {pieGraphColourThemes.map((theme) => (
        <MenuItem key={theme} value={theme}>
          {`${theme.charAt(0).toUpperCase()}${theme.substring(1)}`}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export const PieGraphCreator = (): JSX.Element => {
  const [numSegments, setNumSegments] = useState<number>(
    Math.floor((MAX_PIE_GRAPH_SEGMENTS + MIN_PIE_GRAPH_SEGMENTS) / 2)
  );
  const [colourTheme, setColourTheme] =
    useState<IPieGraphProps["colourTheme"]>("multicolour");

  const [segments, setSegments] = useState<IPieGraphProps["segments"]>(
    Array(MAX_PIE_GRAPH_SEGMENTS).fill({
      label: "",
      weight: 0,
    })
  );
  const [validationErrors, setValidationErrors] = useState<
    Array<string | undefined>
  >(Array(MAX_PIE_GRAPH_SEGMENTS));

  return (
    <PageContainer>
      <PieGraphContainer>
        <PieGraph
          colourTheme={colourTheme}
          diameter={200}
          segments={[...segments.slice(0, numSegments)]}
        />
      </PieGraphContainer>

      <Container maxWidth="sm">
        <Grid container justifyContent="center" rowSpacing={2} spacing={4}>
          <Grid item xs={4}>
            <SelectNumSegments
              numSegments={numSegments}
              onChange={(e: SelectChangeEvent) =>
                setNumSegments(parseInt(e.target.value))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <SelectColourTheme
              colourTheme={colourTheme}
              onChange={(e: SelectChangeEvent) =>
                setColourTheme(e.target.value as IPieGraphProps["colourTheme"])
              }
            />
          </Grid>
          <Grid item xs={12} style={{ height: 10 }} />
          {Array.from({ length: numSegments }).map((_, i) => (
            <Fragment key={`segment-${i}`}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={`Label ${i + 1}`}
                  inputProps={{
                    maxLength: 20,
                  }}
                  helperText={`${segments[i].label.length}/20`}
                  variant="standard"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSegments([
                      ...segments.slice(0, i),
                      {
                        label: e.target.value,
                        weight: segments[i].weight,
                      },
                      ...segments.slice(i + 1, MAX_PIE_GRAPH_SEGMENTS),
                    ])
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  label={`Weight ${i + 1}`}
                  type="number"
                  variant="standard"
                  error={!!validationErrors[i]}
                  helperText={validationErrors[i]}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const newWeight = parseInt(e.target.value);
                    setValidationErrors([
                      ...validationErrors.slice(0, i),
                      newWeight < 0 ? "Must be greater than zero" : undefined,
                      ...validationErrors.slice(i + 1, MAX_PIE_GRAPH_SEGMENTS),
                    ]);

                    setSegments([
                      ...segments.slice(0, i),
                      {
                        label: segments[i].label,
                        weight: Math.max(newWeight, 0),
                      },
                      ...segments.slice(i + 1, MAX_PIE_GRAPH_SEGMENTS),
                    ]);
                  }}
                />
              </Grid>
            </Fragment>
          ))}
        </Grid>
        <Grid item xs={12} style={{ height: 40 }} />
        <Grid item style={{ textAlign: "center" }}>
          <DownloadButton id={GRAPH_IDS.PieGraph} />
        </Grid>
      </Container>
    </PageContainer>
  );
};
