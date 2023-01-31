import styled from "styled-components";
export const Tabs = styled.div`
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  width: 80%;
  height: auto;
  min-height: 400px;
  background: #053742;
  margin: 3.5rem auto 1.5rem;
  padding: 2rem 1rem;
  color: #e8f0f2;
  border-radius: 2rem;
  @media (max-width: 769px) {
    padding: 2rem 0;
  }
  ul.nav li {
    width: 50%;
    padding: 1rem;
    list-style: none;
    text-align: center;
    cursor: pointer;
    transition: all 0.7s;
    border-bottom-left-radius: 2rem;
    border-top-left-radius: 2rem;
  }
  ul.nav li:nth-child(2) {
    border-radius: 0;
    border-bottom-right-radius: 2rem;
    border-top-right-radius: 2rem;
  }
  ul.nav li:hover {
    background: rgba(50, 224, 196, 0.15);
  }
  ul.nav li.active {
    background: #39a2db;
  }
`;

export const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  width: 40%;
  position: relative;

  margin-right: 0.1em;
  font-size: 1em;
  border: ${(props) => (props.active ? "1px solid #ccc" : "")};
  border-bottom: ${(props) => (props.active ? "none" : "")};
  background-color: ${(props) => (props.active ? "white" : "lightgray")};
  height: ${(props) => (props.active ? "3em" : "2.6em; top:.4em")};
  transition: background-color 0.5s ease-in-out;

  :hover {
    background-color: white;
  }
`;
export const Content = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  ${(props) => (props.active ? "" : "display:none")}
`;
