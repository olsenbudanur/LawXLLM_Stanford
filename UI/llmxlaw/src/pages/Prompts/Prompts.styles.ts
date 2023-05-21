import styled from "styled-components";

export const StepperWrapper = styled.div`
  display: grid;
  place-items: center;
  padding: 20px;
  margin-top: 50px;
`;

export const FormWrapper = styled.div`
  margin-top: 50px;
  display: grid;
  /* grid-template-rows: 50px; */
  grid-gap: 20px;
`;

export const PagesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
`;

export const WordCount = styled.div`
  background-color: #d7d9de;
  text-align: center;

  border-radius: 5px;
  margin-top: 16px;

  display: grid;
  align-items: center;
  color: black;
`;

export const Sec2Wrapper = styled.div`
  height: 100%;
  padding-bottom: 10vh;
  background-color: #ffff;
  display: flex;
  flex-direction: column;
  place-items: center;
  color: black;
  @media (max-width: 900px) {
    padding: 0vh;
  }
`;
