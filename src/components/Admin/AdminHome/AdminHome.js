import React, { Component } from "react";
import axios from "axios";
import Nav from "./../NavBar/AdminNav";
import "./AdminHome.css";
import Slider from "react-slick";

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      currentuser: {},
      images: []
    };
  }
  componentDidMount() {
    axios.get("/getcurrentuser").then(res => {
      this.setState({ currentuser: res.data });
    });
    axios.get("/getphotos").then(res => {
      this.setState({ images: res.data.images });
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
      <div className="resizeimage">
        <img key={i} className="images" alt="" src={e} />
      </div>
    ));

    return (
      <div>
        <Nav />
        <div className="adminhome">
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
        </div>
      </div>
    );
  }
}
