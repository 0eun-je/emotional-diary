/* Detail : DiaryItem을 클릭하면 나타나는 상세내용 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DiaryDate from './DiaryDate';

// style //
const DetailBlock = styled.div`
    height: 1615px;
    padding: 40px;
    background: #FFFFFF;
    overflow-y: auto;
`;

const DiaryEmotion = styled.div`
    padding-top: 10px;

    .my-emotion{
        font-family: "barunpenB";
        font-size: 21px;
        margin-right: 30px;
    }

    .emotion-name {
       display: inline-block;
       padding: 8px 50px;
       border: 1px solid #CED4DA;
       font-family: "barunpenR";
       font-size: 18px;
    }

    .sub-emotion-name {
        margin: 10px 0px 0px 100px;
        padding: 8px 30px;
        border: 1px solid #CED4DA;
        font-size: 16px;
    }

    @media screen and (max-width: 992px) {
        .my-emotion { font-size: 18px; }
        .emotion-name { padding: 5px 40px; font-size: 16px; }
        .sub-emotion-name { padding: 5px 20px; margin-left: 90px; font-size: 14px;}
    }

    @media screen and (max-width: 768px) {
        .my-emotion { font-size: 19px; }
        .emotion-name { padding: 5px 50px; font-size: 18px; }
        .sub-emotion-name { padding: 5px 20px; margin-left: 95px; font-size: 15px;}
    }
`;

const MainEmotion = styled.div`
    display: flex;
    justify-content: center;
    font-family: "barunpenB";

    .emotion {
        padding: 20px;
        border-radius: 50%;
        margin: 20px 20px 20px 0px;

        &:hover {
            cursor: pointer;
            filter: brightness(97%);
        }
    }

    .joy {
        background: #FFEDA3;
        color: #FFA900;
    }

    .rage {
        background: #FFDCB8;
        color: #FF7600;
    }

    .sad {
        background: #CDF0EA;
        color: #4B778D;
    }

    .delight {
        padding: 20px 15px;
        background: #CCF6C8;
        color: #558776;
    }

    .love {
        background: #FFDDCC;
        color: #FF616D;
    }

    .hate {
        background: #E7E6E1;
        color: #868E96;
    }

    .desire {
        background: #FFE6E6;
        color: #E98580;
    }

    .common {
        background: #E7D4B5;
        color: #7D5A50;
    }

    .others {
        background: #FFF5DA;
        color: #C68B59;
    }

    @media screen and (max-width: 1430px) {
        .emotion {
            padding: 15px;
            margin-right: 13px;
            font-size: 14px;
        }
    }

    @media screen and (max-width: 1200px) {
        .emotion {
            padding: 12px;
            margin-right: 8px;
            font-size: 11px;
        }
    }

    @media screen and (max-width: 992px) {
        .emotion {
            padding: 10px;
            margin-right: 5px;
            font-size: 11px;
        }
    }

    @media screen and (max-width: 768px) {
        .emotion {
            padding: 12px;
            margin-right: 10px;
            font-size: 12px;
        }
    }
`;

const DetailEmotion = styled.div`
    text-align: center;
    padding-bottom: 15px;
    border-bottom: 1px solid #CED4DA;

    span {
        display: inline-block;
        padding: 10px;
        margin: 0px 10px 15px 0px;
        border: 1px solid #CED4DA;
        border-radius: 40%;

        &:hover {
            cursor: pointer;
            background: #F0E5D8;
            border: 1px solid #F0E5D8;
        }
    }

    span:last-child {
        margin-right: 0px;
    }

    @media screen and (max-width: 992px) {
        span {
            padding: 8px;
            font-size: 12px; 
        }
    }

    @media screen and (max-width: 768px) {
        span {
            padding: 9px;
            font-size: 13px;
        }
    }
`;

const InputForm = styled.div`
    padding: 15px 8px 0px 0px;
    
    .title {
        margin-bottom: 12px;
        font-family: "barunpenB";
        font-size: 21px; 
    }
    .description {
        width: 100%;
        height: 100px;
        margin-bottom: 15px;
        resize: none;
        font-family: "barunpenR";
        font-size: 16px;
        line-height: 1.3em;
        border: 1px solid #CED4DA;
    }

    @media screen and (max-width: 992px) {
        .title { font-size: 18px; }
    }

    @media screen and (max-width: 768px) {
        .title { font-size: 19px; }
    }
`;

const ButtonBlock = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;

const Button = styled.div`
    width: 80px;
    margin-right: 30px;
    padding: 10px 20px;
    border-radius: 3px;
    background: #FAEBE0;
    font-family: "barunpenB";
    font-size: 20px;
    text-align: center;

    &:hover {
        cursor: pointer;
        filter: brightness(97%);
    }

    @media screen and (max-width: 992px) {
        width: 60px;
        padding: 10px;
        font-size: 18px;
    }

    @media screen and (max-width: 768px) {
        width: 80px;
        padding: 10px;
        font-size: 19px;
    }
`;

// 세부감정 array //
const emotionArray = [
    {
        main: "기쁨",
        sub: ["감동적인", "감사한", "고무적인", "기쁜", "낙천적인", "날아갈 듯한", "놀라운", "눈물겨운", "환상적인",
                "만족스러운", "뭉클한", "뿌듯한", "짜릿한", "통쾌한", "포근한", "행복한", "후련한", "흐뭇한", "흥분된"]
    },
    {
        main: "분노",
        sub: ["고통스러운", "골치 아픈", "괘씸한", "기분 상하는", "끓어오르는", "나쁜", "모욕적인", "증오하는",
                "복수심이 불타는", "불만스러운", "불쾌한", "섬뜩한", "속상한", "실망한", "씁쓸한", "약 오르는"]
    },
    {
        main: "슬픔",
        sub: ["슬픈", "염려하는", "창피한", "공허한", "실망한", "외로운", "멍한", "미어지는",
                "불쌍한", "불행한", "비참한", "우울한", "섭섭한", "소외감이 드는", "아쉬운", "암담한"]
    },
    {
        main: "즐거움",
        sub: ["가벼운", "경쾌한", "기분좋은", "명랑한", "상쾌한", "신나는", "당당한", "편안한", "홀가분한",
                "확신있는", "흐뭇한", "희망찬", "흥분된", "즐거운", "숨가쁜"]
    },
    {
        main: "사랑",
        sub: ["감미로운", "감사하는", "그리운", "다정한", "따사로운", "묘한", "사랑스러운", "상냥한",
                "순수한", "애틋한", "열렬한", "친숙한", "포근한", "호감이 가는", "부끄러운"]
    },
    {
        main: "미움",
        sub: ["괴로운", "짜증나는", "귀찮은", "근심스러운", "끔찍한", "몸서리치는", "지겨운", "미운",
                "부담스러운", "서운한", "싫은", "얄미운", "억울한", "원망스러운", "죄책감드는",]
    },
    {
        main: "바람",
        sub: ["간절한", "기대하는", "바라는", "소망하는", "애끓는", "절박한", "초라한", "초조한",
                "호기심있는", "후회스러운", "희망하는"]
    },
    {
        main: "무난",
        sub: ["고요한", "담담한", "편안한", "무난한", "따분한", "무기력한", "태연한", "일상적인",
                "따뜻한", "포근한", "졸린", "감성적인"]
    },
    {
        main: "기타",
        sub: ["무서운", "다행스러운", "부끄러운", "미안한", "민망한", "버거운", "불안한", "애매한",
                "어색한", "어이없는", "조마조마한"]
    }
];


// function //
function Detail(props) {
    const id = props.match.params.id;   // URL로 넘겨준 Diary의 id값
    const diaries = props.location.state.diaries;

    // 현재 출력할 diary //
    let currentDiary;
    let subEmotion = "";
    diaries.forEach(d => {if(d.id == id){currentDiary=d;}});
    currentDiary.subEmotion.map(s => subEmotion += s + " ");
    props.location.state.inputs = currentDiary; // 수정할 때 inputs에 변경된 값을 넣어서 App.js로 전달

    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth()+1;
    const date = d.getDate();
    const initialToday = year + ". " + month + ". " + date + ".";
    const [today, setToday] = useState(initialToday);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentEmotion, setCurrentEmotion] = useState(currentDiary.emotion);
    const [currentSubEmotion, setCurrentSubEmotion] = useState(subEmotion);

    // DiaryDate에서 날짜를 받아오는 함수 //
    const getToday = (text) => {
        setToday(text);
    };

    // main emotion 클릭 시 //
    const onClickMainEmotion = (text, num) => {
        setCurrentEmotion(text);
        setCurrentIndex(num);
        setCurrentSubEmotion("");
        currentDiary.emotion = currentEmotion;
    };

    const setSituation = (e) => {
        currentDiary.situation = e.target.value;
    }

    const setReason = (e) => {
        currentDiary.reason = e.target.value;
    }

    const setMyResponse = (e) => {
        currentDiary.myResponse = e.target.value;
    }

    const setThoughts = (e) => {
        currentDiary.thoughts = e.target.value;
    }

    const setArgument = (e) => {
        currentDiary.argument = e.target.value;
    }

    const setDecision = (e) => {
        currentDiary.decision = e.target.value;
    }

    return (
        <DetailBlock>
            <DiaryDate getToday={getToday}/>
            <DiaryEmotion>
            <span className="my-emotion">나의 감정</span>
                <span className="emotion-name">{currentEmotion}</span>
                <div className="sub-emotion-name">{currentSubEmotion}</div>
                <MainEmotion>
                <div className="emotion joy" onClick={()=>{onClickMainEmotion("기쁨", 0)}}>기쁨</div>
                    <div className="emotion rage" onClick={()=>{onClickMainEmotion("분노", 1)}}>분노</div>
                    <div className="emotion sad" onClick={()=>{onClickMainEmotion("슬픔", 2)}}>슬픔</div>
                    <div className="emotion delight" onClick={()=>{onClickMainEmotion("즐거움", 3)}}>즐거움</div>
                    <div className="emotion love" onClick={()=>{onClickMainEmotion("사랑", 4)}}>사랑</div>
                    <div className="emotion hate" onClick={()=>{onClickMainEmotion("미움", 5)}}>미움</div>
                    <div className="emotion desire" onClick={()=>{onClickMainEmotion("바람", 6)}}>바람</div>
                    <div className="emotion common" onClick={()=>{onClickMainEmotion("무난", 7)}}>무난</div>
                    <div className="emotion others" onClick={()=>{onClickMainEmotion("기타", 8)}}>기타</div>
                </MainEmotion>
                <DetailEmotion>
                    {emotionArray[currentIndex].sub.map(emo => <span onClick={()=>{currentDiary.subEmotion.push(emo); console.log(currentDiary.subEmotion); setCurrentSubEmotion(currentSubEmotion+emo+" ")}}>{emo}</span>)}
                </DetailEmotion>
            </DiaryEmotion>
            <InputForm>
            <h3 className="title">상황</h3>
                    <textarea className="description" onChange={setSituation} defaultValue={currentDiary.situation}></textarea>
                    <h3 className="title">감정의 이유</h3>
                    <textarea className="description" onChange={setReason} defaultValue={currentDiary.reason}></textarea>
                    <h3 className="title">나의 반응</h3>
                    <textarea className="description" onChange={setMyResponse} defaultValue={currentDiary.myResponse}></textarea>
                    <h3 className="title">그 때의 생각</h3>
                    <textarea className="description" onChange={setThoughts} defaultValue={currentDiary.thoughts}></textarea>
                    <h3 className="title">생각 반박해보기</h3>
                    <textarea className="description" onChange={setArgument} defaultValue={currentDiary.argument}></textarea>
                    <h3 className="title">마음에 새기기</h3>
                    <textarea className="description" onChange={setDecision} defaultValue={currentDiary.decision}></textarea>
            </InputForm>
            <ButtonBlock>
                <Link to="/"><Button onClick={props.onEdit}>수정</Button></Link>
                <Link to="/"><Button>홈으로</Button></Link>
            </ButtonBlock>
        </DetailBlock>
    );
}

export default Detail;