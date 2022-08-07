import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./Exam.css";
import axios from "axios";

const baseURL = "https://vnerapi.azurewebsites.net/api";

class Exam extends Component {
  constructor() {
    super();
    this.state = {
      examName: "",
      attempts: Number,
      level: Number,
      tag: ""
    };
  }

  levels = [0, 1, 2];
  tags = [
     "JEE",
     "NEET",
  ];
  status = false;
  statusMessage = "crtexm";

  componentDidMount() {
    axios.get(`${baseURL}/getExamTags`).then((response) => {
      this.tags = response.data["tags"];
    });
  }

  clearInputFields = () => {
    this.setState({
      examName: "",
      attempts: Number,
      level: Number,
      tag: ""
    });
  };

  change = (value, paramName) => {
    this.setState({
      [paramName]: value,
    });
  };

  createExam = () => {
    axios
      .post(`${baseURL}/createExam/ `, {
        "name": this.state.examName,
        "tag": this.state.tag,
        "exam_level": this.state.level,
        "allowed_attempts": this.state.attempts,
      })
      .then((response) => {
        this.status = response.data["task_completed"];
        this.statusMessage = response.data["msg"];
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Create Exam</h1>
          <div style={{ color: "red" }}>{this.statusMessage}</div>
          <Stack
            spacing={3}
            sx={{
              width: 900,
              backgroundColor: "rgb(137, 199, 205)",
              padding: 5,
            }}
          >
            <div className="parent">
              <label className="child1">Exam name: </label>
              <div className="child2">
                <TextField
                  className="tb"
                  style={{ width: "600px" }}
                  id="outlined-textarea"
                  placeholder="Enter exam name..."
                  value={this.state.examName}
                  onChange={(e) => this.change(e.target.value, "examName")}
                />
              </div>
            </div>

            <div className="parent">
              <label className="child1">Max attempts allowed: </label>
              <div className="child2">
                <TextField
                  className="tb"
                  style={{ width: "600px" }}
                  id="outlined-textarea"
                  placeholder="Enter exam name..."
                  value={this.state.attempts}
                  onChange={(e) => this.change(e.target.value, "attempts")}
                />
              </div>
            </div>

            <div className="parent">
              <label className="child1">Exam tag: </label>
              <div className="child2">
                <Autocomplete
                  className="tb"
                  id="tags-outlined"
                  options={this.tags}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  onChange={(e, v) => {
                    this.change(v, "tag");
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Subject" />
                  )}
                />
              </div>
            </div>

            <div className="parent">
              <label className="child1">Level: </label>
              <div className="child2">
                <Autocomplete
                  className="tb"
                  id="tags-outlined"
                  options={this.levels}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  onChange={(e, v) => {
                    this.change(v, "level")
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Subject" />
                  )}
                />
              </div>
            </div>

            <Button
              style={{ width: "200px" }}
              variant="contained"
              color="success"
              onClick={this.createExam}
            >
              Create
            </Button>
          </Stack>
        </header>
      </div>
    );
  }
}

export default Exam;
