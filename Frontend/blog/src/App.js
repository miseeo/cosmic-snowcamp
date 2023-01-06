import {useState} from 'react';
import './App.css';

function App() {
  let [글제목, 글제목변경] = useState(['남자코트 추천', '강남 우동맛집', '파이썬 독학'])
  let [좋아요, 좋아요변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(-1);
  let [입력값, 입력값변경] = useState('')

  var array = [2, 3, 4];
  
  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      {
        글제목.map(function(a, i){
          return (
            <div className="list" key={i}>
              <h4 onClick={() => { setModal(true); setTitle(i)}}>{글제목[i]}<span onClick={(e)=>{
                e.stopPropagation()
                let copy = [...좋아요]
                copy[i] = copy[i] + 1
                좋아요변경(copy)}}>❤️</span>{좋아요[i]}</h4>
              <p>2월 7일 발행</p>
              <button onClick={()=>{
                let copy = [...글제목]
                copy.splice(i, 1)
                글제목변경(copy)
              }}>삭제</button>
            </div>
          )
        })
      }
      <input type="text" onChange={(e) => {
        입력값변경(e.target.value)
      }}/>
      <button onClick={()=>{
        let copy = [...글제목, 입력값]
        글제목변경(copy)
        array.push(1)
        console.log(array)
        
        let likeCopy = [...좋아요, 0]
        좋아요변경(likeCopy)
      }}>글발행</button>
      {
        modal == true ? <Modal 글제목={글제목} title={title}></Modal> : null
      }

    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;
