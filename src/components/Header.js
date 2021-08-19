/* Header : 상단 메뉴 */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// style //
const HeaderBlock = styled.div`
    display: flex;
    height: 75px;
    background: #FFFFFF;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .1);

    h1 {
        margin: 18px 70px 0px 35px;
        font-family: "barunpenB";
        font-size: 30px;
        letter-spacing: 1px;

        &:hover{
            color: #E98580;
        }
    }

    @media screen and (max-width: 768px) {
        h1 {
            margin-top: 22px;
            margin-right: 30px;
            font-family: "barunpenR";
            font-size: 25px; 
        }
    }
`;

const MenuGroup = styled.div`
    display: flex;
    margin-top: -5px;

    h4 {
        margin-right: 70px;
        font-size: 22px;
        
        &:hover {
            color: #DF5E5E;
            cursor: pointer;
        }
    }

    @media screen and (max-width: 768px) {
        h4 {
            margin-top: 32px;
            margin-right: 40px;
            font-size: 18px;
        }
    }
`;

// function //
function Header() {
    return (
        <HeaderBlock>
            <Link to="/"><h1>감정일기</h1></Link>
            <MenuGroup>
                <Link to="/"><h4>일기</h4></Link>
                <Link to="/emotion"><h4>감정 모아보기</h4></Link>
                <Link to="/calendar"><h4>캘린더</h4></Link>
                <Link to="/stats"><h4>통계</h4></Link>
            </MenuGroup>
        </HeaderBlock>
    );
}

export default Header;