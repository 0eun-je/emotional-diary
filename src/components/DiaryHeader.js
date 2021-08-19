/* DiaryHeader : MainPage에서 날짜 선택 부분 및 입력 버튼이 있는 header */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BsPencilSquare } from "react-icons/bs";
import DiaryDate from './DiaryDate';

//style//
const DiaryHeaderBlock = styled.div`
    height: 200px;
    padding: 40px 30px 5px 30px;
    margin-bottom: 10px;
    background: #FFFFFF;
    border-bottom: 1px solid #CED4DA;
    text-align: center;
`;

const DiaryButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 20px 0px;
    background: #FFFFFF;
    border: 1px solid #CED4DA;
    text-align: center;
    font-family: "barunpenR";
    color: #BBBBBB;

    .note-icon {
        margin: 0px 20px 0px 0px;
        font-size: 25px;
    }

    h3 {
        margin-top: 20px;
        font-size: 22px;
    }

    &:hover {
        cursor: pointer;
        background: #F0E5D8;
        border: 1px solid #F0E5D8;
        color: #FFFFFF;
    }

    @media screen and (max-width: 992px) {
        .note-icon { font-size: 23px; }
        h3 { font-size: 20px; }
    }
`;

// function //
function DiaryHeader(props) {
    return (
    <DiaryHeaderBlock>
        <DiaryDate getToday={props.getToday}/>
        <Link to="/Input">
            <DiaryButton>
                <BsPencilSquare className="note-icon"/>
                <h3>오늘은 어떤 일이 있었나요?</h3>
            </DiaryButton>
        </Link>
    </DiaryHeaderBlock>
    );
}

export default DiaryHeader;