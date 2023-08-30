import { Box, Button, TextareaAutosize, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Base from '../Base/base';

function Askquestion({doubt, setDoubt}) {
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


  //Add the data

  const AddQuestion = async (event) => {
    event.preventDefault();
    try {
      const newData = {
        topic,
        questions,
      }
    const response = await fetch("https://stackoverflowcloning.onrender.com/questions",
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
      setDoubt([...doubt, data])
      
      setValues({
        ...values, 
        topic : "",
        questions :""
      })
      // history.push("/doubts");
    
      
    } catch (error) {
      console.log(error)
    }
    
    
    
       
      };

  return (
    <div>
        <Base>
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
    </Base>

    </div>
  )
}

export default Askquestion