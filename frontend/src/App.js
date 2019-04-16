import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    eddies_hire_date: "",
    riddledata: [
      "86111105991011081011151153210511632991141051011154432871051101031081011151153210210811711611610111411544328411111111610410810111511532981051161011154432771111171161041081011151153210911711611610111411546",
      "5468652073756d2074686520746f74616c206f66207468652061736369692076616c7565732066726f6d2065616368206c657474657220696e2074686520616e7377657220746f2074686520726964646c652e",
      "507473543466548535531534555466536545548466531466546538545544535466549533548535535544467"
    ]
  };
  convertFromHex() {
    var _hex = this.state.riddledata[1].toString(); //force conversion
    var str = "";
    for (var i = 0; i < _hex.length; i += 2)
      str += String.fromCharCode(parseInt(_hex.substr(i, 2), 16));
    return str;
  }
  getSumOfASCII() {
    var _asc_cnt_a = 0;
    var _asc_cnt_b = 0;
    var _asc_a = this.state.riddledata[0].toString(); //force conversion
    var _asc_b = this.state.riddledata[2].toString(); //force conversion

    for (var i = 0; i < _asc_a.length; i += 2) {
      // console.log(_asc_a.substr(i, 2));
      _asc_cnt_a += parseInt(_asc_a.substr(i, 2), 16);
    }

    for (i = 0; i < _asc_b.length; i += 2) {
      //console.log(_asc_b.substr(i, 2));
      _asc_cnt_b += parseInt(_asc_b.substr(i, 2), 16);
    }

    return _asc_cnt_a + _asc_cnt_b;
  }
  componentDidMount() {
    fetch("https://eddieshiredate.herokuapp.com/whatdate")
      .then(res => res.json())
      .then(res => {
        this.setState({
          eddies_hire_date: res.eddies_hire_date,
          error: res.error || null,
          loading: false,
          riddle: this.convertFromHex(),
          riddleresult: this.getSumOfASCII()
        });
      });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <h2>Solution 1:</h2>{" "}
            <h4>Eddie's Start Date: {this.state.eddies_hire_date}</h4>{" "}
            <h2>Solution 2:</h2> <h4>Riddle: {this.state.riddle}</h4>{" "}
            <h4>Riddle Result: {this.state.riddleresult}</h4>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
