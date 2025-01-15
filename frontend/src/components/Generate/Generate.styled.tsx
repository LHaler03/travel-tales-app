import styled from 'styled-components';

export const PlayerContainer = styled.div`
    width: 90vw;
    margin: 5vw;

    @media (min-width: 600px) {
        width: 70vw;
        margin: 5vh 5vw 5vh 5vw;
    }
`;

export const CityName = styled.div`
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    margin: 3vh 0vh 3vh 0vh;
`

export const Wrapper = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;

    @media (min-width: 600px) {
        flex-direction: row;
    }
`

export const Sidebar = styled.div`
    width: 100vw;

    @media (min-width: 600px) {
        width: 30vw;
        border-right: 2px solid black;
    }
`

export const InputContainer = styled.div`
    padding: 5px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    gap: 10px;

    input[type="file"] {
        font-size: 0rem;

        &::file-selector-button {
            background: #7ea1de;
            color: white;
            padding: 8px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            vertical-align: middle;
            font-size: 0.9rem;
            
            &:hover {
                background: #0056b3;
            }
        }
    }

    input[type="color"] {
        -webkit-appearance: none;
        width: 50px;
        height: 30px;
        border: none;
        border-radius: 4px;
        padding: 0;
        cursor: pointer;

        &::-webkit-color-swatch-wrapper {
            padding: 0;
        }
        
        &::-webkit-color-swatch {
            border: none;
            border-radius: 4px;
        }
    }

    input[type="text"] {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        
        &:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
        }
    }
`

export const ButtonsContainer = styled.div`
    margin: 10px;
    display: flex;
    justify-content: center;

    & > button {
        margin: 0.5rem;
        font-size: 0.75rem;
    }

    @media (min-width: 600px) {
        flex-direction: column;

        & > button {
            margin: 0.5rem;
            font-size: 1.1rem;
        }
    }
`