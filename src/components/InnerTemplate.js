/* InnerTemplate : component들이 화면 중앙에 있도록 margin값을 줌 */
import React from 'react';
import styled from 'styled-components';

// style //
const InnerTemplateBlock = styled.div`
    margin: 0px 5%;
    height: 1800px;

    @media screen and (max-width: 768px) {
        height: 2900px;
    }
`;

// function //
function InnerTemplate({ children }) {
    return (
        <InnerTemplateBlock>
            {children}
        </InnerTemplateBlock>
    );
}

export default InnerTemplate;