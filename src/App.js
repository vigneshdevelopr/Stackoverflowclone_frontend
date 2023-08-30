import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ResponsiveAppBar from './Base/nav';
import Answers from './components/answer';
import Askquestion from './components/askquestion';
import DoubtPage from './components/DoubtPage';
import SignInSide from './components/login';
import SignUp from './components/register';


function App() {

const[doubt, setDoubt]= useState([])
const[answer, setAnswer]= useState([])
const token = localStorage.getItem('react_token')
useEffect(()=>{
const getDoubts = async()=>{
  try {
    const response = await fetch('https://stackoverflowcloning.onrender.com/questions',{
      method:"GET",
      headers:{
        "content-type":"application/json",
        "x-auth-token": token
      }
    })
    const data = await response.json()
setDoubt(data);
console.log(data);
  } catch (error) {
    console.log(error)
  }
}
getDoubts();
},[])

//====================Get Answer==============================================================
// useEffect(()=>{
//   const getAnswer = async()=>{
//     try {
//       const response = await fetch(`https://stackoverflowcloning.onrender.com/answers/${questionId}`,{
//         method:'GET',
//         headers:{
//           "content-type": "application/json",
//           "x-auth-token": token
//         }
//       })
//       const data = await response.json()
//       setAnswer(data);
//       console.log(data);
//     } catch (error) {
//      console.log(error.message); 
//     }
//   }
//   getAnswer();
// },[])


  //==================================================================================


  return (
   <div>
<Switch>
  <Route exact path="/">
    <SignInSide />
  </Route>
  <Route path="/signup">
    <SignUp />
  </Route>
  <Route path="/doubts">
    <DoubtPage
    doubt={doubt} 
    setDoubt={setDoubt}
    
    />
  </Route>
  <Route path="/addquestion">
    <Askquestion
    doubt={doubt} 
    setDoubt={setDoubt}
    
    />
  </Route>
  <Route path="/answers/:id">
    <Answers
    
    doubt={doubt} 
    setDoubt={setDoubt}    />
  </Route>
</Switch>
   </div>
  );
}

export default App;
