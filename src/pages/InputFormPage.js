/* InputFormPage : 일기를 새로 입력하는 페이지 */
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Header from '../components/Header';
import InnerTemplate from '../components/InnerTemplate';
import Profile from '../components/Profile';
import DiaryTemplate from '../components/DiaryTemplate';
import InputDiary from '../components/InputDiary';

// style //
const flexStyle = {
    display: "flex"
};

// function //
function InputFormPage(props) {
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
                        <InputDiary {...props} />
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
                    <InputDiary {...props} />
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

export default InputFormPage;