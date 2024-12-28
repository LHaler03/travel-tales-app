import styled from 'styled-components';

export const UserList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const UserItem = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
`;

export const ReviewButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;
