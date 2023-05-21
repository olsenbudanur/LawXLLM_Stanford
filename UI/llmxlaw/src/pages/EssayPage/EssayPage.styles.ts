import styled from "styled-components";

interface IB {
  disp: string,
}

export const Paper = styled.div`
  position: relative;
  background: #fff;
  width: 50%;
  margin: 0px auto;
  box-shadow: 0px 2px 38px rgba(0, 0, 0, 0.2);
  min-height: 900px;
  @media (max-width: 1000px) {
    grid-template-columns: none;
    width: 80%;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 0px;
    margin-top: 0vh;
  }
`;

export const OuterLayer = styled.div`
  background: rgb(204, 204, 204);
  padding-bottom: 100px;
`;

export const EssayText = styled.div`
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;

  line-height: 40px;
  @media (max-width: 1000px) {
    grid-template-columns: none;
    font-size: small;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 0px;
    margin-top: 0vh;
  }
`;

export const EssayTitle = styled.div`
  text-align: center;
  font-weight: bold;
  padding-top: 60px;
  line-height: 40px;
`;


export const LoadingWrapper = styled.div<IB>`
    display: ${props => props.disp};
    flex-direction:column;
    place-items: center;
    margin: auto;
`;


export const ButtonsWrapper = styled.div`
  display: flex;
  /* flex-direction:column; */
  place-items: center;
  color: black;
  /* align-items: center; */
  justify-content: center;
  gap: 10px;
`


export const ChatBox = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #ffffff;
  width: 400px;
  height: 500px;
  padding: 40px 16px 16px 16px; /* Adjusted padding to create space for the minimize button */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  /* Add other styling properties as per your requirement */
`

export const MessageContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

export const Message = styled.div`
  background-color: #f1f0f0;
  padding: 8px;
  margin-bottom: 8px;
`;

export const Sender = styled.div`
  font-weight: bold;
`;

export const Content = styled.div``;



export const InputContainer = styled.div`
  display: flex;
  margin-top: 16px;
`;

export const TextInput = styled.input`
  flex-grow: 1;
  padding: 8px;
`;

export const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
`;


export const MinimizeButton = styled.button`
  position: absolute;
  top: 1px; /* Adjusted the top position to create space above the minimize button */
  left: 1px; /* Adjusted the left position to create space on the left side of the minimize button */
  background-color: #ccc;
  color: white;
  width: 40px; /* Adjusted the width of the minimize button */
  padding: 3px 0; /* Adjusted the padding to make the button wider */
  border: none;
  cursor: pointer;
`;

export const CopyWrapper = styled.div<IB>`
    display: ${props => props.disp};
`;
