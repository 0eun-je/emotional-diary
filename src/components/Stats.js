/* Stats : 오늘의 감정, 이 달의 감정 통계 차트 */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import DiaryDate from './DiaryDate';

// style //
const StatsBlock = styled.div`
    padding: 40px 30px;
    
    h1 {
        margin: 100px 0px 50px 0px;
        padding: 10px 0px;
        border: 1px solid #CED4DA;
        font-family: "barunpenB";
        font-size: 27px;
        text-align: center;
    }

    @media screen and (max-width: 992px) {
        h1 { font-size: 22px; }
    }
`;

const PieChart = styled.div`
    height: 500px;
`;

const BarChart = styled.div`
    height: 550px;
`;

const Mood = styled.div`
    padding: 20px 30px 35px 30px;
    margin-top: 30px;
    border: 1px solid #ced4da;

    h2 {
        font-family: "barunpenB";
        font-size: 21px;
    }

    p {
        font-family: "barunpenR";
        font-size: 17px;
        line-height: 1.6em;
        margin: 0px;
    }

    @media screen and (max-width: 992px) {
        h2 { font-size: 18px; }
        p { font-size: 14px; }
    }

    @media screen and (max-width: 768px) {
        h2 { font-size: 18px; }
        p { font-size: 15px; }
    }
`;

// 가장 많은 감정에 대한 description //
const description = [
    {
        id: 0,
        emotion: "기쁨",
        title: "오늘은 기분 좋은 일이 많은 날이네요!",
        advice: ["기쁜 일이 많았던 하루셨군요. 날마다 일어나는 소소한 편안함과 기쁨에서 행복을 찾는다면 기분좋은 날들이 더 많아질 거에요.", 
        "기쁨은 나누면 배가 되니 소중한 사람들과 오늘의 기쁜 일을 소소하게 나누는 것도 기분 전환이 될 수 있겠죠?",
        "오늘도 고생 많으셨습니다. 편안한 마음으로 푹 주무세요."]
    },
    {
        id: 1,
        emotion: "분노",
        title: "화가 나는 일이 많으셨나요?",
        advice: ["타인에 대한 분노는 결국 내 시간과 내 감정을 소모하게 하여, 나를 아무것도 할 수 없게 만들어요.",
                "나에게 상처를 준 상대가 화나겠지만 그 감정에 계속 붙잡혀 있지 말고 나를 위해 내려놓으세요.",
                "내 시간과 감정을 좋아하는 사람에게 쏟아요."]
    },
    {
        id: 2,
        emotion: "슬픔",
        title: "오늘은 슬픔이 많은 날이네요",
        advice: ["평화롭지만은 않았던 하루, 당신을 괴롭히던 순간들은 이미 지나갔어요.",
                "굳이 그 순간에 머무느라 다시금 아파한다거나 정답이 없는 고민에 빠져 잠을 설치지 말아요.",
                "오늘 하루 정말 수고하셨어요. 힘들었던 오늘, 당신을 위로할 좋은 꿈이 찾아오길 바라요."]
    },
    {
        id: 3,
        emotion: "즐거움",
        title: "오늘은 즐거운 날이셨나요?",
        advice: ["웃을 일이 많은 날이셨나요? 그렇다면 다행이에요.",
                "항상 즐거울 수는 없는 것이 우리의 일상사이지만 스스로 영화감독이 되어 즐거움을 연출하면",
                "놀랍게도 그 즐거움이 실제의 삶에 고스란히 녹아든답니다. 내일도 즐거운 하루 되세요."]
    },
    {
        id: 4,
        emotion: "사랑",
        title: "사랑이 가득한 날이셨군요",
        advice: ["사랑하고 사랑받는 것은 양 쪽에서 태양을 느끼는 것이라는 말이 있어요.",
                "그만큼 사랑이라는 감정은 삶은 따뜻하고 풍요롭게 만든답니다.",
                "하지만 무엇보다 위대한 사랑은 자신을 사랑하는 법을 아는 것이니 나 자신도 많이 사랑해주세요."]
    },
    {
        id: 5,
        emotion: "미움",
        title: "미움이 비처럼 쏟아지는 하루셨나요?",
        advice: ["미움은 나 자신에게도 끊임없는 상처를 주는 양날의 검과 같은 감정이에요.",
                "그들을 향한 미움과 원망에서 스스로를 놓아주도록 해요.",
                "용서는 자기 자신에게 베푸는 가장 큰 자비이자 사랑입니다."]
    },
    {
        id: 6,
        emotion: "바람",
        title: "무언가를 간절히 바라고 있나요?",
        advice: ["소망과 목표 의식은 삶의 큰 원동력이 될 수 있어요.",
                "산을 움직이려면 작은 돌을 들어내는 것부터 시작해야 하듯이 작은 목표부터 차근차근 이뤄보세요.",
                "그러다보면 내가 원하는 게 성큼 눈 앞에 다가와있을 거에요."]
    },
    {
        id: 7,
        emotion: "무난",
        title: "평온하고 무난한 하루였나요?",
        advice: ["꼭 다이나믹한 하루만이 좋은 건 아니에요.",
                "늘 그랬듯이 편안하고 무난하게 흘러가는 하루하루가 참 감사하고 소중한 순간들이죠.",
                "오늘 하루 수고했어요. 편안하게 하루를 마무리하시길 바라요."]
    },
    {
        id: 8,
        emotion: "기타",
        title: "오늘은 어떤 하루였나요?",
        advice: ["어떤 일이 있었고, 어떤 기분이 드는 하루였나요?",
                "오늘 하루도 무사히 살아갔으면 그걸로 충분해요.",
                "내일은 더 많이 웃고 행복한 하루가 될 거에요! 따뜻한 차 한 잔과 함께 하루를 마무리 해보는 건 어떨까요?"]
    }
];

// 오늘의 감정 통계를 나타내는 파이 차트 //
const MyResponsivePie = ({ data }) => (
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.4}
        padAngle={1}
        colors={{ scheme: 'pastel1' }}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: '기쁨'
                },
                id: 'dots'
            },
            {
                match: {
                    id: '즐거움'
                },
                id: 'dots'
            },
            {
                match: {
                    id: '분노'
                },
                id: 'lines'
            },
            {
                match: {
                    id: '슬픔'
                },
                id: 'lines'
            },
            {
                match: {
                    id: '미움'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 80,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
);

// 이 달의 감정 통계를 나타내는 바 차트 //
const MyResponsiveBar = ({ data }) => (
    <ResponsiveBar
        data={data}
        keys={['emotion']}
        indexBy="name"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        valueFormat={{ format: '', enabled: false }}
        colors={{ scheme: 'pastel1' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
);

// function //
function Stats(props) {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth()+1;
    const date = d.getDate();
    const initialToday = year + ". " + month + ". " + date + ".";
    const [today, setToday] = useState(initialToday);

    let strArray = today.split('.');

    // DiaryDate에서 날짜를 받아오는 함수 //
    const getToday = (text) => {
        setToday(text);
    };

    // 오늘의 감정, 이 달의 감정 갯수. 동적인 변수로 전부 useState로 관리. //
    let [joyCount, setJoyCount] = useState(0), [rageCount, setRageCount] = useState(0),
    [sadCount, setSadCount] = useState(0), [delightCount, setDelightCount] = useState(0),
    [loveCount, setLoveCount] = useState(0), [hateCount, setHateCount] = useState(0),
    [desireCount, setDesireCount] = useState(0), [commonCount, setCommonCount] = useState(0),
    [othersCount, setOthersCount] = useState(0);

    let [joyCountMonthly, setJoyCountMonthly] = useState(0), [rageCountMonthly, setRageCountMonthly] = useState(0),
    [sadCountMonthly, setSadCountMonthly] = useState(0), [delightCountMonthly, setDelightCountMonthly] = useState(0),
    [loveCountMonthly, setLoveCountMonthly] = useState(0), [hateCountMonthly, setHateCountMonthly] = useState(0),
    [desireCountMonthly, setDesireCountMonthly] = useState(0), [commonCountMonthly, setCommonCountMonthly] = useState(0),
    [othersCountMonthly, setOthersCountMonthly] = useState(0);

    // 가장 많은 감정 //
    const [mostEmotion, setMostEmotion] = useState("기타");

    // 날짜가 바뀌면 모든 값 초기화 //
    const init = () => {
        setJoyCount(0); setRageCount(0); setSadCount(0); setDelightCount(0); setLoveCount(0); setHateCount(0);
        setDesireCount(0); setCommonCount(0); setOthersCount(0);
        setJoyCountMonthly(0); setRageCountMonthly(0); setSadCountMonthly(0); setDelightCountMonthly(0);
        setLoveCountMonthly(0); setHateCountMonthly(0); setDesireCountMonthly(0); setCommonCountMonthly(0); setOthersCountMonthly(0);
        joyCount = 0; rageCount = 0; sadCount = 0; delightCount = 0; loveCount = 0; hateCount = 0;
        desireCount = 0; commonCount = 0; othersCount = 0;
        joyCountMonthly = 0; rageCountMonthly = 0; sadCountMonthly = 0; delightCountMonthly = 0; loveCountMonthly = 0;
        hateCountMonthly = 0; desireCountMonthly = 0; commonCountMonthly = 0; othersCountMonthly = 0;
    }

    // 날짜가 바뀔 때마다 갯수 재설정
    useEffect(()=>{
        init();
        props.diaries.forEach(diary => {
            if(diary.dateforDiary === today) {
                if(diary.emotion === "기쁨")
                    setJoyCount(++joyCount);
                else if(diary.emotion === "분노")
                    setRageCount(++rageCount);
                else if(diary.emotion === "슬픔")
                    setSadCount(++sadCount);
                else if(diary.emotion === "즐거움")
                    setDelightCount(++delightCount);
                else if(diary.emotion === "사랑")
                    setLoveCount(++loveCount);
                else if(diary.emotion === "미움")
                    setHateCount(++hateCount);
                else if(diary.emotion === "바람")
                    setDesireCount(++desireCount);
                else if(diary.emotion === "무난")
                    setCommonCount(++commonCount);
                else if(diary.emotion === "기타")
                    setOthersCount(++othersCount);
            }
        });

        props.diaries.forEach(diary => {
            let diaryStrArray = diary.dateforDiary.split('.');
            if(diaryStrArray[1] === strArray[1]){
                if(diary.emotion === "기쁨")
                    setJoyCountMonthly(++joyCountMonthly);
                else if(diary.emotion === "분노")
                    setRageCountMonthly(++rageCountMonthly);
                else if(diary.emotion === "슬픔")
                    setSadCountMonthly(++sadCountMonthly);
                else if(diary.emotion === "즐거움")
                    setDelightCountMonthly(++delightCountMonthly);
                else if(diary.emotion === "사랑")
                    setLoveCountMonthly(++loveCountMonthly);
                else if(diary.emotion === "미움")
                    setHateCountMonthly(++hateCountMonthly);
                else if(diary.emotion === "바람")
                    setDesireCountMonthly(++desireCountMonthly);
                else if(diary.emotion === "무난")
                    setCommonCountMonthly(++commonCountMonthly);
                else if(diary.emotion === "기타")
                    setOthersCountMonthly(++othersCountMonthly);
            }
        });
        rank(); // 가장 많은 emotion 순으로 정렬
    },[today]);

    // 파이 차트 데이터 //
    let pieData = 
    [
        {
            "id": "기쁨",
            "label": "기쁨",
            "value": joyCount,
            "color": "#FFEDA3"
        },
        {
            "id": "분노",
            "label": "분노",
            "value": rageCount,
            "color": "#FFDCB8"
        },
        {
            "id": "슬픔",
            "label": "슬픔",
            "value": sadCount,
            "color": "#CDF0EA"
        },
        {
            "id": "즐거움",
            "label": "즐거움",
            "value": delightCount,
            "color": "#CCF6C8"
        },
        {
            "id": "사랑",
            "label": "사랑",
            "value": loveCount,
            "color": "#FFDDCC"
        },
        {
            "id": "미움",
            "label": "미움",
            "value": hateCount,
            "color": "#E7E6E1"
        },
        {
        "id": "바람",
        "label": "바람",
        "value": desireCount,
        "color": "#FFE6E6"
        },
        {
        "id": "무난",
        "label": "무난",
        "value": commonCount,
        "color": "#E7D4B5"
        },
        {
        "id": "기타",
        "label": "기타",
        "value": othersCount,
        "color": "#FFF5DA"
        }
      ];

    // 바 차트 데이터 //
    const barData = [
        {
            "name": "기쁨",
            "emotion": joyCountMonthly
        },
        {
            "name": "분노",
            "emotion": rageCountMonthly
        },
        {
            "name": "슬픔",
            "emotion": sadCountMonthly
        },
        {
            "name": "즐거움",
            "emotion": delightCountMonthly
        },
        {
            "name": "사랑",
            "emotion": loveCountMonthly
        },
        {
            "name": "미움",
            "emotion": hateCountMonthly
        },
        {
            "name": "바람",
            "emotion": desireCountMonthly
        },
        {
            "name": "무난",
            "emotion": commonCountMonthly
        },
        {
            "name": "기타",
            "emotion": othersCountMonthly
        }
    ];

    // 가장 많은 감정 순으로 정렬 //
    const rank = () => {
        let ranking = [
            {emotion: "기쁨", value: joyCount},
            {emotion: "분노", value: rageCount},
            {emotion: "슬픔", value: sadCount},
            {emotion: "즐거움", value: delightCount},
            {emotion: "사랑", value: loveCount},
            {emotion: "미움", value: hateCount},
            {emotion: "바람", value: desireCount},
            {emotion: "무난", value: commonCount},
            {emotion: "기타", value: othersCount}
        ];

        ranking.sort(function(a, b){
            return b.value - a.value;
        });
        setMostEmotion(ranking[0].emotion);
    };


    return(
        <StatsBlock>
            <DiaryDate getToday={getToday}/>
            <PieChart>
                <MyResponsivePie data={pieData} />
            </PieChart>
            <Mood>
                <h2>{description.map(des => des.emotion === mostEmotion ? des.title : "")}</h2>
                <p>{description.map(des => des.emotion === mostEmotion ? des.advice[0] : "")}</p>
                <p>{description.map(des => des.emotion === mostEmotion ? des.advice[1] : "")}</p>
                <p>{description.map(des => des.emotion === mostEmotion ? des.advice[2] : "")}</p>
            </Mood>
            <h1>이 달의 감정</h1>
            <BarChart>
                <MyResponsiveBar data={barData} />
            </BarChart>
        </StatsBlock>
    );
}

export default Stats;