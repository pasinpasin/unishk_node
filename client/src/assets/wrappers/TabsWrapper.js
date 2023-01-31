import styled from "styled-components";
const Wrapper = styled.section`
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  Tabs {
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
  }
  ul.nav {
    width: 60%;
    margin: 0 auto 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #39a2db;
    border-radius: 2rem;
    padding-left: 0px;
    @media (max-width: 768px) {
      width: 90%;
    }
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
  .FirstTab p,
  .SecondTab p {
    font-size: 2rem;
    text-align: center;
  }
`;

export default Wrapper;
