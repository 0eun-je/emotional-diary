/* DiaryTemplate : 일기 관련 내용이 출력되는 부분 */
import React from 'react';
import styled from 'styled-components';

// style //
const DiaryTemplateBlock = styled.div`
    width: 900px;
    height: 1700px;
    margin: 20px 20px 20px 0px;
    background: #FFFFFF;
    border: 1px solid #DEE2E6;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .08);
    overflow-y: auto;

    @media screen and (max-width: 768px) {
        width: auto;
        margin: 20px;
    }
`;

// function //
function DiaryTemplate({ children }) {
    return (
        <DiaryTemplateBlock>
            {children}
        </DiaryTemplateBlock>
    );
}

export default DiaryTemplate;