/* CalendarPage : 달력 상에서 날짜를 선택하면 일기를 볼 수 있는 페이지 */
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Header from '../components/Header';
import InnerTemplate from '../components/InnerTemplate';
import Profile from '../components/Profile';
import DiaryTemplate from '../components/DiaryTemplate';
import CalendarForDiary from '../components/CalendarForDiary';

// style //
const flexStyle = {
    display: "flex"
};

// function //
function CalenderPage(props) {
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
        <Header />
            <InnerTemplate>
                <div style={flexStyle}>
                    <Profile {...props} />
                    <DiaryTemplate>
                        <CalendarForDiary {...props} />
                    </DiaryTemplate>
                </div>
            </InnerTemplate>
            <footer>
                <p>Copyright© Je yeong eun. All rights Reserved.</p>
            </footer>
            </>
        }
        {isMobile && 
        <>
        <Header />
            <InnerTemplate>
                <Profile {...props} />
                <DiaryTemplate>
                    <CalendarForDiary {...props} />
                </DiaryTemplate>
            </InnerTemplate>
            <footer>
                <p>Copyright© Je yeong eun. All rights Reserved.</p>
            </footer>
        </>
        }    
        </>
    );
}

export default CalenderPage;