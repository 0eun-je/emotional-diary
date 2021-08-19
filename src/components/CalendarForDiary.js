/* CalendarDiary : 달력에서 선택한 날짜의 일기 출력 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../css/Calendar.css';
import Calendar from 'react-calendar'
import DiaryItem from './DiaryItem';

// style //
const CalendarBlock = styled.div`
    padding: 40px 10px 0px 10px;

    .calendar {
        margin: 0 auto;
        padding: 0px 90px;
    }

    .line {
        margin: 50px 0px 25px 0px;
        border-bottom : 1px solid #CED4DA;
    }

    .date {
        padding: 10px 20px;
        margin: 0px 70px 15px 70px;
        border: 1px solid #ced4da;
        font-size: 21px;
        text-align: center;
        letter-spacing: 2px;
    }
`;

const DiaryListBlock = styled.div`
    height: 1075px;
    overflow-y: auto;
    flex: 1;

    @media screen and (max-width: 1320px) { height: 1120px; }
    @media screen and (max-width: 992px) { height: 1170px; }
    @media screen and (max-width: 768px) { height: 1090px; }
`;

// function //
function CalendarForDiary(props) {
    const [value, onChange] = useState(new Date()); // 캘린더에서 바뀌는 날짜값
    const d = new Date();
    const [year, setYear] = useState(d.getFullYear());
    const [month, setMonth] = useState(d.getMonth()+1);
    const [date, setDate] = useState(d.getDate());
    let initialToday = year + ". " + month + ". " + date + ".";
    let [today, setToday] = useState(initialToday);

    const diaries = props.diaries;

    // 캘린더에서 날짜를 선택할 때마다 today값 새로 설정
    useEffect(()=>{
        setYear(value.getFullYear());
        setMonth(value.getMonth()+1);
        setDate(value.getDate());
        setToday(year + ". " + month + ". " + date + ".");
    },[value, year, month, date]);

    return (
        <CalendarBlock>
            <Calendar className="calendar" onChange={onChange} value={value} />
            <div className="line"></div>
            <h3 className="date">{today}</h3>
            <DiaryListBlock>
                {diaries.map(diary => diary.dateforDiary === today ? <Link to={{
                    key: diary.id,
                    pathname: '/detail/'+diary.id,
                    state: {diaries}
                }}><DiaryItem diary={diary} onRemove={props.onRemove} key={diary.id}/></Link> : "")}
            </DiaryListBlock>
        </CalendarBlock>
    );
}

export default CalendarForDiary;