import { Button } from "@mui/material";
import styled from "styled-components";
import DownloadIcon from "@mui/icons-material/Download";

export enum GRAPH_IDS {
  PieGraph = "pie-graph",
}

// Download function based on https://takuti.me/note/javascript-save-svg-as-image/
const downloadAsPNG = (id: string) => () => {
  // fetch SVG-rendered image as a blob object
  const svg: SVGGraphicsElement | null = document.querySelector(`svg#${id}`);

  if (!svg?.firstChild) {
    console.error("Download error: SVG not found");
    return;
  }

  const data = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([data], {
    type: "image/svg+xml;charset=utf-8",
  });

  // convert the blob object to a dedicated URL
  const url = URL.createObjectURL(svgBlob);

  // load the SVG blob to a flesh image object
  const img = new Image();
  img.addEventListener("load", () => {
    // draw the image on an ad-hoc canvas
    const bbox = svg.getBBox();

    const canvas = document.createElement("canvas");
    canvas.width = bbox.width;
    canvas.height = bbox.height;

    const context = canvas.getContext("2d");
    if (!context) {
      console.error("Download error: No canvas context found");
      return;
    }
    context.drawImage(img, 0, 0, bbox.width, bbox.height);

    URL.revokeObjectURL(url);

    // trigger a synthetic download operation with a temporary link
    const a = document.createElement("a");
    a.download = "graph.png";
    document.body.appendChild(a);
    a.href = canvas.toDataURL();
    a.click();
    a.remove();
  });
  img.src = url;
};

// Download fuction based on https://codepen.io/Alexander9111/pen/VwLaaPe?editors=1010
const downloadAsSVG = (id: string) => () => {
  const svg = document.querySelector(`svg#${id}`);
  if (!svg) {
    console.error("Download error: SVG not found");
    return;
  }
  const base64doc = Buffer.from(svg.outerHTML).toString("base64");
  const a = document.createElement("a");
  const e = new MouseEvent("click");
  a.download = "graph.svg";
  a.href = "data:image/svg+xml;base64," + base64doc;
  a.dispatchEvent(e);
};

const Container = styled.div`
  display: flex;
  width: 250px;
  margin: 0 auto;
  justify-content: space-between;
`;

export const DownloadButton = ({ id }: { id: GRAPH_IDS }) => (
  <Container>
    <Button
      variant="outlined"
      onClick={downloadAsSVG(id)}
      startIcon={<DownloadIcon />}
    >
      SVG
    </Button>
    <Button
      variant="outlined"
      onClick={downloadAsPNG(id)}
      startIcon={<DownloadIcon />}
    >
      PNG
    </Button>
  </Container>
);
