import './App.css';
import {useState} from 'react'
import axios from 'axios';
import PieChartComponent from './piechartComponent';
import { PieChart, Pie } from 'recharts';

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

  const nutr = [
    { name: '탄수화물', value: 0 },
    { name: '단백질', value: 0 },
    { name: '지방', value: 0 },
    { name: '당류', value: 0 },
  ];

  const reset = () => {
    setInput('')
  }
  
  const onChange = (e) => {
    setInput(e.target.value)
  }

  async function getData() {
    try {
      const url = 'http://openapi.foodsafetykorea.go.kr/api/' + key + '/I2790/json/1/10/DESC_KOR=' + input
      console.log('검색중')
      const response = await axios.get(url);
      const temp = response.data.I2790.row
      setResult(temp)
    } catch (error) {
      console.error(error);
    }
    console.log('검색끝')
  }

  function getNUTR(r) {
    setData([r.DESC_KOR, r.NUTR_CONT1, r.NUTR_CONT2, r.NUTR_CONT3, r.NUTR_CONT4, r.NUTR_CONT5])
    data.slice(-4).map((a, i) => (
      i == 2 ? a *= 9 : a *= 4,
      nutr[i].value = a
    ))
    console.log(data)
    console.log(nutr)
  }

  const listItems = result.map(a => (
    <p className="card">
      <div onClick={() => {getNUTR(a); setClick(true)}}>{a.DESC_KOR}</div>
    </p>
  ))

  return (
    <div className="App">
      <h1>식품 영양정보 검색</h1>
      <input onChange={onChange} value={input}></input>
      <button onClick={()=>{getData(); reset(); setData([]); setClick(false)}}>검색</button>
      <div>{listItems}</div>
      { 
        click == true ?
        <div>
          <h1>{data[0]}</h1>
          <h2>1회 섭취량당 칼로리 {data[1]}</h2>
          <div>{PieChartComponent(nutr)}</div>
        </div>
        : null
      }
    </div>
  );
}

export default App;
