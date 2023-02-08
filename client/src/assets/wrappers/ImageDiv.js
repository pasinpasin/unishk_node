import styled from "styled-components";
const ImageDiv = styled.div`
  height: 100%;
  width: 100%;
  float: left;
  background-repeat: no-repeat;
  background-position: left;
  background-size: cover;
  background-image: ${({ url }) => `url(${url})`};
`;
export default ImageDiv;
