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
    fontSize: theme.typography.pxToRem(15),
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
    overflowY: 'hidden',
    maxWidth: '30vw',
  },
<<<<<<< HEAD
=======
  locationContainer:{
    // display: 'flex',
    // flexDirection: 'column',
    // height: '50vh',
  },
  scheduleContainer:{
    width:"100%",
    display: 'flex',
    flexDirection: 'column',
  },
>>>>>>> ffde0ad79d04882ea06ff92d962d5bfb912a6ec6
  isFocus:{
    boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  Chip: {
    width: '4vw',
    height: '10vh',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    margin: theme.spacing.unit / 2,
  },
});

class Day extends Component {
  constructor(props){
    super(props); 
    this.Text = "No schedule yet!";
  }
  /*componentWillReceiveProps(nextProps){
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
  }*/
  handleDelete = (index, dayID) => () =>{

    this.props.deleteLocation(dayID,index);
  }
  render(){
    const {dayID} = this.props;
    const {classes} = this.props;
    const {schedule} = this.props;
    return (
    <div className={[schedule.day[dayID].isFocus ? classes.isFocus : ""].join(' ')} onClick={()=> this.props.onFocus(dayID)}>
      <ExpansionPanel className={classes.dayRoot}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Day : {dayID}</Typography>
          <Typography className={classes.secondaryHeading}>
            {schedule.day[dayID].location.map((place,index) => {
                  return (place.name)
                }).join(',')
            }
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <div className={classes.scheduleContainer}>
            <Typography className={classes.timeHeading}>時間條</Typography>
            <hr></hr>
            <div className={classes.locationContainer}>
              {schedule.day[dayID].location.map((place,index) => {
              //console.log(place);
                  return (<Chip
                    key={index}
                    label={place.name}
                    onDelete={this.handleDelete(index,dayID)} //to do delete handle
                    //className={classes.chip}
                  />)
                })
              }
            </div>
          </div>
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