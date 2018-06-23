import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme =>({
  isFocus:{
    boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
});

class Day extends Component {
  constructor(props){
    super(props); 
    this.Text = "No schedule yet!";
  }
  componentWillReceiveProps(nextProps){
    const {dayID} = nextProps;
    const {schedule} = nextProps;
    // console.log(schedule);
    this.props = nextProps;
    if(schedule.day[dayID].location.length){
      this.Text = schedule.day[dayID].location.map((place,index) => {
        return <p key={index}>{place.name}</p>
      });
    }else{
      this.Text = "No schedule yet!";
    }
  }
  render(){
    const {dayID} = this.props;
    const {classes} = this.props;
    const {schedule} = this.props;
    return (
    <div className={schedule.day[dayID].isFocus ? classes.isFocus : ""} onClick={()=> this.props.onFocus(dayID)}>
      <Grid container>
        <Grid item xs={12}>
          時間條
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <h1>Day : {dayID}</h1>
          {this.Text}
        </Grid>
      </Grid>
    </div>
    )
  }
}
  Day.propTypes = {
    classes: PropTypes.object.isRequired,
    dayID: PropTypes.number.isRequired,
  };
  
  export default withStyles(styles)(Day);