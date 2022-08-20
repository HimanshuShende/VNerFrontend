import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { baseURL } from "../components/utilities/constants";
import useAxios from "../components/utilities/useAxios";

import "./Exam.css";

class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examName: "",
      examId: Number,
      attempts: Number,
      level: Number,
      type: Number,
      duration: Number,
      tag: "",
      redirect: false,
      showError: false,
      tags: []
    };
    this.API = this.props.useAxiosInstance;
  }
  levels = [
    { key: "Beginner", value: 0 },
    { key: "Intermediate", value: 1 },
    { key: "Advanced", value: 2 },
  ];
  types = [
    { key: "Quiz", value: 1 },
    { key: "Exam", value: 2 },
  ];
  status = false;
  statusMessage = "crtexm";

  componentDidMount() {
    this.API.get(`${baseURL}/v2/getExamTags/`).then((response) => {
      this.setState({ tags: response.data["tags"] });
    });
  }

  clearInputFields = () => {
    this.setState({
      examName: "",
      attempts: Number,
      level: Number,
      duration: Number,
      tag: "",
    });
  };

  change = (value, paramName) => {
    this.setState({
      [paramName]: value,
    });
  };

  redirectToQuestions = () => {
    if (this.state.redirect){
      if (this.state.type === 1){
        return <Navigate to={`/quiz/${this.state.examId}/questions`} />;
      }else if (this.state.type === 2) {
        return <Navigate to={`/exam/${this.state.examId}/questions`} />;
      }
    } 
  };

  showErrorMessage = () => {
    if (this.state.showError) {
      return (
        <div className="create_exam__error">
          <code> {this.statusMessage}</code>
        </div>
      );
    }
  };

  showOptional = () => {
    if (this.state.type === 1)
      return (
        <label className="create_exam__formLabel">Tag(Optional): </label>
      );
    else return <label className="create_exam__formLabel">Tag: </label>;
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
        duration: this.state.duration,
        exam_type: this.state.type,
      })
    );

    this.API
      .post(`${baseURL}/v2/createExam/ `, formData)
      .then((response) => {
        this.status = response.data["task_completed"];
        if (this.status) {
            this.setState({ examId: response.data["data"]["_id"] }, () =>
            this.setState({ redirect: true })
          );
        } else {
          this.setState({ showError: true });
        }
        this.statusMessage = response.data["msg"];
        console.log(response.data["data"]);
      })
      .catch((err) => {
        this.statusMessage = err;
        this.setState({ showError: true });
      });
  };

  render() {
    return (
      <div className="create_exam">
        {this.redirectToQuestions()}
        <header className="create_exam__header">
          <h1 id="create_exam__title">Create Exam/Quiz</h1>
          <div id="create_exam__error" style={{ color: "red" }}>
            {this.statusMessage}
          </div>
          <Stack className="create_exam__form" spacing={3}>
            {this.showErrorMessage()}
            <div className="create_exam__formElement">
              <label className="create_exam__formLabel">Name: </label>
              <div className="create_exam__formInput">
                <TextField
                  className="create_exam__formTextInput"
                  style={{ width: "600px" }}
                  id="outlined-textarea"
                  placeholder="Enter name..."
                  value={this.state.examName}
                  onChange={(e) => this.change(e.target.value, "examName")}
                />
              </div>
            </div>

            <div className="create_exam__formElement">
              <label className="create_exam__formLabel">
                Max attempts allowed:{" "}
              </label>
              <div className="create_exam__formInput">
                <TextField
                  className="create_exam__formTextInput"
                  style={{ width: "600px" }}
                  id="outlined-textarea"
                  placeholder="Enter max attempts..."
                  value={this.state.attempts}
                  onChange={(e) =>
                    this.change(parseInt(e.target.value), "attempts")
                  }
                />
              </div>
            </div>

            <div className="create_exam__formElement">
              <label className="create_exam__formLabel">
                Duration(minutes):{" "}
              </label>
              <div className="create_exam__formInput">
                <TextField
                  className="create_exam__formTextInput"
                  style={{ width: "600px" }}
                  id="outlined-textarea"
                  placeholder="Enter exam duration..."
                  value={this.state.duration}
                  onChange={(e) =>
                    this.change(parseInt(e.target.value), "duration")
                  }
                />
              </div>
            </div>

            <div className="create_exam__formElement">
              <label className="create_exam__formLabel">Type: </label>
              <div className="create_exam__formInput">
                <Autocomplete
                  className="create_exam__formTextInput"
                  id="tags-outlined"
                  options={this.types}
                  getOptionLabel={(option) => option.key}
                  filterSelectedOptions
                  onChange={(e, v) => {
                    this.change(v.value, "type");
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select type" />
                  )}
                />
              </div>
            </div>

            <div className="create_exam__formElement">
              {this.showOptional()}
              <div className="create_exam__formInput">
                <Autocomplete
                  className="create_exam__formTextInput"
                  id="tags-outlined"
                  options={this.state.tags}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  onChange={(e, v) => {
                    this.change(v, "tag");
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select exam tag" />
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
                  getOptionLabel={(option) => option.key}
                  filterSelectedOptions
                  onChange={(e, v) => {
                    this.change(v.value, "level");
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select level (Default Beginner)" />
                  )}
                />
              </div>
            </div>

            <Button
              id="create_exam__formButton"
              style={{ width: "100%" }}
              variant="contained"
              color="primary"
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


function wrapExamWithHooks(Component){
  return function WrappedFunction(props){
    const useAxiosHook = useAxios();
    return <Component {...props} useAxiosInstance={useAxiosHook}  />
  };
}

export default wrapExamWithHooks(Exam);
