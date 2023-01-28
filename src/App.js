import {useState, useEffect} from 'react'
import { FaArrowsAltV } from 'react-icons/fa';

function App() {
  const [data, setData] = useState([]);
  const [searchApiData, setSearchApiData] = useState([])
  const [filterVal, setFilterVal] =("")
  const [order, setorder] = useState("ASC")
  

  useEffect(()=>{
    const fetchData = () => {fetch("https://restcountries.com/v2/all?fields=name,region,area")
    .then(response => response.json())
    .then(json => {
      setData(json)
      setSearchApiData(json)
    })

  }
  fetchData()
  },[])

const handleFilter=(e)=>{
  if(e.target.value == ''){
    setData(searchApiData)
  } else {
      const filterResults = searchApiData.filter(item=> item.name.toLowerCase().includes(e.target.value.toLowerCase()))
      setData(filterResults)
  }
  setFilterVal(e.target.value)
}

const sorting = (col)=>{
  if (order ==="ASC"){
    const sorted = [...data].sort((a,b)=>
    a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1)
    setData(sorted)
    setorder("DSC")
  }
  if (order ==="DSC"){
    const sorted = [...data].sort((a,b)=>
    a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1)
    setData(sorted)
    setorder("ASC")
}}

const smallerLt =(event)=>{
  if (event.target.checked) {
    const results = data.filter(item=> item.area <65300)
    setData(results)
  } 
  else  {
    setData(data);
  
}}

const onlyOcean =(event)=>{
  if (event.target.checked) {
    const results = data.filter(item=> item.region == "Oceania")
    setData(results)
  } else {
    setData(data);
  } }



  return (
      <div className="container">
      <h1  style={{textAlign: "center"}}>Countries Tracker</h1>


      <input type="search" placeholder="Search..."  className="form-control" value={filterVal} onInput={(e)=>handleFilter(e)}/>
    

     

      <input type="checkbox" id="smallLt" name="smallLt" value="smallLt" class="form-check-input" onClick={smallerLt} ></input>
      <label for="smallLT">Smaller than Lithuania</label>
      <br></br>
      <input type="checkbox" id="“Oceaniat" name="Oceania" value="“Oceania" class="form-check-input" onClick={onlyOcean} ></input>
      <label for="“Oceania">Only Oceania</label>

      <table className='table table-bordered'>
      <thead className='thead-dark'>
      <tr>
        <th onClick={()=>sorting("name")}> Country<FaArrowsAltV/></th>
        <th>Region</th>
        <th>Area</th>
      </tr>
      </thead>
      { data.map(item => { 
      return (
              <tbody>
              <td>{item.name}</td>
              <td>{item.region}</td>
              <td>{item.area}</td>
              </tbody>
              )
       })
      }
        </table>

    </div>
  );
}

export default App;
