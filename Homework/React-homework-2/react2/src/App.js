import './App.css';
import {useState} from 'react'
import axios from 'axios';


function App() {
  const key = '6c23fcdfa3b1422dadcb';
  let text = ''
  let [result, setResult] = useState('')
  let [input, setInput] = useState('')

  const reset = () => {
    setInput('')
  }
  
  const onChange = (e) => {
    setInput(e.target.value)
  }

  async function getData() {
    try {
      const url = 'http://openapi.foodsafetykorea.go.kr/api/' + key + '/I2790/json/1/10/DESC_KOR=' + input
      const response = await axios.get(url);
      setResult(response.data.I2790.row)
      const mem = result.map((a, i) => {
        return [{식품명: result[i].DESC_KOR}, {제조업체: result[i].MAKER_NAME}, {식품종류: result[i].GROUP_NAME}]
      })
      console.log(result)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <h1>식품 영양정보 검색</h1>
      <input onChange={onChange} value={input}></input>
      <button onClick={()=>{getData(); reset();}}>검색</button>
    </div>
  );
}

export default App;
