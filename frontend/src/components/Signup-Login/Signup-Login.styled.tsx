import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 150px;
  background-color: #7ea1de;
  padding-bottom: 30px;
  width: 600px;
  height: 600px;

  @media (max-width: 375px) {
    width: 100%;
    height: 100vh;
    margin-top: 0;
  }
`;


export const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
    width: 100%;
    margin-top: 30px; 
}
`;

export const Text = styled.div`
    font-size: 48px;
    font-weight: 700;
    color: black;

    @media (max-width: 375px) {
        font-size: 32px;
    }
`;


export const Underline = styled.div`
    width: 61px;
    height: 6px;
    background-color: black;
    border-radius: 9px;
`;

export const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 55px;
    gap: 25px;
`;

export const Input = styled.div`
    display: flex;
    align-items: center;
    margin: auto;
    width: 480px;
    height: 80px;
    background-color: #b5cfe3;
    border-radius: 6px;

    @media (max-width: 375px) {
        width: 90%;
        height: 60px;
    }

    img {
        margin: 0px 30px;
        @media (max-width: 375px) {
            margin: 0px 15px;
        }
    }
    input {
        height: 50px;
        width: 400px;
        background: transparent;
        border: none;
        outline: none;
        font-size: 20px;
        color: black;

        @media (max-width: 375px) {
            width: 100%;
            height: 40px;
            font-size: 16px;
        }
    }
`;

export const RedirectContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
    padding: 5px;
    gap: 5px;
`

export const Question = styled.div`
    font-size: 1.2rem;
`

export const RedirectLink = styled.a`
    font-size: 1.2rem;
`


export const SubmitContainer = styled.div`
    display: flex;
    gap: 30px;
    margin: 30px auto;

    @media (max-width: 375px) {
        gap: 15px;
        margin: 30px auto;
    }
`;

export const Submit = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 220px;
   height: 59px;
   color: black;
   background-color: #b5cfe3;
   border-radius: 50px;
   font-size: 20px;
   font-weight: 700;
   cursor: pointer;

   @media (max-width: 375px) {
        width: 150px;
        height: 45px;
        font-size: 16px;
   }
`;

