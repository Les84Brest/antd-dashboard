import styled from "styled-components";

export const ManagerCardWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow: hidden;
    border-radius: 7px;
    box-shadow: 0 6px 12px 2px rgba(0,0,0, .15);
    border: 1px solid #999;
    margin-bottom: 20px;
`;

export type ManagerAvatarProps = {
    backgroundSrc: string
}

export const ManagerAvatar = styled.img`
    width: 250px;
    object-fit: contain;
    background-position: center, center;
    background-origin: content-box;

`;

export const ManagerText = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: left;
    padding: 7px 10px 7px 20px;
`;

export const ManagerTextRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 23px;
    font-weight: 700;
    @media screen and (max-width: 768px)  {
        font-size: 16px;
    }
`;

export const ManagerIconWrap=styled.span`
    display: inline-block;
    margin-right: 10px;
`
export const Role = styled.div`
    font-size: 16px;
    color: #777;
    font-style: italic;
    font-weight: 500;
`
export  const ManagerContacts = styled.span`
    margin-top: 7px;
    `
export  const ManagerContactsLabel = styled.span`
    font-size: 16px;
    font-weight: 600;
    `;

export const ContactName = styled.span`
    display: inline-block;
    margin-right: 5px;
    `
export const ContactData = styled.span`
    font-weight: 600;
`
