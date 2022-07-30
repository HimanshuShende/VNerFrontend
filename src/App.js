import "./App.css";
import React, { Component } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

class App extends Component {
  constructor() {
    super();
    this.state = {
      question: '',
      opt: "",
      options: [],
      items: [],
      subject: ''
    };
  }

  change = (value, paramName) => {
    this.setState({
      [paramName]: value,
    });
  };

  addOption = () => {
    this.setState({
      options: [...this.state.options, this.state.opt],
    }, this.updateItems);
  };

  updateItems = () => {
    const items = [...this.state.items,<FormControlLabel control={<Checkbox />} label={this.state.opt} name={this.state.opt} onChange={this.log}/>];
      this.setState({
        items: items
      });
  }

  log = (e) => {
    console.log(e.target.checked);
    console.log(e.target.name);
  }

  addQuestion = () => {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1>Create Exam</h1>

          <Stack spacing={3} sx={{ width: 900, backgroundColor: "rgb(137, 199, 205)", padding: 5 }}>
            <div className="parent">
              <label className="child1">Question: </label>
              <div className="child2">
                <TextField
                  className="tb"
                  style={{width: '600px'}}
                  id="outlined-textarea"
                  placeholder="Enter your question..."
                  value={this.state.question}
                  onChange={(e) => this.change(e.target.value, 'question')}
                  multiline
                />
              </div>
            </div>

            <div className="parent">
              <label className="child1">Options: </label>
              <div className="child2">
                <TextField
                  className="tb"
                  id="outlined-textarea"
                  placeholder="Enter your option..."
                  value={this.state.opt}
                  onChange={(e) => this.change(e.target.value, 'opt')}
                />
                <br></br>
                <Button variant="contained" color="success" onClick={this.addOption} disabled={!this.state.opt.length}>
                  Add
                </Button>
              </div>
            </div>

            <div className="parent">
              <label className="child1">Answer(s): </label>
              <div className="child2">{this.state.items}</div>
            </div>

            <div className="parent">
              <label className="child1">Subject: </label>
              <div className="child2">
                <Autocomplete
                  className="tb"
                  id="tags-outlined"
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  filterSelectedOptions
                  onChange={(e,v) => {if(v)this.change(v.title, 'subject')}}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Subject" />
                  )}
                />
              </div>
            </div>

            <Button style={{ width: "200px" }} variant="contained" onClick={this.addQuestion}>
              Add Question
            </Button>
          </Stack>
        </header>
      </div>
    );
  }
}

// var opt = '';

// const options = ['opt1', 'opt2'];

// var items = [];

// options.forEach(element => {
//   items.push(<FormControlLabel control={<Checkbox defaultChecked />} label={element} />)
// });

// const addOption = () =>{
//   options.push(opt);
//   items = [];
//   options.forEach(element => {
//     items.push(<FormControlLabel control={<Checkbox defaultChecked />} label={element} />)
//   });
// }

// const change = (e) => {
//   opt = e.target.value;
// }

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];

export default App;
