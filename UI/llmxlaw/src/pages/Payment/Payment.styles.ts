import styled from "styled-components";

export const Image = styled.img`
  width: 300px;
  margin-bottom: 30px;
  /* @media (max-width:1000px) {
    height: 10%;
    width: 50%
  } */
  cursor: pointer;
`


export const Sec2Wrapper = styled.div`
  /* height: 100vh; */
  height: 80vh;
  background-color: #d7e5fc;
  display: flex;
  flex-direction:column;
  place-items: center;
  color: black;
  @media (max-width: 900px) {
    padding: 0vh;
  }
  
`;


export const LoadingWrapper = styled.div`
    display: flex;
    flex-direction:column;
    place-items: center;
    margin: auto;
    margin-top: 30vh;
`;