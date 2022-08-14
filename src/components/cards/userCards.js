import React, { Component } from "react";
// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import EMAIL from "assets/img/email.png";

const classes = {
  root: {
    flexGrow: 1
  },
  // paper: {
  //   padding: 20,
  //   textAlign: "center",
  //   color: "blue",
  //   fontFamily: "Roboto"
  // }
};

class UserCards extends Component {
  state = {
    data: [],
    per: 9,
    page: 1,
    total_pages: 1
  };

  uppercase = word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  loadData = () => {
    const { data } = this.state;
    const endpoint = `cc_members.json`;
    fetch(endpoint)
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: [...data, ...json.results],
          scrolling: false,
          total_pages: json.info.results
        });
      });
  };

  // loadMore = () => {
  //   this.setState(
  //     prevState => ({
  //       page: prevState.page + 1,
  //       scrolling: true
  //     }),
  //     this.loadData
  //   );
  // };

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <div style={classes.root}>
        <Grid container spacing={3}>
          {/*Create items with different breakpoints */}
          {/*For example,This item will be 12 units wide on extra small screens */}
          {/* <Grid item xs={12}>
            <Paper style={classes.paper}>xs=12</Paper>
          </Grid> */}
          {/*This item will be 12 units on extra small screens */}
          {/*But will be 6 units on small screens */}
          {/*<Grid item xs={12} sm={6}>
            <Paper style={classes.paper}>xs=12 sm=6</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper style={classes.paper}>xs=6 sm=3</Paper>
          </Grid> */}

          {this.state.data.map(data => (
            <Grid item xs={6} sm={4}>
              {/* <Paper style={classes.paper}> */}
              <div className="col-md-4 animated fadeIn" key={data.id}>
                <div className="card">
                  <div className="card-body">
                    <div className="avatar">
                      <img
                        src={data.picture}
                        className="card-img-top"
                        alt=""
                      />
                    </div>
                    <h5 className="card-title">
                      {this.uppercase(data.name.first) +
                        " " +
                        this.uppercase(data.name.last)}
                    </h5>
                    <p className="card-text">
                      {this.uppercase(data.Role)}
                      <br />
                      <br />
                      <a href={`mailto:${data.email}`}>
                        <img src={EMAIL} height={30} alt="EMAIL"/>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default UserCards;
