import React, { useRef, useReducer, useCallback } from 'react';
import { createGlobalStyle } from 'styled-components';
import './fonts/fonts.css';
import RouterJS from './components/RouterJS';

// style //
const GlobalStyle = createGlobalStyle`
  body {
    background: #fff5f5;
    font-family: "barunpenR";
    color: #495057;
  }

  a {
    text-decoration: none;
    color: #495057;
  }

  footer {
    height: 50px;
    background: #F4A9A8;
  }

  footer p {
      padding-top: 15px;
      font-family: "barunpenB";
      font-size: 14px;
      color: #FFFFFF;
      text-align: center;
  }
`;

// diary array //
const initialState = {
  inputs: {
    dateforDiary: "",
    emotion: "",
    subEmotion: [],
    situation: "",
    reason: "",
    myResponse: "",
    thoughts: "",
    argument: "",
    decision: ""
  },
  diaries: [
    {
      id: 1,
      dateforDiary: "2021. 8. 19.",
      emotion: "기쁨",
      subEmotion: ["행복한", "만족스러운", "기쁜", "날아갈 듯한"],
      situation: "내가 예전부터 사고 싶었던 빔프로젝터를 샀다.",
      reason: "영화를 워낙 좋아해서 해상도가 높은 빔프로젝터를 사고 싶었다. 차곡차곡 모은 돈으로 사게 되서 기분이 좋다.",
      myResponse: "사러갈 때부터 기분이 너무 좋았고 집에서도 계속 이런저런 기능을 켜보며 만지작거렸다.",
      thoughts: "좋아하는 취미 하나를 가진 것만으로도 이렇게 행복해질 수 있구나라고 새삼 느꼈다. 또한 목표를 위해 돈을 모으는 과정이 굉장히 뿌듯하고 알찼다.",
      argument: "내 경제사정을 고려해봤을 때 너무 비싼 걸 산 건 아닐까? 좀 더 알아볼 순 없었을까?",
      decision: "나를 위한 소비는 분명히 필요하다. 좋아하는 게 있는 것도 큰 행복이다. 다만 조금 더 합리적인 소비를 위해 더 시간을 쓰고 고민해보자."
    },
    {
      id: 2,
      dateforDiary: "2021. 8. 19.",
      emotion: "미움",
      subEmotion: ["서운한", "싫은", "억울한", "미운", "원망스러운"],
      situation: "나를 이유없이 싫어하고 못되게 구는 사람이 있다.",
      reason: "잘못한 점이 있다면 내가 고칠텐데 그냥 이유없이 싫어하니 서운하고 억울하고 밉다. 그리고 나에 대한 나쁜 이야기를 하고 다녀서 스트레스를 많이 받고 있다.",
      myResponse: "나 역시 그 사람을 싫어하는 티를 많이 내고 있고 지인들에게 억울함을 털어놓고 있다.",
      thoughts: "나에게 못되게 구니 나도 못되게 굴어도 된다는 일종의 합리화를 했던 것 같다.",
      argument: "똑같이 행동하면 기분이 좀 더 나아질까? 나 역시 이유없이 싫어하는 사람이 있지는 않은가?",
      decision: "미움은 나 자신도 상처입히는 감정이다. 똑같이 미워한다고 내 기분이 전혀 좋아지지 않는다. 나를 좋아해주는 사람이 있듯이 싫어하는 사람도 있구나하고 넘기는 게 좋을 것 같다."
    },
    {
      id: 3,
      dateforDiary: "2021. 8. 19.",
      emotion: "기쁨",
      subEmotion: ["후련한", "고무적인", "뿌듯한"],
      situation: "토이 프로젝트를 끝냈다!",
      reason: "처음 적용해보는 기능이 많아서 머리 쥐어뜯는 날들이 계속됐었는데 끝나고 나니 너무 뿌듯하고 후련하다. 역시 이게 프로그래밍의 가장 큰 매력이 아닐까 싶다.",
      myResponse: "끝난 기념으로 가족들과 함께 치맥을 먹었다.",
      thoughts: "그냥 너무 기쁘고 뿌듯했다.",
      argument: "끝나고나니 기뻤지만 과정에서 너무 큰 스트레스를 받은 건 아니었을까? 좀 더 시간을 투자하면 더 완성도 높게 마무리할 수 있지 않았을까?",
      decision: "어려움에 많이 부딪힐수록 성장의 밑거름이 되어 나중에 같은 실수를 하지 않을 수 있다."
    }
  ]
};

// REDUCER : component의 상태변화에 따라 해당하는 기능 return //
function reducer(state, action) {
  switch(action.type) {
    case 'CREATE_DIARY':
      return{
        ...state,
        diaries: state.diaries.concat(action.diary)
      };
    case 'EDIT_DIARY':
      return{
        ...state,
        diaries: state.diaries.map(diary => diary.id === action.diary.id ? {diary: action.diary} : diary)
      };
    case 'REMOVE_DIARY':
      return {
        ...state,
        diaries: state.diaries.filter(diary => diary.id !== action.id)
      };
    default:
        return state;
  }
}

function App() {
  const nextId = useRef(4); // id는 자동 부여

  const [state, dispatch] = useReducer(reducer, initialState);
  const {diaries, inputs} = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_DIARY',
      diary: {
        id: nextId.current,
        dateforDiary: inputs.dateforDiary,
        emotion: inputs.emotion,
        subEmotion: inputs.subEmotion,
        situation: inputs.situation,
        reason: inputs.reason,
        myResponse: inputs.myResponse,
        thoughts: inputs.thoughts,
        argument: inputs.argument,
        decision: inputs.decision
      }
    });
    nextId.current += 1;
  }, [inputs.dateforDiary, inputs.emotion, inputs.subEmotion, inputs.situation, inputs.reason, inputs.myResponse, inputs.thoughts, inputs.argument, inputs.decision]);

  const onEdit = useCallback(() => {
    dispatch({
      type: 'EDIT_DIARY',
      diary: {
        dateforDiary: inputs.dateforDiary,
        emotion: inputs.emotion,
        subEmotion: inputs.subEmotion,
        situation: inputs.situation,
        reason: inputs.reason,
        myResponse: inputs.myResponse,
        thoughts: inputs.thoughts,
        argument: inputs.argument,
        decision: inputs.decision
      }
    });
  }, [inputs.dateforDiary, inputs.emotion, inputs.subEmotion, inputs.situation, inputs.reason, inputs.myResponse, inputs.thoughts, inputs.argument, inputs.decision]);

  const onRemove = useCallback((id) =>{
    dispatch({
      type: 'REMOVE_DIARY',
      id
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <RouterJS diaries={diaries} inputs={inputs} onCreate={onCreate} onEdit={onEdit} onRemove={onRemove}/>
    </>
  );
}

export default App;
