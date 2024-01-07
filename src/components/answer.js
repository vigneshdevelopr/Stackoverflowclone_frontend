import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Base from "../Base/base";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Answers({ doubt, setDoubt }) {
  const token = localStorage.getItem("react_token");
  const { id } = useParams(); // Get the question ID from the route parameter
  console.log("Current ID:", id);
  const [answers, setAnswers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getAnswersForQuestion = async () => {
      try {
        console.log("Fetching answers for ID:", id); // Debug: Check if ID is used in fetch

        // Find the specific question using the _id from the URL parameter
        const question = doubt.find((q) => q._id === id);

        if (question) {
          const response = await fetch(
            `https://stackoverflow-clone-backend-pi.vercel.app/answers/${id}`,
            {
              method: "GET",
              headers: {
                "content-type": "application/json",
                "x-auth-token": token,
              },
            }
          );
          const data = await response.json();
          setAnswers(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getAnswersForQuestion();
  }, [id, doubt, token]); // Fetch answers whenever the question ID, doubts, or token change

  const [values, setValues] = useState({
    content: "",
  });

  const { content } = values;

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleAnswer = async (event) => {
    try {
      const newData = {
        content,
      };

      const response = await fetch(
        `https://stackoverflow-clone-backend-pi.vercel.app/answers/${id}`,
        {
          method: "POST",
          body: JSON.stringify(newData),
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("react_token"),
          },
        }
      );

      const data = await response.json();
      setDoubt((prevDoubt) => [...prevDoubt, data]);
      alert("your answer is added, go to doubt page");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Base>
      <div style={{ border: "1px solid red" }}>
        {answers.map((all) => (
          <Card sx={{ minWidth: 275 }} key={all._id}>
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

      <div id="answer-sec">
        <TextareaAutosize
          placeholder="Write Your Answer Here !"
          id="answer-box"
          name="content"
          value={content}
          onChange={handleChange("content")}
        />
        <Button onClick={handleAnswer} variant="contained" id="addanswerbtn">
          Add Your Answer
        </Button>
      </div>
    </Base>
  );
}

export default Answers;
