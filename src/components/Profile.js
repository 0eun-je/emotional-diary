/* Profile : 모든 페이지에서 보이는 프로필. 사진, 닉네임 변경 가능 및 감정의 통계 출력 */
import React, { useState } from 'react';
import styled from 'styled-components';
import { BsPencil } from "react-icons/bs";

// style //
const ProfileBlock = styled.div`
    width: 400px;
    height: 1080px;
    margin: 20px;
    background: #FFFFFF;
    border: 1px solid #DEE2E6;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .08);
    
    .title{
        margin: 40px 0px 25px 20px;
        font-family: "barunpenR";
        font-size: 21px;
    }

    @media screen and (max-width: 992px) {
        width: 300px;
        .title { font-size: 20px; }
    }

    @media screen and (max-width: 768px) {
        width : auto;
        .title { font-size: 23px; }
    }
`;

const Photo = styled.div`
    margin-top: 110px;
    
    .imageBlock {
        margin: 0px 100px;
        border-radius: 50%;
    }

    .profilePhoto {
        display: block;
        width: 140px;
        height: 140px;
        margin: 0 auto;
        border-radius: 50%;

        &:hover{
            filter: brightness(80%);
        }
    }

    label {
        &:hover {
            cursor: pointer;
        }
    }

    input {
        visibility: hidden;
    }

    @media screen and (max-width: 992px) {
        .profilePhoto {
            width: 120px;
            height: 120px;
        }
    }

    @media screen and (max-width: 768px) {
        margin-top: 80px;
        .imageBlock { margin: 0px 35%; }
        .profilePhoto { width: 140px; height: 140px; }
    }
`;

const Edit = styled.div`
    display: none;
    margin-top: 35px;

    .editIcon {
        font-size: 20px;
        color: #DEE2E6;

        &:hover {
            color: #ADB5BD;
        }
    }

    #editInput {
        position: absolute;
        display: none;
        left: 150px;
        width: 150px;
        height: 25px;
        margin-top: -30px;
        border: 3px solid #F0E5D8;
    }

    #editButton {
        position: absolute;
        display: none;
        left: 310px;
        padding-top: 5px;
        margin-top: -30px;
        width: 50px;
        height: 33px;
        border: 3px solid #E6DDC6;
        background: #F0E5D8;
        cursor: pointer;
        font-family: "barunpenB";
        color: #A19882;
        text-align: center;
    }

    #cancelButton{
        position: absolute;
        display: none;
        left: 360px;
        width: 50px;
        height: 33px;
        padding-top: 5px;
        margin-top: -30px;
        border: 3px solid #E6DDC6;
        background: #F0E5D8;
        cursor: pointer;
        font-family: "barunpenB";
        color: #A19882;
        text-align: center;  
    }

    @media screen and (max-width: 992px) {
        .editIcon { font-size: 18px; }
        #editInput { left: 110px; width: 130px; }
        #editButton { left: 250px; }
        #cancelButton { left: 300px; }
    }

    @media screen and (max-width: 768px) {
        .editIcon { font-size: 20px; }
        #editInput { left: 200px; width: 150px; }
        #editButton { left: 360px; }
        #cancelButton { left: 410px; }
    }
`;

const Nickname = styled.div`
    display: flex;
    justify-content: center;
    margin: -30px 20px 0px 20px;
    padding-bottom: 50px;
    border-bottom: 1px solid #CED4DA;

    &:hover {
        ${Edit} {
            display: initial;
        }
        cursor: pointer;
    }

    h2 {
        position: relative;
        margin: 30px 20px 0px 20px;
        text-align: center;
        font-family: "barunpenB";
        font-size: 25px;
    }

    @media screen and (max-width: 992px) {
        h2 { font-size: 22px; }
    }

    @media screen and (max-width: 768px) {
        h2 { font-size: 25px;}
    }
`;

const EmotionBlock = styled.div`
    display: flex;
    justify-content: center;
    font-family: "barunpenB";
`;

const Emotion = styled.div`
    text-align: center;

    .emotion {
        width: 40px;
        padding: 20px 11px;
        margin: 0px 10px 5px 0px;
        border-radius: 50%;
        text-align: center;
    }

    .joy {
        background: #FFEDA3;
        color: #FFA900;
    }

    .joy-count {
        color: #FFA900;
    }

    .rage {
        background: #FFDCB8;
        color: #FF7600;
    }

    .rage-count {
        color: #FF7600;
    }

    .sad {
        background: #CDF0EA;
        color: #4B778D;
    }

    .sad-count {
        color: #4B778D;
    }

    .delight {
        background: #CCF6C8;
        color: #558776;
    }

    .delight-count {
        margin-left: -15px;
        color: #558776;
    }

    .love {
        margin-right: 0px;
        background: #FFDDCC;
        color: #FF616D;
    }

    .love-count {
        margin-left: 0px;
        color: #FF616D;
    }

    .hate {
        background: #E7E6E1;
        color: #868E96;
    }

    .hate-count {
        color: #868e96;
    }

    .desire {
        background: #FFE6E6;
        color: #E98580;
    }

    .desire-count {
        color: #E98580;
    }

    .common {
        background: #E7D4B5;
        color: #7D5A50;
    }

    .common-count {
        color: #7D5A50;
    }

    .others {
        background: #FFF5DA;
        color: #C68B59;
    }

    .others-count {
        color: #C68B59;
    }

    h6 {
        margin: 0px 0px 40px -10px;
        font-size: 16px;
    }

    @media screen and (max-width: 1300px) {
        .emotion { 
            width: 35px;
            padding: 20px 11px;
            font-size: 12px;
        }

        h6 { font-size: 15px; }
    }

    @media screen and (max-width: 992px) {
        .emotion { width: 28px; }
        h6 { font-size: 14px; }
    }

    @media screen and (max-width: 768px) {
        .emotion {
            width: 50px;
            padding: 23px 13px;
            font-size: 18px;
        }
        h6 { font-size: 20px; }
    }
`;

// function //
function Profile(props) {
    const [imageURL, setImageURL] = useState("./tae.jpg");
    const [nickname, setNickname] = useState("제로");

    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth()+1;
    const date = d.getDate();
    const today = year + ". " + month + ". " + date + "."; 
    const strArray = today.split('.');

    // 오늘의 감정, 이 달의 감정 갯수
    let joyCount = 0, rageCount = 0, sadCount = 0, delightCount = 0, loveCount = 0, hateCount = 0,
        desireCount = 0, commonCount = 0, othersCount = 0;
    let joyCountMonthly = 0, rageCountMonthly = 0, sadCountMonthly = 0, delightCountMonthly = 0,
        loveCountMonthly = 0, hateCountMonthly = 0, desireCountMonthly = 0, commonCountMonthly = 0, othersCountMonthly = 0;

    props.diaries.forEach(diary => {
        if(diary.dateforDiary === today){
            if(diary.emotion === "기쁨")
                joyCount++;
            else if(diary.emotion === "분노")
                rageCount++;
            else if(diary.emotion === "슬픔")
                sadCount++;
            else if(diary.emotion === "즐거움")
                delightCount++;
            else if(diary.emotion === "사랑")
                loveCount++;
            else if(diary.emotion === "미움")
                hateCount++;
            else if(diary.emotion === "바람")
                desireCount++;
            else if(diary.emotion === "무난")
                commonCount++;
            else if(diary.emotion === "기타")
                othersCount++;
        }
    });

    props.diaries.forEach(diary => {
        let diaryStrArray = diary.dateforDiary.split('.');
        if(diaryStrArray[1] === strArray[1]){
            if(diary.emotion === "기쁨")
                joyCountMonthly++;
            else if(diary.emotion === "분노")
                rageCountMonthly++;
            else if(diary.emotion === "슬픔")
                sadCountMonthly++;
            else if(diary.emotion === "즐거움")
                delightCountMonthly++;
            else if(diary.emotion === "사랑")
                loveCountMonthly++;
            else if(diary.emotion === "미움")
                hateCountMonthly++;
            else if(diary.emotion === "바람")
                desireCountMonthly++;
            else if(diary.emotion === "무난")
                commonCountMonthly++;
            else if(diary.emotion === "기타")
                othersCountMonthly++;
        }
    });
    
    // 프로필 사진 수정
    const loadFile = (e) => {
        console.log(e.target.files[0]);
        setImageURL(URL.createObjectURL(e.target.files[0]));
        console.log(imageURL);
    };

    // 닉네임 수정 버튼 클릭 시 호출
    const showEdit = () => {
        document.getElementById("editInput").style.display = "block";
        document.getElementById("editButton").style.display = "block";
        document.getElementById("cancelButton").style.display = "block";
    };

    // 닉네임 수정
    const editNickname = () => {
        setNickname(document.getElementById("editInput").value);
        document.getElementById("editInput").style.display = "none";
        document.getElementById("editButton").style.display = "none";
        document.getElementById("cancelButton").style.display = "none";
    };

    // 닉네임 수정 취소
    const cancel = () => {
        document.getElementById("editInput").style.display = "none";
        document.getElementById("editButton").style.display = "none";
        document.getElementById("cancelButton").style.display = "none";
    };

    return (
        <ProfileBlock>
            <Photo>
                <div className="imageBlock">
                    <label htmlFor="chooseFile"><img src={imageURL} className="profilePhoto" alt="프로필 사진"></img></label>
                </div>
                <input type="file" id="chooseFile" onChange={loadFile}/>
            </Photo>
            <Nickname>
                <h2>{nickname}</h2>
                <Edit>
                    <BsPencil className="editIcon" onClick={showEdit}/>
                    <input id="editInput"/>
                    <button id="editButton" onClick={editNickname}>수정</button>
                    <button id="cancelButton" onClick={cancel}>취소</button>
                </Edit>
            </Nickname>
            <h4 className="title">오늘의 감정</h4>
            <EmotionBlock>
                <Emotion>
                    <div className="emotion joy">기쁨</div>
                    <h6 className="joy-count">{joyCount}</h6>
                </Emotion>
                <Emotion>
                    <div className="emotion rage">분노</div>
                    <h6 className="rage-count">{rageCount}</h6>
                </Emotion>
                <Emotion>
                    <div className="emotion sad">슬픔</div>
                    <h6 className="sad-count">{sadCount}</h6>
                </Emotion>
                <Emotion>
                    <div className="emotion delight">즐거움</div>
                    <h6 className="delight-count">{delightCount}</h6>
                </Emotion>
                <Emotion>
                    <div className="emotion love">사랑</div>
                    <h6 className="love-count">{loveCount}</h6>
                </Emotion>
            </EmotionBlock>
            <EmotionBlock>
                <Emotion>
                    <div className="emotion hate">미움</div>
                    <h6 className="hate-count">{hateCount}</h6>
                </Emotion>
                <Emotion>
                    <div className="emotion desire">바람</div>
                    <h6 className="desire-count">{desireCount}</h6>
                </Emotion>
                <Emotion>
                    <div className="emotion common">무난</div>
                    <h6 className="common-count">{commonCount}</h6>
                </Emotion>
                <Emotion>
                    <div className="emotion others">기타</div>
                    <h6 className="others-count">{othersCount}</h6>
                </Emotion>
            </EmotionBlock>
            <h4 className="title">이 달의 감정</h4>
            <EmotionBlock>
                <Emotion>
                    <div className="emotion joy">기쁨</div>
                    <h6 className="joy-count">{joyCountMonthly}</h6>
                </Emotion>
                <Emotion>
                    <div className="emotion rage">분노</div>
                    <h6 className="rage-count">{rageCountMonthly}</h6>
                </Emotion>
                <Emotion>
                    <div className="emotion sad">슬픔</div>
                    <h6 className="sad-count">{sadCountMonthly}</h6>
                </Emotion>
                <Emotion>
                    <div className="emotion delight">즐거움</div>
                    <h6 className="delight-count">{delightCountMonthly}</h6>
                </Emotion>
                <Emotion>
                    <div className="emotion love">사랑</div>
                    <h6 className="love-count">{loveCountMonthly}</h6>
                </Emotion>
            </EmotionBlock>
            <EmotionBlock>
                <Emotion>
                    <div className="emotion hate">미움</div>
                    <h6 className="hate-count">{hateCountMonthly}</h6>
                </Emotion>
                <Emotion>
                    <div className="emotion desire">바람</div>
                    <h6 className="desire-count">{desireCountMonthly}</h6>
                </Emotion>
                <Emotion>
                    <div className="emotion common">무난</div>
                    <h6 className="common-count">{commonCountMonthly}</h6>
                </Emotion>
                <Emotion>
                    <div className="emotion others">기타</div>
                    <h6 className="others-count">{othersCountMonthly}</h6>
                </Emotion>
            </EmotionBlock>
        </ProfileBlock>
    );
}

export default Profile;