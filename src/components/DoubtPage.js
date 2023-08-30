import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import Base from "../Base/base";

function DoubtPage({ doubt, setDoubt }) {

  console.log(doubt);

  const history = useHistory();
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );
  const style = {
    backgroundColor: "#252525",
  };

  return (
    <div>
      <Base>
        <div style={style}>
          <Container>
            <div id="doubtpage">
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => history.push("/addquestion")}
              >
                Ask Question
              </Button>
              <Grid id="card-sec">
                {doubt?.map((data, id) => (
                  <Card
                    id="doubtpagecard"
                    sx={{ minWidth: 275 }}
                    key={id}
                  >
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Topic: {data.topic}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {data.questions}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Question by: {data.user.name}
                        <br />
                        created on: {data.date}
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <Button
                        onClick={() => history.push(`/answers/${data._id}`)}
                        variant="contained"
                        size="small"
                      >
                        View Answer
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Grid>
            </div>
          </Container>
        </div>
      </Base>
    </div>
  );
}

export default DoubtPage;
