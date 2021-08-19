/* RouterJS : 라우터를 이용한 페이지 이동 설정 */
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import InputFormPage from '../pages/InputFormPage';
import DetailPage from '../pages/DetailPage';
import EmotionsPage from '../pages/EmotionsPage';
import CalenderPage from '../pages/Calendarpage';
import StatsPage from '../pages/StatsPage';

function RouterJS(props){
    return (
    <Router basename={process.env.PUBLIC_URL}>
        <Route path="/" exact render={()=><MainPage {...props} />}/>
        <Route path="/input" exact render={()=><InputFormPage {...props} />}/>
        <Route path="/detail/:id" exact render={props=><DetailPage {...props} />}/>
        <Route path="/emotion" exact render={()=><EmotionsPage {...props} />}/>
        <Route path="/calendar" exact render={()=><CalenderPage {...props} />}/>
        <Route path="/stats" exact render={()=><StatsPage {...props} />}/>
    </Router>
    );
}

export default RouterJS;