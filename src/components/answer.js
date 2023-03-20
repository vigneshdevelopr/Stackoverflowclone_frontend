import {
  Button,
  Card,
  CardContent,
  Container,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Base from "../Base/base";

function Answers({ doubt }) {
  console.log(doubt);
  const style = {
    backgroundColor: "#252525",
    minHeight: "100vh",
  };

  const { id } = useParams();
  console.log(id);
  const doubtans = id;
  const finalans = doubt[doubtans];
  console.log(finalans);
  const result = finalans.answers;
  console.log(result);

  return (
    <Base>
      <div>
        {result.map((all, id) => (
          <Card  sx={{ minWidth: 275 }} key={all._id}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Answers: {all.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ================================================================ */}
      <div id="answer-sec">
        <TextareaAutosize
          placeholder="Write Your Answer Here !"
          id="answer-box"
        />
        <Button variant="contained" id="addanswerbtn">
          Add Your Answer
        </Button>
      </div>
    </Base>
  );
}

export default Answers;
