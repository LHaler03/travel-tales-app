import styled from 'styled-components';

export const PlayerContainer = styled.div`
    width: 50vw;
    margin-left: 25vw;

    @media (min-width: 600px) {
        width: 22vw;
        margin: 5vh 0vw 0vh 23vw;
    }
`;

export const CityName = styled.div`
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    margin-top: 3vh;
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