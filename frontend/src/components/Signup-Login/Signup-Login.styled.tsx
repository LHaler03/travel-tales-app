import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 3rem);
    width: 100%;
    margin-top: 3rem;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    margin: auto;
    background-color: #7ea1de;
    max-width: 90%;
    border-radius: 20px;
`;


export const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
    margin-top: 30px; 
}
`;

export const Text = styled.div`
    font-size: 2rem;
    font-weight: 700;
    color: black;
`;


export const Underline = styled.div`
    width: 60px;
    height: 0.5rem;
    background-color: black;
    border-radius: 10px;
`;

export const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    gap: 20px;
`;

export const Input = styled.div`
    display: flex;
    align-items: center;
    margin: auto;
    width: 90%;
    height: 10%;
    background-color: #b5cfe3;
    border-radius: 6px;
    padding: 5px;

    img {
        margin: 0px 20px;
        width: 10%;
    }

    input {
        background: transparent;
        border: none;
        outline: none;
        font-size: 1rem;
        color: black;
        width: 95%;
    }
`;

export const RedirectContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 10px 0px 10px;
    padding: 5px;
    gap: 5px;
`

export const Question = styled.div`
    font-size: 1.1rem;
`

export const RedirectLink = styled.a`
    font-size: 1.1rem;
`


export const SubmitContainer = styled.div`
    display: flex;
    gap: 30px;
    margin: 30px auto;
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
`;

