/* DetailPage : 일기를 선택하면 상세 페이지가 출력됨(수정 가능) */
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Header from '../components/Header';
import InnerTemplate from '../components/InnerTemplate';
import Profile from '../components/Profile';
import DiaryTemplate from '../components/DiaryTemplate';
import Detail from '../components/Detail';

// style //
const flexStyle = {
    display: "flex"
};

// function //
function DetailPage(props) {
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
                <Profile {...props.location.state}/>
                <DiaryTemplate>
                    <Detail {...props}/>
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
            <Profile {...props.location.state}/>
            <DiaryTemplate>
                <Detail {...props}/>
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

export default DetailPage;