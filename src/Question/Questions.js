/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Navigate, useParams } from "react-router-dom";

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
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
// import { Link } from "react-router-dom";
// import DialogContentText from "@mui/material/DialogContentText";
// import Chip from "@mui/material/Chip";
import { baseURL, ExamTypeDetail } from "../components/utilities/constants";
import useAxios from "../components/utilities/useAxios";
import Add from "@mui/icons-material/Add";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      questionId: Number,
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
      editQuestion: false,
      showError: false,
      showSuccess: false,
      showSuccessMsg: "",
      showDialogError: false,
      showLoading: true,
      addingQuestion: false,
      changingMetadata: false,
      finishExam: false,
      questions: [],
      editingQuestion : false,
      deletingQuestion : false,
      pageTitle: ExamTypeDetail[this.props.exam_type].pageTitle,
    };
    this.API = this.props.useAxiosHook;
  }

  questions = [];

  answerOptions = [];
  subjects = ["a", "b"];

  getQuestList(exam_id) {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ exam_id: parseInt(exam_id) }));

    this.API.post(`${baseURL}/v2/getQuestionList/`, formData).then((response) => {
      // console.log(response);
      if (!response.data["task_completed"]) {
        console.log(response.data["msg"]);
        alert(response.data["msg"]);
      } else {
        let questionList = response.data["data"]["questions"];
        let sNo = 1;
        questionList.forEach((question) => {
          question["SerialNo"] = sNo;
          sNo++;
        });
        this.setState({ questions: questionList });
        // console.log(questionList);
      }
    });
  }

  componentDidMount() {
    const { id } = this.props.params;

    this.API.get(`${baseURL}/v2/getSubjectTags/`).then((response) => {
      this.subjects = response.data["tags"];
    });

    this.getQuestList(id);

    const formData1 = new FormData();
    formData1.append("data", JSON.stringify({ exam_id: id }));

    this.API.post(`${baseURL}/v2/getExamDetails/`, formData1)
      .then((response) => {
        // console.log(response);
        if (!response.data["task_completed"]) {
          console.log(response.data["msg"]);
          alert("Exam not found");
        } else {
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

    setTimeout(() => {
      this.setState({ showLoading: false });
    }, 200);
  }

  clearInputFields = () => {
    this.setState({
      questionId: Number,
      question: "",
      opt: "",
      options: [],
      subject: "",
    });
    this.answerOptions = [];
  };

  change = (value, paramName) => {
    // console.log(typeof value);
    this.setState({
      [paramName]: value
    });
    if (paramName === "editName" || paramName === "editDuration"){
      this.setState({ changingMetadata: true })
    }
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
      if (option["statement"] === e.target.name){
        option["isAnswer"] = e.target.checked;
      }
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

  showSuccessMessage = () => {
    if (this.state.showSuccess) {
      return (
        <div className="create_exam__success">
          <code> {this.showSuccessMsg}</code>
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

  validateQuestionData = () => {
    let validationErrTimeout;
    let valid = true;
    if (!this.state.question || this.state.question.length === 0) {
      this.setState({ showError: true });
      this.statusMessage = "Question statement cannot be empty";
      validationErrTimeout = setTimeout(() => {
        this.setState({ showError: false });
      }, 2000);
      valid = false;
    } else if ((!this.state.subject || this.state.subject.length === 0) && (this.props.exam_type === "exam")) {
      this.setState({ showError: true });
      this.statusMessage = "Subject tag cannot be empty";
      validationErrTimeout = setTimeout(() => {
        this.setState({ showError: false });
      }, 2000);
      valid = false;
    } else if (this.answerOptions.length < 2) {
      this.setState({ showError: true });
      this.statusMessage = "Enter atleast two optons";
      validationErrTimeout = setTimeout(() => {
        this.setState({ showError: false });
      }, 2000);
      valid = false;
    } else if (
      this.answerOptions.filter((option) => option["isAnswer"] === true)
        .length === 0
    ) {
      this.setState({ showError: true });
      this.statusMessage = "Select atleast one option as an answer";
      validationErrTimeout = setTimeout(() => {
        this.setState({ showError: false });
      }, 2000);
      valid = false;
    }
    return [valid, validationErrTimeout];
  }

  addQuestion = () => {
    this.showSuccessMsg = "";
    let [valid, validationErrTimeout] = this.validateQuestionData();
    if (valid) {
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
      this.setState({ addingQuestion: true });
      this.API.post(`${baseURL}/v2/addQuestion/`, formData)
        .then((response) => {
          this.status = response.data["task_completed"];
          if (!this.status) {
            clearTimeout(validationErrTimeout);
            this.setState({ showError: true });
            this.statusMessage = response.data["msg"];
            setTimeout(() => {
              this.setState({ showError: false });
            }, 2000);
          } else {
            this.setState({ showSuccess: true });
            this.showSuccessMsg = response.data["msg"];

            setTimeout(() => {
              this.setState({ showSuccess: false });
            }, 2000);
          }
          console.log(response.data["data"]);
          this.getQuestList(response.data["data"]["exam_id"]);
          if (this.status) {
            this.setState({ nQs: response.data["data"]["question_count"] });
            this.clearInputFields();
          }
          
          this.setState({ addingQuestion: false });
        })
        .catch((err) => {
          this.setState({ showError: true });
          this.statusMessage = err;
        });
    }
  };

  saveQuestionChanges = () => {
    this.showSuccessMsg = "";
    let [valid, validationErrTimeout] = this.validateQuestionData();
    if (valid) {
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
      this.setState({ editingQuestion: true });
      this.API.post(`${baseURL}/v2/question/${this.state.questionId}/edit/`, formData)
        .then((response) => {
          this.status = response.data["task_completed"];
          if (!this.status) {
            clearTimeout(validationErrTimeout);
            this.setState({ showError: true });
            this.statusMessage = response.data["msg"];
            setTimeout(() => {
              this.setState({ showError: false });
            }, 2000);
          } else {
            this.setState({ showSuccess: true });
            this.showSuccessMsg = response.data["msg"];

            setTimeout(() => {
              this.setState({ showSuccess: false });
            }, 2000);
          }
          // console.log(response.data);
          this.getQuestList(response.data["exam_id"]);
          if (this.status) {
            this.clearInputFields();
          }
          
          this.setState({ editingQuestion: false, editQuestion: false });
        })
        .catch((err) => {
          this.setState({ showError: true });
          this.statusMessage = err;
        });
    }
  };

  deleteQuestion = () => {
    this.setState({ deletingQuestion: true })
    this.API.delete(`${baseURL}/v2/question/${this.state.questionId}/delete/`)
    .then((response) => {
      if (response.data["task_completed"]) {
        this.statusMessage = response.data["msg"];
        this.setState({
          nQs: this.state.nQs - 1,
        });
        this.clearInputFields();
        this.getQuestList(this.state.examId);
      } else {
        alert(response.data["msg"]);
      }
      this.setState({ deletingQuestion: false, editQuestion: false });
    });
    
  };

  completeExam = () => {
    //close create exam page
    if (this.state.finishExam) {
      return <Navigate to={`/${this.state.pageTitle.plural.toLowerCase()}`} />;
    }
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
    this.API.post(`${baseURL}/v2/change_examName/`, formData)
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
    this.setState({ changingMetadata: false });
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
    this.API.post(`${baseURL}/v2/change_examDuration/`, formData)
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
    this.setState({ changingMetadata: false });
  };

  renderQuestionList() {
    return (
      <Stack style={{ marginTop: "20px" }}>
        {this.state.questions.map((question) => {
          return (
            <div key={`question_${question["_id"]}`} >
              <label>
                {" "}
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    this.getQuestionDetails(
                      question["_id"],
                      question["SerialNo"]
                    )
                  }
                >
                  {question["SerialNo"]}. {question["statement"]}{" "}
                </a>
              </label>
            </div>
          );
        })}
      </Stack>
    );
  }

  getQuestionDetails = (id, sno) => {
    this.API.post(`${baseURL}/v2/question/${id}/detail/`).then((response) => {
      if (response.data["task_completed"]) {
        this.setState({
          questionId: response.data["data"]["_id"],
          question: response.data["data"]["statement"],
          sNo: sno,
          options: response.data["data"]["options"],
          subject: response.data["data"]["tags"][0],
          editQuestion: true,
        });
        this.answerOptions = response.data["data"]["options"];
        this.answerOptions.forEach((option) => {
            option["isAnswer"] = false;
        });
        document.getElementById("addQuestionForm").scrollIntoView();
      }
    });
  };

  showButtons = () => {
    if (this.state.editQuestion)
      return (
        <>
          <LoadingButton
            className="add_ques__form__btn"
            onClick={this.saveQuestionChanges}
            loading={this.state.editingQuestion}
            startIcon={<SaveIcon style={{ display: "block" }} />}
            variant="contained"
            loadingPosition="start"
            color="primary"
          >
            Save
          </LoadingButton>
          <LoadingButton
            className="add_ques__form__btn"
            onClick={() => {
              this.clearInputFields();
              this.setState({ editQuestion: false });
              this.setState({ editingQuestion: false });
            }}
            startIcon={<CancelIcon style={{ display: "block" }} />}
            variant="contained"
            loadingPosition="start"
            color="primary"
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            className="add_ques__form__btn"
            onClick={this.deleteQuestion}
            loading={this.state.deletingQuestion}
            startIcon={<DeleteIcon style={{ display: "block" }} />}
            variant="contained"
            loadingPosition="start"
            color="error"
          >
            Delete
          </LoadingButton>
        </>
      );
  };

  showLoadingCircle() {
    return true;
  }

  render() {
    return (
      <>
        {this.state.showLoading && (
          <div className="popup_container">
            <div className="popup">
              {this.showLoadingCircle() && (
                <div className="loadingCircle"></div>
              )}
              <div className="loadingText">
                Loading...
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div className="add_ques">
          <header className="add_ques__header">
            <h1 id="add_ques__title">{this.state.pageTitle.single} Details</h1>
            <Stack className="add_ques__examDetails" spacing={1}>
              <div className="add_ques__examDetails__examName">
                <label className="add_ques__examDetails__examName_label">
                  {this.state.pageTitle.single} Name:{" "}
                </label>
                <label className="add_ques__examDetails__examName_value">
                  {this.state.examName}
                </label>
                {/* <Button
                  className="add_ques__examDetails__examName_btn"
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => this.change(true, "editName")}
                >
                  Edit
                </Button> */}
                <LoadingButton
                  className="add_ques__examDetails__examName_btn"
                  onClick={() => this.change(true, "editName")}
                  loading={this.state.changingMetadata}
                  startIcon={<EditIcon />}
                  variant="contained"
                  size="small"
                  loadingPosition="start"
                  color="primary"
                >
                  Edit
                </LoadingButton>

                <Dialog open={this.state.editName}>
                  <DialogTitle>
                    Edit {this.state.pageTitle.single.toLowerCase()} name
                  </DialogTitle>
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
                      onChange={(e) =>
                        this.change(e.target.value, "examNameNew")
                      }
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() =>
                        this.setState({
                          editName: false,
                          changingMetadata: false,
                        })
                      }
                    >
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
                <LoadingButton
                  className="add_ques__examDetails__examName_btn"
                  onClick={() => this.change(true, "editDuration")}
                  loading={this.state.changingMetadata}
                  startIcon={<EditIcon />}
                  variant="contained"
                  size="small"
                  loadingPosition="start"
                  color="primary"
                >
                  Edit
                </LoadingButton>

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
                      onClick={() =>
                        this.setState({
                          editDuration: false,
                          changingMetadata: false,
                        })
                      }
                    >
                      Cancel
                    </Button>
                    <Button onClick={this.updateExamDuration}>Submit</Button>
                  </DialogActions>
                </Dialog>
              </div>
            </Stack>

            <Stack className="add_ques__form" id="addQuestionForm" spacing={1} sx={{}}>
              <h3>Add Question</h3>
              {this.showErrorMessage()}
              {this.showSuccessMessage()}
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
                  {this.answerOptions.map((option, index) => {
                    return (
                      <div
                        className="add_ques__q_textInput answer"
                        key={`option_${index}`}
                      >
                        <FormControlLabel
                          control={<Checkbox />}
                          label={option["statement"]}
                          name={option["statement"]}
                          // checked={option["isAnswer"]}
                          onClick={this.updateAnswers}
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
                      <TextField {...params} placeholder="Subject" />
                    )}
                  />
                </div>
              </div>

              <div className="add_ques__form__btnGrp">
                { !this.state.editQuestion && (
                  <LoadingButton
                    className="add_ques__form__btn"
                    onClick={this.addQuestion}
                    loading={this.state.addingQuestion}
                    startIcon={<Add style={{ display: "block" }} />}
                    variant="contained"
                    loadingPosition="start"
                    color="primary"
                  >
                    Add
                  </LoadingButton>
                )}
                {this.showButtons()}
                <LoadingButton
                    className="add_ques__form__btn"
                    startIcon={<DoneIcon style={{ display: "block" }} />}
                    variant="contained"
                    loadingPosition="start"
                    color="success"
                    onClick={() => {
                      this.setState({ finishExam: true });
                    }}
                  >
                    {this.completeExam()}
                    Finish
                  </LoadingButton>
              </div>
              
            </Stack>

            {this.renderQuestionList()}

          </header>
        </div>
      </>
    );
  }
}

function wrapWithHook(Component) {
  return function WrappedComponent(props) {
    const useParamsHook = useParams();
    const useAxiosHook = useAxios();
    return (
      <Component
        {...props}
        useAxiosHook={useAxiosHook}
        params={useParamsHook}
      />
    );
  };
}

export default wrapWithHook(Questions);
