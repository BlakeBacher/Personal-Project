import React, { Component } from "react";
import axios from "axios";
import Nav from "../Navbar/Navbar";
import "./Home.css";
import Slider from "react-slick";

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      currentuser: {},
      images: [],
      weather: '',
      city:''
    };
  }

  componentDidMount() {
    axios.get("/getcurrentuser").then(res => {
      this.setState({ currentuser: res.data });
    });
    axios.get("/getphotos").then(res => {
      this.setState({ images: res.data.images });
    });
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?id=5780026&APPID=${process.env.WEATHER_KEY}`
      )
      .then(res => {
        let currentWF = res.data.main.temp;
        currentWF = (currentWF - 273.15) * 1.8 + 32;
        this.setState({
          weather: currentWF.toFixed(0) + "˚",
          city: res.data.name
        });
      });
  }

  render() {
    var settings = {
      rows: 2,
      slidesPerRow: 2,
      infinite: true,
      autoplay: true,
      speed: 1000,
      centerMode: true
    };

    let mappedimages = this.state.images.map((e, i) => (
      <div className="resizeimage" style={{ padding: "5px" }} key={i}>
        <div
          style={{
            backgroundImage: `url('${e}')`,
            width: "120px",
            height: "120px",
            backgroundSize: "cover"
          }}
        />
      </div>
    ));
    return (
      <div>
        <Nav />
        <div className="home">
          <div className="userinfo">
            <div>
              <img
                alt=""
                className="currentuserphoto border"
                src={this.state.currentuser.picture}
              />
            </div>
            <div>Hi, {this.state.currentuser.displayname}!</div>
            <br />
            <p>Welcome to kjostyles.com</p>
          </div>
          <div className="carousel">
            <Slider {...settings}>{mappedimages}</Slider>
          </div>
          <br/>
              <div style = {{fontSize: '15px'}}>{this.state.city} {this.state.weather}</div>
        </div>
      </div>
    );
  }
}
