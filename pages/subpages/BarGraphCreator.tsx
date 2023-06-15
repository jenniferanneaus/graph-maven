import Image from "next/image";
import pageIllustration from "../../images/undraw_projections_re_ulc6.svg";
import styled from "styled-components";

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const ContentContainer = styled.div<{ flex: number }>`
  padding: 40px;
  flex: ${({ flex }) => flex};
`;

export const BarGraphCreator = (): JSX.Element => (
  <PageContainer>
    <ContentContainer flex={3}>
      <h1>Bar graphs are coming soon!</h1>
      <p>
        We're currently working hard to bring you some awesome bar graphs. Our
        team is busy tinkering away, making sure every bar is perfectly aligned
        and every data point is graphed with precision.
      </p>
      <p>
        While we're fine-tuning our graphs, feel free to explore the other
        features on Graph Maven. We've got plenty of engaging content and other
        visualizations to keep you entertained.
      </p>
    </ContentContainer>
    <ContentContainer flex={2}>
      <Image src={pageIllustration} alt="Image of a person looking at graphs" />
    </ContentContainer>
  </PageContainer>
);
