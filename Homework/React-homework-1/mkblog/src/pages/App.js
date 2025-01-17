import { useState } from "react";
import "./App.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Routes, Route, useNavigate} from 'react-router-dom';

function dataLoad() {
  const items = [
    {
      src: "https://img1.daumcdn.net/thumb/C280x280.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/5tdm/image/fW2N0Gm4dHvpLENGdZQY-S2NkUA.jpg",
      title: "1000일간의 운동 기록",
      preview: "운동의 시작 건강에 관심을 가져야 할 때라는 것을 알고 있었지만 운동을 시작한 계기는 특별히 없다.",
      createDate: "2000-07-04",
    },
    {
      src: "https://img1.daumcdn.net/thumb/C280x280.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/5tdm/image/awCx6_lLVT4xus0_HP36eWQ_wjg.png",
      title: "수료율 71.7%, NPS 97.8% 어떻게?",
      preview: "우아한테크캠프 Pro 2,3기 후기 | 수료율 71.7%, NPS 97.8% 비결은? 교육 과정의 난이도를 대폭 높였음에도 불구하고",
      createDate: "2023-01-04",
    },
    {
      src: "https://img1.daumcdn.net/thumb/C280x280.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/5tdm/image/OEswlM-r3UZHMyC3RHt23vO4EfI.jpeg",
      title: "개발자를 꿈꾸는 취업 준비생에게",
      preview: "오늘 아침 운동으로 어깨 운동을 했는데 유난히 힘들었다. 분명 잠도 잘 잤는데 집중이 잘 되지 않았다. 역시나 아침에 중량 운동은 힘들다.",
      createDate: "2023-01-03",
    },
  ];
  return items;
}

function WorkData() {
  const items = [
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrgFkiirkmCx65JaSilSfV5lcDwYfo-dfVg&usqp=CAU",
      title: "고양이",
      preview: "고양이"
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPRfWn9v7iv3DoiiyNsyIdp81XPURtsKOXdQ&usqp=CAU",
      title: "강아지",
      preview: "강아지"
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3vu9TX8QVBo9fxcIHOu-BjErYXFqn4zDGew&usqp=CAU",
      title: "여우",
      preview: "여우"
    }
  ];
  return items;
}

function Card(props) {
  return (
    <div>
      <Col>
        <img src={props.image} style={{width: '300px', height: '300px', paddingBottom: '10px'}}/>
        <div className='text' style={{margin: 'auto', width: '300px', height: '150px', textAlign: 'left'}}>
          <div style={{fontSize:'17px', paddingBottom: '9px'}}>{props.name}</div>
          <div style={{fontSize:'15px', color: 'grey'}}>{props.children} </div>
          <div style={{paddingTop:'5px', fontSize:'8px', color: 'grey'}}>{props.date}</div>
        </div>
      </Col>
    </div>
  );
}

function Main() {
  return(
      <div style={{textAlign: 'left',}}>
        <img className="mainImage" src="https://img1.daumcdn.net/thumb/C500x500.fjpg/?fname=http://t1.daumcdn.net/brunch/service/guest/image/V4wdZX1aq-c_w0D7_taGTXkIgrk"></img>
        <div>
          <div style={{fontSize: '26px'}}>박재성</div>
          <div style={{color: 'grey', fontSize: '15px', paddingTop: '7px'}}>넥스트스텝 CEO</div>
        </div>        
        <div style={{padding: '14px'}}></div>
        <Row>
          <Col xs={2}>
            <div style={{color: 'grey', fontSize: '14px'}}>구독자 </div>
            <div style={{color: 'grey', fontSize: '22px'}}>1,270</div>
          </Col>
          <Col xs={2}>
            <div style={{color: 'grey', fontSize: '14px'}}>관심작가 </div>
            <div style={{color: 'grey', fontSize: '22px'}}>26</div>
          </Col>
        </Row>
      </div>
  )
}

function Inform() {
  return(
    <div style={{fontSize: '13px', color: 'grey'}}>
      <div>소개</div>
      <div style={{padding: '10px'}}></div>
      <div>컴퓨터공학과 20학번</div>
      <Tag>ML</Tag>
      <Tag>Web</Tag>
    </div>
  )
}

function Tag(props) {
  return(
    <button className="tag">
      {props.children}
    </button>
  )
}

function App() {
  let [btn, setBtn] = useState([0, 0, 0]);

  var arr = [1, 2, 3];
  let result = null;
  let navigate = useNavigate()

  if(btn[0] == 0){
    let loadedData = null

    if(btn[1] == 1){
      loadedData = dataLoad();
    }

    else{
      loadedData = WorkData();
    }

    result = arr.map((a, i) => {
    return (
      <Col xs={6}>
        <Card name={loadedData[i].title} image={loadedData[i].src} date={loadedData[i].createDate}>
          {loadedData[i].preview}
        </Card>
      </Col>
    );
  })
  };

  return (
    <div className="Wrapper">
        <div className="App">
          <div>
            <Main/>
          </div>
          <div className="pad"></div>
          <div className="pad"></div>
          <Row className="justify-content-center">
            <button
              onClick={() => {
                setBtn([1, 0, 0])
                navigate('/inform')
              }}> 
            작가소개 
            </button>

            <button
              onClick={() => {
                setBtn([0, 1, 0])
                navigate('/writing')
              }}>
              글 {arr.length}
            </button>

            <button
              onClick={() => {
                setBtn([0, 0, 1])
                navigate('/work')
              }}> 작품 </button>
          </Row>
          <div className="pad"></div>
          <Routes>
            <Route path="/"></Route>
            <Route path="/inform" element={<div className="content"><Inform/></div>}></Route>
            <Route path="/writing" element={<Row md={2}>{result}</Row>}></Route>
            <Route path="/work" element={<Row md={2}>{result}</Row>}></Route>
          </Routes>
        </div>
    </div>
  );
}

export default App;