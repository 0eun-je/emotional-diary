/* EmotionCategory : 감정 폴더 선택 시 선택된 감정 관련 일기 출력 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ImFolder } from 'react-icons/im';
import DiaryItem from './DiaryItem';

// style //
const EmotionCategoryBlock = styled.div`
    padding-top: 60px;
    
    h2 {
        width: 60%;
        margin: 0 auto 70px auto;
        padding: 10px;
        border: 1px solid #CED4DA;
        font-family: "barunpenR";
        font-size: 20px;
        text-align: center;
    }

    .line {
        margin-top: 70px;
        border-top: 1px solid #CED4DA;
    }

    .emotion-name {
        width: 12%;
        margin: 30px auto 20px auto;
        padding: 10px 50px;
        border: 1px solid #CED4DA;
        text-align: center;
    }
`;

const FolderBlock = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    @media screen and (max-width: 768px) {
        margin-left: 8%;
    }
`;

const Folder = styled.div`
    margin-right: 50px;
    text-align: center;
    
    .folder-icon {
        font-size: 70px;
    }

    .joy {
        color: #FFEDA3;
    }

    .rage {
        color: #FFDCB8;
    }

    .sad {
        color: #CDF0EA;
        margin-right: 0px;
    }

    .delight {
        color: #CCF6C8;
    }

    .love {
        color: #FFDDCC;
    }

    .hate {
        color: #E7E6E1;
        margin-right: 0px;
    }

    .desire {
        color: #FFE6E6;
    }

    .common {
        color: #E7D4B5;
    }

    .others {
        color: #FFF5DA;
        margin-right: 0px;
    }

    h5 {
        margin: 0px;
        font-family: "barunpenB";
        font-size: 20px;
    }

    &:hover{
        cursor: pointer;
        filter: brightness(97%);
    }
`;

const DiaryListBlock = styled.div`
    flex: 1;
    height: 1010px;
    padding: 0px 5px;
    overflow-y: auto;
`;

// function //
function EmotionCategory(props) {
    const [currentEmotion, setCurrentEmotion] = useState("기쁨");
    const diaries = props.diaries;

    return (
        <EmotionCategoryBlock>
            <h2>폴더 안에 감정별로 일기가 담겨있어요.</h2>
            <FolderBlock>
                <Folder>
                <ImFolder className="folder-icon joy" onClick={()=>{setCurrentEmotion("기쁨");}}/>
                <h5>기쁨</h5>
                </Folder>
                <Folder>
                <ImFolder className="folder-icon rage" onClick={()=>{setCurrentEmotion("분노");}}/>
                <h5>분노</h5>
                </Folder>
                <Folder>
                <ImFolder className="folder-icon sad" onClick={()=>{setCurrentEmotion("슬픔");}}/>
                <h5>슬픔</h5>
                </Folder> 
            </FolderBlock>
            <FolderBlock>
                <Folder>
                <ImFolder className="folder-icon delight" onClick={()=>{setCurrentEmotion("즐거움");}}/>
                <h5>즐거움</h5>
                </Folder>
                <Folder>
                <ImFolder className="folder-icon love" onClick={()=>{setCurrentEmotion("사랑");}}/>
                <h5>사랑</h5>
                </Folder>
                <Folder>
                <ImFolder className="folder-icon hate" onClick={()=>{setCurrentEmotion("미움");}}/>
                <h5>미움</h5>
                </Folder> 
            </FolderBlock>
            <FolderBlock>
                <Folder>
                <ImFolder className="folder-icon desire" onClick={()=>{setCurrentEmotion("바람");}}/>
                <h5>바람</h5>
                </Folder>
                <Folder>
                <ImFolder className="folder-icon common" onClick={()=>{setCurrentEmotion("무난");}}/>
                <h5>무난</h5>
                </Folder>
                <Folder>
                <ImFolder className="folder-icon others" onClick={()=>{setCurrentEmotion("기타");}}/>
                <h5>기타</h5>
                </Folder> 
            </FolderBlock>
            <div className="line"></div>
            <h3 className="emotion-name">{currentEmotion}</h3>
            <DiaryListBlock>
                {props.diaries.map(diary => diary.emotion === currentEmotion ? <Link to={{
                    key: diary.id,
                    pathname: '/detail/'+diary.id,
                    state: {diaries}
                }}><DiaryItem diary={diary} onRemove={props.onRemove}/></Link>: "")}
            </DiaryListBlock>
        </EmotionCategoryBlock>
    );
}

export default EmotionCategory;