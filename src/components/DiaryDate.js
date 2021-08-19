/* DiaryDate : 날짜를 선택하고 선택한 날짜값을 다른 component에 전달하는 component */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// style //
const DiaryDateBlock = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 10px;

    .back-arrow {
        display: block;
        margin: 2px 30px 0px 0px;
        font-size: 35px;

        &:hover {
            cursor: pointer;
            background: #FFDADA;
            border-radius: 50%;
            color: #E98580;
        }
    }

    .date {
        margin-top: 0px;
        font-family: "barunpenB";
        font-size: 30px;
    }

    .forward-arrow {
        margin: 2px 0px 0px 30px;
        font-size: 35px;

        &:hover {
            cursor: pointer;
            background: #FFDADA;
            border-radius: 50%;
            color: #E98580;
        }
    }

    @media screen and (max-width: 992px) {
        .back-arrow { font-size: 29px; }
        .date { font-size: 27px; }
        .forward-arrow { font-size: 29px; }
    }

    @media screen and (max-width: 768px) {
        
    }
`;

// function //
function DiaryDate(props) {
    const d = new Date();
    const [year, setYear] = useState(d.getFullYear());
    const [month, setMonth] = useState(d.getMonth()+1);
    const [date, setDate] = useState(d.getDate());
    let today = year + ". " + month + ". " + date + ".";
    
    // 선택한 날짜를 다른 component로 전달하는 함수
    const setToday = () => {
        props.getToday(today);
    };

    // 선택한 날짜가 달라질 때마다 today를 설정해야 하므로 useEffect 사용
    useEffect(()=>{
        setToday(today);
    }, [today]);
    
    // 이후 날짜를 선택하는 함수
    const onIncrease = () => {
        if(month===12&&date===31){
            setYear(year+1);
            setMonth(1);
            setDate(1);
        }
        else if((month===1&&date===31) || (month===2&&date===28) || (month===2&&date===29) || (month===3&&date===31) 
            || (month===4&&date===30) || (month===5&&date===31) || (month===6&&date===30) || (month===7&&date===31) 
            || (month===8&&date===31)|| (month===9&&date===30) || (month===10&&date===31) || (month===11&&date===30)){
            setMonth(month+1);
            setDate(1);
        }
        else
            setDate(date+1);
    };

    // 이전 날짜를 선택하는 함수. 윤년 적용 필수.
    const onDecrease = () => {
        if(month===1&&date===1){
            setYear(year-1); setMonth(12); setDate(31);
        }
        else if((month===2&&date===1) || (month===4&&date===1) || (month===6&&date===1) || (month===8&&date===1)
            || (month===9&&date===1) || (month===11&&date===1)){
            setMonth(month-1);
            setDate(31);
        }
        else if((month===5&&date===1) || (month===7&&date===1) || (month===10&&date===1) || (month===12&&date===1)){
            setMonth(month-1);
            setDate(30);
        }
        else if(month===3&&date===1){
            if((year%4===0&&year%100!==0) || year%400===0){  //윤년
                setMonth(month-1);
                setDate(29);
            }
            else{
                setMonth(month-1);
                setDate(28);
            }
        }
        else
            setDate(date-1);
    };

    return (
        <DiaryDateBlock>
            <IoIosArrowBack className="back-arrow" onClick={onDecrease}/>
            <h2 className="date">{today}</h2>
            <IoIosArrowForward className="forward-arrow" onClick={onIncrease}/>
        </DiaryDateBlock>
    );
}

export default DiaryDate;