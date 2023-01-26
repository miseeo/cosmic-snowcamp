import './App.css';
import {useState} from 'react'
import axios from 'axios';
import PieChartComponent from './piechartComponent';
import { PieChart, Pie } from 'recharts';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';

// NUTR_CONT1: 열량
// NUTR_CONT2: 탄 * 4
// NUTR_CONT3: 단 * 4
// NUTR_CONT4: 지 * 9
// NUTR_CONT5: 당 * 4

function App() {
  const key = '6c23fcdfa3b1422dadcb';
  let [result, setResult] = useState([])
  let [input, setInput] = useState('')
  let [data, setData] = useState([])
  let [click, setClick] = useState(false)

  let navigate = useNavigate()

  const reset = () => {
    setInput('')
  }
  
  const onChange = (e) => {
    setInput(e.target.value)
  }

  let nutr = [
    { name: '탄수화물', value: parseInt(data[2] * 4) },
    { name: '단백질', value: parseInt(data[3] * 4) },
    { name: '지방', value: parseInt(data[4] * 9) },
    { name: '당류', value: parseInt(data[5] * 4) },
  ];

  async function getData() {
    try {
      const url = 'http://openapi.foodsafetykorea.go.kr/api/' + key + '/I2790/json/1/10/DESC_KOR=' + input
      console.log('검색중')
      const response = await axios.get(url);
      const temp = response.data.I2790.row
      setResult(temp)
      console.log(temp)
    } catch (error) {
      console.error(error);
    }
    console.log('검색끝')
  }

  function getNUTR(r) {
    setData([r.DESC_KOR, r.NUTR_CONT1, r.NUTR_CONT2, r.NUTR_CONT3, r.NUTR_CONT4, r.NUTR_CONT5])
  }

  const listItems = result.map(a => (
    <p className="card">
      <div onClick={() => {getNUTR(a); setClick(true); navigate('/detail')}}>{a.DESC_KOR}</div>
    </p>
  ))

  return (
    <div className="App">
      <h1>식품 영양정보 검색</h1>
      <input onChange={onChange} value={input}></input>
      <button onClick={()=>{getData(); reset(); setData([]); setClick(false); navigate('/')}}>검색</button>
      <div>{listItems}</div>
      <Routes>
        <Route path="/"></Route>
        <Route path="/detail" element={click == true ?
          <div>
            <h1>{data[0]}</h1>
            <h2>1회 섭취량당 칼로리 {data[1]}</h2>
            <div>{PieChartComponent(nutr)}</div>
          </div>
          : null}></Route>
      </Routes>
    </div>
  );
}

export default App;
