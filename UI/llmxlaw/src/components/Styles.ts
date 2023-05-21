import styled from "styled-components";


export const photo = styled.img`
    width: 100%;
    @media (max-width: 1000px) {
      margin-top: -200px;
      /* margin-bottom: -200px; */
    }
`

export const stepsWrapper = styled.div`
  display: grid;
  
  grid-template-columns: 20vw 25vw;
  grid-gap: 20vh;
  
  /* margin-top: 5vh; */
  /* margin-bottom: 5vh; */
  padding: 5vh;

  @media (max-width: 1000px) {
    grid-template-columns: none;
    width: 80%;
    grid-template-rows: 1fr 1fr;
    grid-gap: 0px;
    margin-top: 0vh;
    padding: 1vh;
  }
`;