import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react'
import { useHistory } from 'react-router-dom';
import Base from '../Base/base'

function DoubtPage({doubt, setDoubt}) {
const history = useHistory();
    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );

  return (
    <div>
        <Base>
        <Button
        variant='contained'
        color='success'
        sx={{ mt: 3, mb: 2 }}

        onClick={()=>history.push('/addquestion')}
        >
Ask Question
        </Button>

{doubt?.map((data, id)=>(
 <Card sx={{ minWidth: 275 }}     key={data._id}
 >
 <CardContent>
   <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
Topic: {data.topic}
   </Typography>
   <Typography variant="h5" component="div">
    {data.questions}
   </Typography>
   <Typography sx={{ mb: 1.5 }} color="text.secondary">
     Question by: {data.user.name}<br/>
created on: {data.date}
   </Typography>
   
 </CardContent>
 <CardActions>
   <Button variant='contained' size="small">View Answer</Button>
 </CardActions>
</Card>
))}


       
        
        </Base>
    </div>
  )
}

export default DoubtPage