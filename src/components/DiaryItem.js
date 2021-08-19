/* DiaryItem : 일기 내용을 간략하게 요약한 component. 리스트로 출력되며 overflow 시 scroll */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BsTrash } from "react-icons/bs";

// style //
const DiaryItemBlock = styled.div`
    display: flex;
    position: relative;
    width: 93%;
    margin: 20px auto;
    background: #FFFFFF;
    border: 1px solid #ced4da;

    .remove {
        display: block;
        position: absolute;
        left: 97%;
        top: -10px;
        width: 50px;
        height: 30px;
        opacity: 0;
        color: #C2B8A3;

        &:hover {
            filter: brightness(90%);
        }
    }

    &:hover {
        cursor: pointer;
        border: 3px solid #EAE3C8;

        .remove {
            opacity: 1;
        }
    }
`;

const Emotion = styled.div`
    width: 28%;
    background: #FFFFFF;
    border-right: 1px solid #ced4da;
    text-align: center;

    h3 {
        width: 30px;
        padding: 30px;
        margin: 60px auto 15px auto;
        background: #FFEDA3;
        border-radius: 50%;
        color: #FFA900;
    }

    span {
        display: inline-block;
        padding: 10px;
        margin-bottom: 5px;
        border: 1px solid #CED4DA;
        border-radius: 40%;
    }

    .first-emotion {
        margin-right: 10px;
    }

    .second-emotion {
        margin-right: 0px;
    }

    @media screen and (max-width: 992px) {
        h3 {
            width: 25px;
            padding: 25px;
            font-size: 16px; 
        }
        span {
            padding: 8px;
            font-size: 14px;
        }
    }
`;

const DiaryContent = styled.div`
    width: 72%;
    padding: 20px 20px 8px 20px;
    text-overflow: ellipsis;

    .title {
        margin: 0px 0px 5px 0px;
        font-family: "barunpenB";
        font-size: 18px;
        color: #A0937D;
    }

    .description {
        width: auto;
        margin: 0px 0px 12px 0px;
        padding: 7px;
        border: 1px solid #ced4da;
        overflow: hidden;
        white-space: nowrap;
        font-family: "barunpenB";
        font-size: 16px;
        text-overflow: ellipsis;
    }

    @media screen and (max-width: 992px) {
        .title {
            font-size: 16px;
        }
        
        .description {
            font-size: 14px;
        }
    }
`;

// function //
function DiaryItem({diary, onRemove}) {
    // 감정별로 색이 다르므로 style 변수로 지정 //
    let style = {
        background: "#FFEDA3",
        color: "#FFA900"
    };

    if(diary.emotion === "기쁨")
        style={background: "#FFEDA3", color: "#FFA900"};
    else if(diary.emotion === "분노")
        style={background: "#FFDCB8", color: "#FF7600"};
    else if(diary.emotion === "슬픔")
        style={background: "#CDF0EA", color: "#4B778D"};
    else if(diary.emotion === "즐거움")
        style={background: "#CCF6C8", color: "#558776"};
    else if(diary.emotion === "사랑")
        style={background: "#FFDDCC", color: "#FF616D"};
    else if(diary.emotion === "미움")
        style={background: "#E7E6E1", color: "#868E96"};
    else if(diary.emotion === "바람")
        style={background: "#FFE6E6", color: "#E98580"};
    else if(diary.emotion === "무난")
        style={background: "#E7D4B5", color: "#7D5A50"};
    else if(diary.emotion === "기타")
        style={background: "#FFF5DA", color: "#C68B59"};

    return(
        <DiaryItemBlock>
            <Link to="/"><BsTrash className="remove" onClick={()=>onRemove(diary.id)}>삭제</BsTrash></Link>
            <Emotion>
                <h3 style={style}>{diary.emotion}</h3>
                <span className="first-emotion">{diary.subEmotion[0]}</span>
                <span className="second-emotion">{diary.subEmotion[1]}</span>
            </Emotion>
            <DiaryContent>
                <h4 className="title">상황</h4>
                <h6 className="description">{diary.situation}</h6>
                <h4 className="title">감정의 이유</h4>
                <h6 className="description">{diary.reason}</h6>
                <h4 className="title">마음에 새기기</h4>
                <h6 className="description">{diary.decision}</h6>
            </DiaryContent>
        </DiaryItemBlock>
    );
}

export default DiaryItem;