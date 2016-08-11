import React, { Component } from 'react';
import './App.css';

class Danmu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {value: "这里少个分号", top: 10, right: -15, color: "#1874CD"},
        {value: "生无可恋.jpg", top: 35, right: -40, color: "FFFFFF"},
        {value: "后方小哥迷之傲视", top: 20, right: -30, color: "#BBFFFF"},
        {value: "你们好吵", top: 40, right: -45, color: "#EE7AE9"},
        {value: "233333", top: 10, right: -50, color: "#DC143C"},
        {value: "玛德智障", top: 70, right: -20, color: "#EEEE00"},
        {value: "表白图中妹子~_~", top: 55, right: -25, color: "#9BCD9B"},
      ]
    }
  }

  handleAddList(value) {
    let data = this.state.data;
    let n = Math.floor(Math.random() * 90);
    let m = -Math.floor(Math.random() * 40 + 10);
    let colorArr = ["#DC143C","#EE7AE9","#9BCD9B","#1874CD","#FFA500","#FFFFFF","#ADFF2F", "#EEEE00", "#68228B", "#BBFFFF"]
    let color = colorArr[Math.floor(Math.random() * 10)];
    data.push({value: value, top: n, right: m, color: color});
    this.setState({data});
  }

  render() {
    return (
      <div className="danmu">
        <Main
          data={this.state.data}
          url="./src/img.jpg"
        />
        <Prompt buttonValue={this.handleAddList.bind(this)} />
      </div>
    );
  }
}

class Main extends Component {
  addSpanMove() {
    console.log(this.props.data);
    let span = document.querySelector('.main_dan').querySelectorAll('span');
    let i = 0;
    let timer = null;
    timer = setInterval(function(){
      span[i].className = 'move';
      i++;

      if(i >= span.length) {
        clearInterval(timer);
      }
    }.bind(this), 200);
  }

  componentDidMount() {
    this.addSpanMove();
  }

  componentDidUpdate() {
    this.addSpanMove();
  }

  render() {
    let valList = this.props.data.map(function(itemlist){
      return (
        <Item value={itemlist.value} top={itemlist.top} right={itemlist.right} color={itemlist.color} />
      );
    }, this);

    return (
      <div className="main" style={{backgroundImage: 'url('+this.props.url+')'}}>
        <section className="main_dan">
          {valList}
        </section>
      </div>
    );
  }
}

class Item extends Component {
  render() {
    let value = this.props.value;
    let top = this.props.top;
    let right = this.props.right;
    let color = this.props.color;

    return (
      <span style={{top: top+'%', right: right+'%', color: color}}>{value}</span>
    );
  }
}

class Prompt extends Component {
  buttonValue(e) {
    e.preventDefault();
    let value = this.refs.tcval.value.trim();
    if(!value) {
      return;
    }
    this.props.buttonValue(value);
    this.refs.tcval.value = "";
  }

  render() {
    return (
      <form className="prompt" onSubmit={this.buttonValue.bind(this)}>
        <input id="tcval" ref="tcval" type="text" placeholder="吐槽一下！" />
        <button type="submit">吐槽</button>
      </form>
    );
  }
}

export default Danmu;
