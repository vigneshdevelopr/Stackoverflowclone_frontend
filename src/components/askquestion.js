import { Box, Button, TextareaAutosize, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Base from '../Base/base';
import Loading from './Spinner';

function Askquestion({doubt, setDoubt}) {
  const[loading,setLoading]=useState(false)
    const [values, setValues] = useState({
        topic : "",
        questions :""
        
      }); 

      const {
         topic,
         questions
        } = values; 
         const history = useHistory();


 //Single handle change event
 const handleChange  = (name) => (event) =>{
    const value = event.target.value; 
    setValues({...values, [name]:value})
 }

 const Reloading =async() =>{
window.location.reload();
history.push('/doubts')
 }


  //Add the data

  const AddQuestion = async (event) => {
    event.preventDefault();
    try {
      setLoading(true)
      const newData = {
        topic,
        questions,
      }
    const response = await fetch("https://stackoverflowserver.up.railway.app/questions",
      {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("react_token")
          
        },
      })
    
    const data = await response.json();
      
      console.log(data);
      await setDoubt([...doubt, data])
      
      setValues({
        ...values, 
        topic : "",
        questions :""
      })
      await Reloading()
      await history.push('/doubts')

    
      
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
};

  return (
    <div>
        <Base>
        <div>
          {loading?(<Loading />):(
            <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
 <TextField
          required
          id="outlined-required"
          label="Topic"
          name='topic'
          value={topic}
          onChange={handleChange("topic")}
        /><br/>
       
       <div id="answer-sec">
        <TextareaAutosize
        name='questions'
        value={questions}
        onChange={handleChange("questions")}
          placeholder="Write Your Question Here !"
          id="answer-box"
        />
        <Button type="submit"
        onClick={AddQuestion} variant="contained" id="addanswerbtn">
          Add Your Question Here
        </Button>
      </div>
       
       
      




    </Box>
          )}
        </div>
 
    </Base>

    </div>
  )
}

export default Askquestion