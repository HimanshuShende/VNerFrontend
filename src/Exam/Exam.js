import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./Exam.css";
import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const baseURL = "https://vnerapi.azurewebsites.net/api";

class Exam extends Component {
  constructor() {
    super();
    this.state = {
      examName: "",
      attempts: Number,
      level: Number,
      tag: "",
    };
  }

  levels = [0, 1, 2];
  tags = ["JEE", "NEET"];
  status = false;
  statusMessage = "crtexm";

  componentDidMount() {
    axios.get(`${baseURL}/getExamTags/`).then((response) => {
      this.tags = response.data["tags"];
    });
  }

  clearInputFields = () => {
    this.setState({
      examName: "",
      attempts: Number,
      level: Number,
      tag: "",
    });
  };

  change = (value, paramName) => {
    this.setState({
      [paramName]: value,
    });
  };

  createExam = () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        name: this.state.examName,
        tag: this.state.tag,
        exam_level: this.state.level,
        allowed_attempts: this.state.attempts,
      })
    );

    axios
      .post(`${baseURL}/createExam/ `, formData)
      .then((response) => {
        this.status = response.data["task_completed"];
        this.statusMessage = response.data["msg"];
        console.log(response.data["data"]);
      })
      .catch((err) => (this.statusMessage = err));
  };

  render() {
    return (
      <div className="create_exam">
        <header className="create_exam__header">
          <h1 id="create_exam__title">Create Exam</h1>
          <div id="create_exam__error" style={{ color: "red" }}>{this.statusMessage}</div>
          <Stack
            className="create_exam__form"
            spacing={3}
          >
            <div className="create_exam__formElement">
              <label className="create_exam__formLabel">Exam name: </label>
              <div className="create_exam__formInput">
                <TextField
                  className="create_exam__formTextInput"
                  style={{ width: "600px" }}
                  id="outlined-textarea"
                  placeholder="Enter exam name..."
                  value={this.state.examName}
                  onChange={(e) => this.change(e.target.value, "examName")}
                />
              </div>
            </div>

            <div className="create_exam__formElement">
              <label className="create_exam__formLabel">Max attempts allowed: </label>
              <div className="create_exam__formInput">
                <TextField
                  className="create_exam__formTextInput"
                  style={{ width: "600px" }}
                  id="outlined-textarea"
                  placeholder="Enter exam name..."
                  value={this.state.attempts}
                  onChange={(e) => this.change(e.target.value, "attempts")}
                />
              </div>
            </div>

            <div className="create_exam__formElement">
              <label className="create_exam__formLabel">Exam tag: </label>
              <div className="create_exam__formInput">
                <Autocomplete
                  className="create_exam__formTextInput"
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

            <div className="create_exam__formElement">
              <label className="create_exam__formLabel">Level: </label>
              <div className="create_exam__formInput">
                <Autocomplete
                  className="create_exam__formTextInput"
                  id="tags-outlined"
                  options={this.levels}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  onChange={(e, v) => {
                    this.change(v, "level");
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Subject" />
                  )}
                />
              </div>
            </div>

            <Button
              id="create_exam__formButton"
              style={{ width: "100%" }}
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
