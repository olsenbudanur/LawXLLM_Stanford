import styled from "styled-components";
import "@fontsource/nunito";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Sec1Wrapper = styled.div`
  /* width: 100%; */
  height: 100%;
  /* background-color: #1a58bc; */
  background-image: linear-gradient(#1a58bc, 60%, #d7e5fc 95%);
  display: grid;
  place-items: center;
  color: white;
  font-family: Nunito;
`;

export const Sec2Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: #d7e5fc; */
  background-image: linear-gradient(#d7e5fc 5%, 40%, #1a58bc 95%);
  display: flex;
  flex-direction: column;
  padding-top: 10vh;
  /* padding-bottom: 0vh; */
  place-items: center;
  text-shadow: 1px 1px 2px black;
  color: white;
  @media (max-width: 900px) {
    padding: 0vh;
  }
`;

export const Sec3Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: #1a58bc; */
  background-image: linear-gradient(#1a58bc 5%, 70%, #d7e5fc);
  display: flex;
  flex-direction: column;
  place-items: center;
  color: white;
  padding-top: 5vh;
  padding-bottom: 5vh;
  @media (max-width: 1000px) {
    padding-top: 0vh;
  }
`;

export const Image = styled.img`
  width: 300px;
  margin-bottom: 30px;
  /* @media (max-width:1000px) {
    height: 10%;
    width: 50%
  } */
  cursor: pointer;
`;

export const openAILogo = styled.img`
  width: 50px;
`;

export const ImageWrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 20vw 20vw 20vw;
  grid-gap: 100px;

  padding: 5px;
  @media (max-width: 1000px) {
    grid-template-columns: none;
    width: 80%;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 0px;
    margin-top: 0vh;
  }
`;

export const stepsWrapper = styled.div`
  place-items: center;
  display: flex;
  flex-direction: column;
  /* padding-right: 5vh; */
  /* padding-left: 5vh; */
`;

export const TextLoginWrapper = styled.div`
  display: grid;

  grid-template-columns: 40vw 25vw;
  grid-gap: 20vh;

  margin-top: 5vh;
  margin-bottom: 10vh;
  padding: 5vh;
  @media (max-width: 1000px) {
    grid-template-columns: none;
    width: 80%;
    grid-template-rows: 1fr 1fr;
    grid-gap: 0px;
    margin-top: 0vh;
    margin-bottom: 0vh;
    padding: 1vh;
  }
`;

export const TextWrapper = styled.div`
  text-shadow: 1px 1px 2px black;
`;

export const LoginWrapper = styled.div`
  background-color: white;
  border-radius: 5px;
  text-align: center;
  padding: 30px;
  display: grid;
  grid-gap: 20px;
  @media (max-width: 1000px) {
    padding-top: 15px;
    grid-gap: 0px;
    height: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 50px;
  @media (max-width: 1000px) {
    margin-top: 100px;
    font-size: 37px;
  }
`;

export const Title2 = styled.h1`
  font-size: 50px;
  @media (max-width: 1000px) {
    margin-top: -130px;
    font-size: 37px;
  }
`;

export const SubTitle = styled.h2`
  @media (max-width: 1000px) {
    font-size: 18px;
  }
`;

export const PagesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 50px;
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

export const ButtonWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
`;

export const LoginHeader = styled.h1`
  margin-bottom: 0px;
  color: black;
`;

export const CurrUser = styled.h4`
  border: 0px;
  margin: 0px;
  padding: 0px;
  color: black;
`;
