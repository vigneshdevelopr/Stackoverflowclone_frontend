import { Button, Container, TextareaAutosize, TextField } from '@mui/material'
import React from 'react'
import Base from '../Base/base';

function Answers({doubt, setDoubt}) {
  const style = {
    backgroundColor: "#252525",
    minHeight: "100vh",
    

  };
  return (
    <Base>
    <div style={style}>
      <Container>
        <div id='answer-sec'>
        <TextareaAutosize placeholder='Write Your Answer Here !' id='answer-box' />
        <Button variant='contained' id='addanswerbtn'>
          Add Your Answer
        </Button>
        </div>
</Container>
    </div>
    </Base>
  )
}

export default Answers