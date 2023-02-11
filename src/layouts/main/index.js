import Header from "../../component/Header";
import Footer from "../../component/Footer";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  width: 100%;
  height: 100vh;

  @media (max-width: 768px) {
    max-width: calc(100vw - 110px);
  }

  @media (max-width: 425px) {
    margin-left: 0px;
    max-width: 100vw;
  }
`;

const MainLayout = (props) => {
  return (
    <LayoutContainer>
      <MainContent>
        <Header />
        <div className="main">{props.children}</div>
        <Footer />
      </MainContent>
    </LayoutContainer>
  );
};
export default MainLayout;
