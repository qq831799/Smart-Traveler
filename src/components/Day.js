import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme =>({
  dayContent:{

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
    this.props = nextProps;
    if(schedule[dayID] !== undefined && schedule[dayID].location !== undefined && schedule[dayID].location.length){
      
      this.Text = schedule[dayID].location.map((place,index) => {
        return <p key={index}>{place.name}</p>
      });
    }
  }
  render(){
    const {dayID} = this.props;
    const {classes} = this.props;
    const {schedule} = this.props;
    return (
    <div className={classes.dayContent} onClick={()=> this.props.onFocus(dayID)}>
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