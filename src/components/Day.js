import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Grey from '@material-ui/core/colors/grey';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const styles = theme =>({
  dayRoot:{
    // display: 'flex',
    // flexDirection: 'column',
    width: '100%',
    '&:hover': {
      backgroundColor: Grey[200],
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    flexBasis: '20%',
    flexShrink: 0,
  },
  timeHeading: {
    flexBasis: '20%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: '30vw',
  },
  isFocus:{
    backgroundColor: Grey[500],
    //boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  Chip: {
    width: '4vw',
    height: '10vh',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    margin: theme.spacing.unit / 2,
  },
  hide:{
    display: 'none',
  }
});

class Day extends Component {
  constructor(props){
    super(props); 
    this.Text = "No schedule yet!";
  }
  convertDate = (date) =>{
    let dateString = ((date.getMonth()+1)<10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + '-'
                    + ((date.getDate())<10 ? '0' + (date.getDate()) : (date.getDate()));
    return dateString;
  }
  handleDelete = (index, dayID) => () =>{

    this.props.deleteLocation(dayID,index);
  }
  render(){
    const {dayID} = this.props;
    const {classes} = this.props;
    const {schedule} = this.props;
    return (
    <div className={[schedule.day[dayID].isFocus ? classes.isFocus : ""].join(' ')} onClick={()=> this.props.onFocus(dayID)}>
      <ExpansionPanel className={classes.dayRoot} expanded={dayID === schedule.focusDay}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
          Day : {dayID}<br/>
          { this.convertDate(schedule.day[dayID].date) }
          </Typography>
          <Typography className={[classes.secondaryHeading , schedule.day[dayID].isFocus ? classes.hide : "" ].join(' ')}>
            {schedule.day[dayID].location.map((place,index) => {
                  return (place.name)
                }).join(',')
            }
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            {schedule.day[dayID].location.map((place,index) => {
                return (
                <Grid key={index} container>

                  <Grid item xs={4}>
                    TimePicker
                  </Grid>
                  <Grid item xs={8}>
                    <Chip
                      key={index}
                      label={place.name}
                      onDelete={this.handleDelete(index,dayID)} //to do delete handle
                      //className={classes.chip}
                    />
                  </Grid>
                </Grid>)
                })
            }
            </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
    )
  }
}
  Day.propTypes = {
    classes: PropTypes.object.isRequired,
    dayID: PropTypes.number.isRequired,
  };
  
  export default withStyles(styles)(Day);