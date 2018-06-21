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
  }
  
  render(){
    const {classes} = this.props;
    return (
    <div className={classes.dayContent} onClick={this.props.onFocus}>
      <Grid container>
        <Grid item xs={12}>
          時間條
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <h1>Day : {this.props.dayID}</h1>
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