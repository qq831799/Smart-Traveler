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
import TextField from '@material-ui/core/TextField';
import produce from "immer";

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
    display: 'block',
    width: '4vw',
    height: '10vh',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    margin: 'auto',
    margin: theme.spacing.unit / 2,
  },
  singleSchedule:{
    margin: '2vh 0',
  },
  hide:{
    display: 'none',
  }
});

class Day extends Component {
  constructor(props){
    super(props); 

    this.state = {
      emptyText:"No schedule yet! Please select and add places you want to go from the map!",
      locationTime:[]
    }
  }
  componentWillReceiveProps(nextProps){
    let {dayID,schedule} = nextProps;
    let nextState = produce(this.state, draftState => {
      if(schedule.day[dayID].location.length === 0){
        draftState.emptyText = "No schedule yet! Please select and add places you want to go from the map!";
      }else{
        draftState.emptyText = "";
        if(schedule.day[dayID].location !== this.props.schedule.day[dayID].location){
          draftState.locationTime = schedule.day[dayID].location.map(location => location.startTime);
          // console.log("cwrp");
        } 
      }
    });
    this.setState(nextState);

  }
  convertDate = (date) =>{
    let dateString = ((date.getMonth()+1)<10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + '-'
                    + ((date.getDate())<10 ? '0' + (date.getDate()) : (date.getDate()));
    return dateString;
  }
  handleTimeChange = (index,dayID,value) =>{
    // console.log(value);
    let nextState = produce(this.state, (draftState) =>{
      draftState.locationTime[index] = value;
      
    });
    this.setState(nextState);
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
            {this.state.emptyText}
            {schedule.day[dayID].location.map((place,index) => {
                return (
                <Grid className={classes.singleSchedule}  key={index} container>
                  <Grid item xs={4}>
                    <TextField
                      id="time"
                      type="time"
                      value={this.state.locationTime[index]}
                      className={classes.textField}
                      InputLabelProps={{shrink: true,}}
                      inputProps={{step:300}}
                      onChange={(e) => this.handleTimeChange(index,dayID,e.target.value)}
                      onBlur={(e)=>{this.props.updateTime(dayID,index,e.target.value)}}
                    />

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