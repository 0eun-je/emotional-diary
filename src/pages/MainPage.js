/* MainPage : 해당 날짜의 일기를 한 눈에 보여주는 메인 페이지 */ 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import Header from '../components/Header';
import InnerTemplate from '../components/InnerTemplate';
import Profile from '../components/Profile';
import DiaryTemplate from '../components/DiaryTemplate';
import DiaryHeader from '../components/DiaryHeader';
import DiaryItem from '../components/DiaryItem';

// style //
const flexStyle = {
    display: "flex"
};

const DiaryList = styled.div`
    flex: 1;
    height: 1440px;
    padidng: 30px;
    overflow-y: auto;
`;

// function //
function MainPage(props) {
    const diaries = props.diaries;

    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth()+1;
    const date = d.getDate();
    const initialToday = year + ". " + month + ". " + date + ".";
    const [today, setToday] = useState(initialToday);

    // header 부분에서 날짜값을 전달받는 함수 //
    const getToday = (text) => {
        setToday(text);
    }

    const isMobile = useMediaQuery({
        query : "(max-width: 768px)"
    });

    const isTablet = useMediaQuery({
        query : "(min-width: 768px) and (max-width: 992px)"
    });

    const isPC = useMediaQuery({
        query : "(min-width: 992px)"
    });

    return(
        <>
            {(isTablet || isPC) && 
            <>
            <Header/>
            <InnerTemplate>
                <div style={flexStyle}>
                    <Profile {...props} />
                    <DiaryTemplate>
                        <DiaryHeader getToday={getToday}/>
                        <DiaryList>
                            {diaries.map(diary => today === diary.dateforDiary ? <Link to={{
                                key : diary.id,
                                pathname: '/detail/'+diary.id,
                                state: {diaries}
                            }}><DiaryItem key={diary.id} diary={diary} onRemove={props.onRemove}/></Link> : "")}
                        </DiaryList>
                    </DiaryTemplate>
                </div>
            </InnerTemplate>
            <footer>
                <p>Copyright© Je yeong eun. All rights Reserved.</p>
            </footer>
            </>}
            {isMobile &&
            <> 
            <Header/>
            <InnerTemplate>
                <Profile {...props} />
                <DiaryTemplate>
                    <DiaryHeader getToday={getToday}/>
                    <DiaryList>
                        {diaries.map(diary => today === diary.dateforDiary ? <Link to={{
                            key : diary.id,
                            pathname: '/detail/'+diary.id,
                            state: {diaries}
                        }}><DiaryItem key={diary.id} diary={diary} onRemove={props.onRemove}/></Link> : "")}
                    </DiaryList>
                </DiaryTemplate>
            </InnerTemplate>
            <footer>
                <p>Copyright© Je yeong eun. All rights Reserved.</p>
            </footer>
            </>}
        </>
    );
}

export default MainPage;