import React, { Component } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useParams } from 'react-router-dom'

import "./Questions.css";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Chip from "@mui/material/Chip";
import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const baseURL = "https://vnerapi.azurewebsites.net/api";

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      question: "",
      sNo: 0,
      opt: "",
      options: [],
      subject: "",
      examName: "",
      examNameNew: "",
      examId: 0,
      duration: 0,
      durationNew: 0,
      nQs: 0,
      editName: false,
      editDuration: false,
      showError: false,
      showDialogError: false,
    };
  }

  answerOptions = [];
  subjects = ["a", "b"];

  componentDidMount() {

    const { id } = this.props.params;

    console.log(id);

    axios.get(`${baseURL}/getSubjectTags/`).then((response) => {
      this.subjects = response.data["tags"];
    });

    const formData = new FormData();
    formData.append("data", JSON.stringify({ exam_id: id }));
    axios
      .post(`${baseURL}/getExamDetails/`, formData)
      .then((response) => {
        console.log(response);
        if (!response.data["task_completed"])
          {
            console.log(response.data["msg"]);
            alert("Exam not found");
          }
        else {
          this.setState(
            {
              examName: response.data["data"]["name"],
              examId: response.data["data"]["_id"],
              duration: response.data["data"]["duration"],
              nQs: response.data["data"]["questions"],
            },
            () => console.log(this.state)
          );
        }
      })
      .catch((err) => console.log(err));
  }

  clearInputFields = () => {
    this.setState({
      question: "",
      opt: "",
      options: [],
      subject: "",
    });
    this.answerOptions = [];
    
  };

  change = (value, paramName) => {
    console.log(typeof value);
    this.setState({
      [paramName]: value,
    });
  };

  addOption = () => {
    if (!this.state.options.includes(this.state.opt))
      this.setState(
        {
          options: [...this.state.options, this.state.opt],
        },
        this.updateAddItems
      );
  };

  updateAddItems = () => {
    this.answerOptions.push({ statement: this.state.opt, isAnswer: false });
    this.setState({
      opt: "",
    });
  };

  handleDelete = (value) => {
    this.setState({
      options: [...this.state.options.filter((option) => option !== value)],
    });
    this.answerOptions = this.answerOptions.filter(
      (option) => option["statement"] !== value
    );
    console.log(this.answerOptions);
  };

  updateAnswers = (e) => {
    this.answerOptions.forEach((option) => {
      if (option["statement"] === e.target.name)
        option["isAnswer"] = e.target.checked;
    });
    console.log(this.answerOptions);
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

  showDialogErrorMessage = () => {
    if (this.state.showDialogError) {
      return (
        <div className="create_exam__error">
          <code> {this.statusMessage}</code>
        </div>
      );
    }
  };

  addQuestion = () => {
    if (!this.state.question || this.state.question.length === 0) {
      this.setState({ showError: true });
      this.statusMessage = "Question statement cannot be empty";
    } else if (!this.state.subject || this.state.subject.length === 0) {
      this.setState({ showError: true });
      this.statusMessage = "Subject tag cannot be empty";
    } else if(this.answerOptions.length < 2){
      this.setState({ showError: true });
      this.statusMessage = "Enter atleast two optons";
    }
     else if(this.answerOptions.filter(
      (option) => option["isAnswer"] === true
    ).length === 0){
      this.setState({ showError: true });
      this.statusMessage = "Select atleast one option as an answer";
    }
     else {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          exam_id: this.state.examId,
          question: this.state.question,
          option_type: 1,
          options: this.answerOptions,
          sub_tags: [this.state.subject],
          marks: {
            positive: 2,
            negative: -1,
          },
        })
      );
      axios
        .post(`${baseURL}/addQuestion/`, formData)
        .then((response) => {
          this.status = response.data["task_completed"];
          if (!this.status) {
            this.setState({ showError: true });
          }
          this.statusMessage = response.data["msg"];
          console.log(response.data["data"]);
          this.clearInputFields();
        })
        .catch((err) => {
          this.setState({ showError: true });
          this.statusMessage = err;
        });
    }
  };

  completeExam = () => {
    //close create exam page
  };

  updateExamName = () => {
    this.setState({ editName: false });
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        exam_id: this.state.examId,
        exam_name: this.state.examNameNew,
      })
    );
    axios
      .post(`${baseURL}/change_examName/`, formData)
      .then((response) => {
        console.log(response);
        this.status = response.data["task_completed"];
        if (!this.status) {
          this.setState({ showDialogError: true });
        } else {
          this.setState({ examName: response.data["data"]["name"] });
        }
        this.statusMessage = response.data["msg"];
        console.log(response.data["data"]);
      })
      .catch((err) => {
        this.setState({ showDialogError: true });
        this.statusMessage = err;
        console.log(err);
      });
  };

  updateExamDuration = () => {
    this.setState({ editDuration: false });
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        exam_id: this.state.examId,
        exam_duration: this.state.durationNew,
      })
    );
    axios
      .post(`${baseURL}/change_examDuration/`, formData)
      .then((response) => {
        console.log(response);
        this.status = response.data["task_completed"];
        if (!this.status) {
          this.setState({ showDialogError: true });
        } else {
          this.setState({ duration: response.data["data"]["duration"] });
        }
        this.statusMessage = response.data["msg"];
        console.log(response.data["data"]);
      })
      .catch((err) => {
        this.setState({ showDialogError: true });
        this.statusMessage = err;
        console.log(err);
      });
  };

  render() {
    return (
      <div className="add_ques">
        <header className="add_ques__header">
          <h1 id="add_ques__title">Exam Details</h1>
          <Stack className="add_ques__examDetails" spacing={1}>
            <div className="add_ques__examDetails__examName">
              <label className="add_ques__examDetails__examName_label">
                Exam Name:{" "}
              </label>
              <label className="add_ques__examDetails__examName_value">
                {this.state.examName}
              </label>
              <Button
                className="add_ques__examDetails__examName_btn"
                size="small"
                variant="contained"
                color="primary"
                onClick={() => this.change(true, "editName")}
              >
                Edit
              </Button>

              <Dialog open={this.state.editName}>
                <DialogTitle>Edit exam name</DialogTitle>
                <DialogContent>
                  {this.showDialogErrorMessage()}
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    fullWidth
                    variant="standard"
                    value={this.state.examNameNew}
                    onChange={(e) => this.change(e.target.value, "examNameNew")}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => this.setState({ editName: false })}>
                    Cancel
                  </Button>
                  <Button
                    disabled={
                      this.state.examNameNew
                        ? !this.state.examNameNew.length > 0
                        : true
                    }
                    onClick={this.updateExamName}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <div className="add_ques__examDetails__examName">
              <label className="add_ques__examDetails__examName_label">
                No of Questions:{" "}
              </label>
              <label className="add_ques__examDetails__examName_value">
                {this.state.nQs}
              </label>
            </div>
            <div className="add_ques__examDetails__examName">
              <label className="add_ques__examDetails__examName_label">
                Duration:{" "}
              </label>
              <label className="add_ques__examDetails__examName_value">
                {this.state.duration}
              </label>
              <Button
                className="add_ques__examDetails__examName_btn"
                variant="contained"
                color="primary"
                size="small"
                onClick={() => this.change(true, "editDuration")}
              >
                Edit
              </Button>

              <Dialog open={this.state.editDuration}>
                <DialogTitle>Edit exam duration</DialogTitle>
                <DialogContent>
                  {this.showDialogErrorMessage()}
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Duration"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={this.state.durationNew}
                    onChange={(e) =>
                      this.change(parseInt(e.target.value), "durationNew")
                    }
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => this.setState({ editDuration: false })}
                  >
                    Cancel
                  </Button>
                  <Button onClick={this.updateExamDuration}>Submit</Button>
                </DialogActions>
              </Dialog>
            </div>
          </Stack>

          <Stack className="add_ques__form" spacing={1} sx={{}}>
            <h3>Add Question</h3>
            {this.showErrorMessage()}
            <div className="add_ques__q">
              <label className="add_ques__q_label">Question: </label>
              <div className="add_ques__q_value">
                <TextField
                  className="add_ques__q_textInput"
                  style={{ width: "100%" }}
                  id="outlined-textarea"
                  placeholder="Enter your question..."
                  value={this.state.question}
                  onChange={(e) => this.change(e.target.value, "question")}
                  multiline
                />
              </div>
            </div>

            <div className="add_ques__q">
              <label className="add_ques__q_label">Options: </label>
              <div className="add_ques__q_value">
                <TextField
                  className="add_ques__q_textInput"
                  id="outlined-textarea"
                  style={{ width: "100%" }}
                  placeholder="Enter your option..."
                  value={this.state.opt}
                  onChange={(e) => this.change(e.target.value, "opt")}
                />
                <br></br>
                <Stack direction="row" spacing={2}>
                  <Button
                    style={{ marginTop: "10px" }}
                    variant="contained"
                    color="secondary"
                    onClick={this.addOption}
                    disabled={!this.state.opt.length}
                  >
                    Add
                  </Button>
                </Stack>
              </div>
            </div>

            <div className="add_ques__q">
              <label className="add_ques__q_label">Answer(s): </label>
              <div className="add_ques__q_value">
                {this.answerOptions.map((option) => {
                  return (
                    <div className="add_ques__q_textInput answer">
                      <FormControlLabel
                        control={<Checkbox />}
                        label={option["statement"]}
                        name={option["statement"]}
                        // checked={option["isAnswer"]}
                        onChange={this.updateAnswers}
                      />
                      <HighlightOffIcon
                        sx={{ cursor: "pointer" }}
                        color="warning"
                        onClick={() => this.handleDelete(option["statement"])}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="add_ques__q">
              <label className="add_ques__q_label">Subject: </label>
              <div className="add_ques__q_value">
                <Autocomplete
                  className="add_ques__q_textInput"
                  id="tags-outlined"
                  options={this.subjects}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  value={this.state.subject}
                  onChange={(e, v) => {
                    if (v) this.change(v, "subject");
                  }}
                  renderInput={(params) => (
                    <TextField {...params}  placeholder="Subject" />
                  )}
                />
              </div>
            </div>

            {/* <div className="parent">
            <div className="add_ques__examDetails__examName_label"> */}
            <Stack className="add_ques__form__btnGrp">
              <Button
                className="add_ques__form__btn"
                variant="contained"
                color="primary"
                onClick={this.addQuestion}
              >
                Add Question
              </Button>
              {/* </div>
            <div className="add_ques__examDetails__examName_value"> */}
              <Button
                className="add_ques__form__btn"
                variant="contained"
                color="success"
                onClick={this.completeExam}
              >
                Finish exam
              </Button>
            </Stack>
            {/* </div>
            </div> */}
          </Stack>
        </header>
      </div>
    );
  }
}

export default (props) => (
  <Questions
      {...props}
      params={useParams()}
  />
);
