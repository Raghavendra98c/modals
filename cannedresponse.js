import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ReactTooltip from "react-tooltip";
import TextField from '@material-ui/core/TextField';

import { Actions, withTheme } from '@twilio/flex-ui';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import { CannedResponsesStyles } from './CannedResponses.Styles';
import Highlighter from "react-highlight-words";
import { makeStyles } from "@material-ui/core/styles";
// import Parser from 'html-react-parser';

//lists
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Cancel from '@material-ui/icons/Cancel';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Button from '@material-ui/core/Button';

import Popover from '@material-ui/core/Popover';

import ContentEditable from 'react-contenteditable'
import 'antd/dist/antd.css';

import { Collapse ,Space} from 'antd';

const { Panel } = Collapse;
const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 8;

const text = {
  color: "black",
  fontWeight: "bolder",
  textDecoration: "underline",
  fontSize: 18
};

const text1 = {
  color: "black",
  textDecoration: "underline"
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

class CannedResponses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchor: null,
      response: '',
      cannedarray: [],
      selectedmsg: "",
      isDisabled: true,
      enableText: false,
      enablecontent: true,
      showTextbox: false,//hide or show textbox based on click of a button CR
    }
  }

  componentDidMount() {
    this.tick();
  }

  async tick() {
    const body = { WorkerSpaceSid: 'WS1003379bef66573a71bdb0a94e5ab5b9' };
    const options = {
      method: 'POST',
      body: new URLSearchParams(body),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    };
    await fetch('https://cannedresponse-5205.twil.io/response', options)
      .then(resp => resp.json())
      .then(data => {
        console.log(data, "datttttttttttt");

        this.setState({ cannedarray: data });
        // this.cannedarray=data;
      })
      .catch(err => {
        console.log(err)
      })
  }

  replaceAll(string, search, replace) {
    return string.split(search).join(replace);
  }

  escapeRegExp(string) {
    console.log(string, "strrrrrrrrrrrrrrrr")
    return string.replace(/[.*+?^${}<>|[\]\\]/g, '\\$&');
    // $& means the whole matched string

  }

  replacecanned(str, find, replace) {
    console.log(str, "strrrrrrr000")
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);

  }

  handleChange = (event) => {

    this.setState({ enableText: true })
    console.log(event, "evennnnt")
    this.setState({ response: event, anchor: null, selectedmsg: event, isDisabled: true });
    console.log(this.state.selectedmsg, "selectedddddddddddddddddddddddd")
    // let selectedmsg = event;
    // if(event.includes('\n')){
    //   event= event.replace(/(?:\r\n|\r|\n)/g, "<br>");
    // }
    let msg1;
    let msg2;
    let msg3, msg4;
    //the below line if you are not able to fetch first name
    if (event.match(/([^[]+(?=]))/g)) {
      // event.match(/([^[]+(?=]))/g).style.backgroundColor = "#AA0000";
      // if (event.includes("[first name]") || event.includes("[insert ticket concern]")||event.includes("[insert information]")) {
      var newTxt = event.split('[');
      let sampleText = event;
      for (var i = 1; i < newTxt.length; i++) {
        let value = newTxt[i].split(']')[0];
        console.log(value, "matchhh");

        sampleText = this.replacecanned(sampleText, `[${value}]`, `<span  style="color: red;">[${value}]</span>`);

      }
      // msg1 = this.replacecanned(event, '[first name]', '<span style="color: red;">[first name]</span>');

      // msg2 = this.replacecanned(msg1, '[insert ticket concern]', '<span style="color: red;">[insert infromation]</span>')
      // msg3 = this.replacecanned(msg2, '[insert information]', '<span style="color: red;">[insert infromation]</span>')
      // msg4= this.replacecanned(msg2, '___', '<span style="color: red;">___</span>')

      this.setState({ selectedmsg: sampleText })
    }
    else {
      this.setState({ selectedmsg: event, isDisabled: false })
    }

    console.log(msg1, "msggggggg")
    console.log(msg2, "msggggggg")
    //   this.state.selectedmsg = this.replacecanned(this.state.selectedmsg,"(first name)","<p style={{color:'red'}}>first name</p>")
    // this.state.selectedmsg = this.replacecanned(this.state.selectedmsg,'(insert infromation)','<span style={{color:"red"}}>insert infromation</span>')


    console.log(this.state.selectedmsg, "selected msggggggg")

    // if (this.state.selectedmsg.includes("(first name)")) {

    //   this.state.selectedmsg = this.replaceAll(this.state.selectedmsg, "(first name)",`${this.props.agentname}`)

    // }
    // if (this.state.selectedmsg.includes("(insert ticket concern)")) {

    //  this.state.selectedmsg = this.replaceAll(this.state.selectedmsg, "(insert ticket concern)", `${this.props.agentname}`)

    // }

    // Actions.invokeAction("SetInputText", {
    //   channelSid: this.props.channelSid,
    //   body: this.state.selectedmsg
    // });
    this.setState({ enableContent: true })

  }



  handleClick(ev) {

    console.log(ev, "currentttttt")
    this.setState({ anchor: ev.currentTarget, enablecontent: false,showTextbox:true })
    console.log(ev.currentTarget, "currentttttt11111")

  }

  handleChange1(event) { this.setState({ value: event.target.value }); }
  handleClose = () => {
    this.setState({ anchor: false ,showTextbox:false})
  };

  handleTextarea = (ev) => {
    this.setState({ selectedmsg: ev.target.value })
  }

  handleOnClick = e => {


   this.state.selectedmsg= this.state.selectedmsg.replace(/<(.|\n)*?>/g, '');
    console.log(this.state.selectedmsg,"mshgggggg")
    Actions.invokeAction('SendMessage', {
      channelSid: this.props.channelSid,
      body: this.state.selectedmsg
    });
    this.setState({ selectedmsg: "", isDisabled: true, enablecontent: true,showTextbox:false })
  }

  handleChangeText = (ev) => {
    console.log('ev ======', ev);




    console.log(ev.target.value, "eventt");


    // var regex = /\[(\S*)\]/g;
    // let m;

    // while ((m = regex.exec(ev.target.value)) !== null) {
    //     // This is necessary to avoid infinite loops with zero-width matches
    //     if (m.index === regex.lastIndex) {
    //         regex.lastIndex++;
    //     }

    //     // The result can be accessed through the `m`-variable.
    //     m.forEach((match, groupIndex) => {
    //         console.log(`Found match, group ${groupIndex}: ${match}`,"hellllllll");
    //     });
    // }

    // if (ev.target.value.includes("(first name)") || ev.target.value.includes("(insert information)") || ev.target.value.includes("(") || ev.target.value.includes(")")) {

    //   console.log(ev.target.value,"valueeee")

    //   this.setState({ isDisabled: true})
    // }
    //...................................................................my code..........................
    //     var newTxt = ev.target.value.split('[');
    // for (var i = 1; i < newTxt.length; i++) {
    //     console.log(newTxt[i].split(']')[0],"matchhhh");
    // }
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''my code.......................................................

    if (ev.target.value.match(/([^[]+(?=]))/g) || ev.target.value.match(/\[/) || ev.target.value.match(/\]/) ){
      this.setState({ isDisabled: true, selectedmsg: ev.target.value })
    }
    else if (ev.target.value ==null||ev.target.value === '') {
      //make is disabled false 
      this.setState({ isDisabled: true, enablecontent: true,showTextbox:false })
    }
    else {
      this.setState({ isDisabled: false, selectedmsg: ev.target.value })
    }

  }
  render() {
    return (
      <CannedResponsesStyles>
        <FormControl className="form">

        {this.state.showTextbox ? <p style={{fontSize:'10px'}}>Please replace the square bracket contents with appropriate values </p>:null}
{this.state.showTextbox ?  <ContentEditable
            disabled={this.state.enablecontent}
            id="contentData"
            onKeyPress={event => {
              if (event.key === 'Enter') {
                document.execCommand('insertLineBreak')

                // return true;
                event.preventDefault();
              }
            }}
            onKeyDown={event => {
              if (event.key === 'Backspace') {
                onfocus = "document.execCommand('selectAll');"
              }
            }}
            style={{ display: "inline-block", border: "1px solid rgb(35, 54, 89)", padding: "10px", whiteSpace: "pre-wrap", height: "55px", overflowY: "scroll" }}
            html={this.state.selectedmsg} // innerHTML of the editable div
            // dangerouslySetInnerHTML={{ __html: this.state.selectedmsg}}
            onChange={this.handleChangeText} // handle innerHTML change
          />:null}
      {this.state.showTextbox ?    <Button disabled={this.state.isDisabled} variant="text" onClick={this.handleOnClick.bind(this)}>submit</Button>:null}
        
          <Button onClick={this.handleClick.bind(this)} className="input-label" htmlFor="response">Canned Responses</Button>

          <Popover PaperProps={{ style: { width: '95%', height: '90%', border: "1px solid black" } }} anchorEl={this.state.anchor} open={!!this.state.anchor} onClose={this.handleClose}>
            <List component="nav">
              <ListItem style={{ display: 'flex', justifyContent: 'flex-end' }} >
                <ListItemIcon onClick={() => this.setState({ anchor: null ,showTextbox:false})}>
                  <Cancel></Cancel>
                </ListItemIcon>
              </ListItem>


              {this.state.cannedarray.map((c, i) => {
                return (
                  <>
            <Space
    direction="vertical"
    size="middle"
    style={{
      display: 'flex',
      margin:10
    }}
  >
                   <Collapse>
                        <Panel  style={{ fontWeight: 600 ,fontSize:17,fontDecorationLine:'underline'}} header={c.subtopics[0].topic} >
                   
                        <div>
                          <ListItem  style={{ marginTop: '10px', whiteSpace: "pre-wrap" }} button onClick={this.handleChange.bind(this, c.subtopics[0].topicdata)}>
                            <ListItemText style={{ whiteSpace: "pre-wrap" }}>
                              <div  style={{fontSize:'15px'}} dangerouslySetInnerHTML={{
                                __html: c.subtopics[0].topicdata
                              }}></div>
                            </ListItemText>
                          </ListItem>
                          {c.subtopics?.slice(1).map((o, i) => {
                            return (
                              <>
                                <ListItem>
                                  <ListItemText 
                                    primaryTypographyProps={{ style: text1 }}
                                  >
                                    {o.heading}
                                  </ListItemText>{" "}
                                </ListItem>
                                <ListItem
                                  button
                                  onClick={this.handleChange.bind(this, o.data)}
                                >
                                  <ListItemText>
                                    <p  style={{fontSize:15 }}>{o.data}</p>{" "}
                                  </ListItemText>
                                </ListItem>
                              </>
                            );
                          })}
                        </div>
                      </Panel>
                    </Collapse>
                    </Space>
                    </>
                );
              })}
            </List>
          </Popover>
        </FormControl>
      </CannedResponsesStyles>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  let currentTask = false;
  state.flex.worker.tasks.forEach((task) => {
    if (ownProps.channelSid === task.attributes.channelSid) {
      currentTask = task;
    }
  })

  return {
    state,
    currentTask,
  }
}

export default connect(mapStateToProps)(withTheme(CannedResponses));
