import React from "react";
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Modal.css';
import axios from 'axios';
import Swal from "sweetalert2";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Cancel from '@material-ui/icons/Cancel';
import ListItemText from '@material-ui/core/ListItemText';
import { Collapse ,Space} from 'antd';
//import Popover from '@material-ui/core/Popover';
import Popover from '@mui/material/Popover';
const { Panel } = Collapse;
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';




const text1 = {
  color: "black",
  textDecoration: "underline"
};



export default class Modals extends React.Component {
     constructor(props) {
      console.log(props,"*****Modal.js")
        super(props);        
        this.state = {
            show: false,
            show1:false,
            sms_value:"",
            phone_number:"",
            cannedarray: [],
            anchor:null

        }
        this.handleMessage=this.handleMessage.bind(this)
    }
   async componentDidMount(){
      let from=this.props.channel.source.attributes.from
      let phone_number=from.split(":")[1]
      console.log(phone_number,"*****phone_number")
      this.setState({phone_number})
    }

    handleModal=()=> {
      this.setState({ show:!this.state.show })
    }
    handleModal1=(ev)=>{
      console.log("Boolean",Boolean(ev.currentTarget))
      console.log(!!ev.currentTarget)
      console.log("canned Respone"+ ev.currentTarget)
      this.setState({ anchor: ev.currentTarget})
    }
    componentDidMount(){
      this.handleCannaedResponses()
    }
    handleCannaedResponses= async ()=> {
     this.setState({show1:!this.state.show1 })
 
    const body = { WorkerSpaceSid: 'WS0125d10f9b864ef449f5eea82c1e8028' };
    const options = {
      method: 'POST',
      body: new URLSearchParams(body),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    };

    

    fetch('http://cannedresponse-3375.twil.io/response', options)
      .then(resp => resp.json())
      .then(data => {
        console.log(data, "datttttttttttt");

       this.setState({ cannedarray: data });
        // this.cannedarray=data;
      })
      .catch(err => {
        console.log(err)
      })}
      
         
    handleMessage=(e)=>{
   
    this.setState({sms_value:e.target.value})
    console.log(e.target.value)
     }


     
     sendSms(s_value,phone_number){  
      //console.log(s_value)
      console.log(this.state.message)
      let sms="Hello "+s_value
      // let from=props.channel.source.attributes.from
      //let phone_number=from.split(":")[1]
      //let sms="Hello" +this.state.sms_value
      
      axios.post('https://tumbleweed-penguin-7678.twil.io/outbound-sms',{

      content:sms,

       msisdn:phone_number

      }
  
  ).then(response =>{
        console.log(response)
        if(response.data.status === "success"){
          Swal.fire(
            "Good Job!",
            "You Clickked The Button!",
            "Success"
          )
        }
      }).catch(error=>{
        console.log(error)
        Swal.fire(
          "Error..!",
          "Something Went Wrong..!",
          "Error"
        )
      })
     }

     render() {
         return (
            <div>
                 <Button onClick={() => this.handleModal()}>Outbound SMS</Button>
                 <Modal  show={this.state.show} onHide={() => this.handleModal()}>
                     <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                     
                        <textarea 
                          rows='2'
                          placeholder="Type Message"
                          value={this.state.message} 
                          onChange = {(e)=>this.handleMessage(e)} 
                         />

                         <br/><br/>
                        {/* <textarea rows='2' placeholder="Type Message" onChange={(e)=>this.setState(this.handleMessage({message:e.target.value}))} /><br/><br/> */}
                       {/* // <input value={this.state.message} onChange={this.handleMessage} /> */}
                        <Button
                          onClick={()=>this.sendSms(this.state.sms_value,this.state.phone_number)}>
                          SEND
                        </Button>

                        <Button
                         className="btn" value={this.state.cannedarray} onClick={() => this.handleModal1(event)}>
                         CANNED RESPONSE
                        </Button>

                        <PopupState variant="popover" popupId="demo-popup-popover" >

                        </Modal.Body>
                        
                        <Popover PaperProps={{ style: { width: '95%', height: '90%', border: "1px solid black" } }} anchorEl={this.state.anchor} open={Boolean(this.state.anchor)}>

                           <List component="nav">
              <ListItem style={{ display: 'flex', justifyContent: 'flex-end' }} >
                <ListItemIcon>
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
                          <ListItem  style={{ marginTop: '10px', whiteSpace: "pre-wrap" }} button >
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
                                  // onClick={this.handleChange.bind(this, o.data)}
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




                            {/* <Modal.Header closeButton></Modal.Header>
                            <Modal.Body></Modal.Body> */}

                     </Popover>
                 
             
                </Modal>
             </div>
         )
    }
 }





//  export default class Modals extends React.Component {
//   constructor(props) {
//      super(props);
//      this.state = {
//          show: false,
//          show1:false,
//          message:'',
//          submitting:false,
//          error:false
       
//      }
//   }
//   handleModal() {
//    this.setState({ show: !this.state.show })
// }
// handleModal1() {
//   this.setState({ show1: !this.state.show1 })
// }

// onHandleChange(event) {
//   const name = event.target.getAttribute('name');
//   this.setState({
//     message: { ...this.state.message, [name]: event.target.value }
//   });
  
// }
// //this.onHandleChange = this.onHandleChange.bind(this);

// onSubmit(event) {
//   event.preventDefault();
//   this.setState({ submitting: true });
//   fetch('https://tumbleweed-penguin-7678.twil.io/oubound-sms', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(this.state.message)
//   })
//     .then(res => res.json())
//     .then(data => {
//       if (data.success) {
//         this.setState({
//           error: false,
//           submitting: false,
//           message: {
//             to: '',
//             body: ''
//           }
//         });
//       } else {
//         this.setState({
//           error: true,
//           submitting: false
//         });
//       }
//     });
// }


//   render() {
//       return (
//          <div>
//               <Button onClick={() => this.handleModal()}>Message</Button>
//               <Modal  show={this.state.show} onHide={() => this.handleModal()}>
//                   <Modal.Header closeButton></Modal.Header>
//                  <Modal.Body>
//                    <h3>{this.state.message}</h3>
//                      <textarea rows='2' placeholder="Type Message" value={this.state.message}
//             onChange={this.onHandleChange.bind(this)} /><br/><br/>
//                      {/* <textarea rows='2' placeholder="Type Message" onChange={(e)=>this.setState(this.handleMessage({message:e.target.value}))} /><br/><br/> */}
//                     {/* // <input value={this.state.message} onChange={this.handleMessage} /> */}
//                      <Button onSubmit={this.onSubmit.bind(this)}>SEND</Button>
//                      <Button className="btn" onClick={() => this.handleModal1()}>CANNED RESPONSE</Button>
//                      </Modal.Body>
//                      <Modal className="modal-show" show={this.state.show1} onHide={()=>this.handleModal1()} size='md-down' >
//                          <Modal.Header closeButton></Modal.Header>
//                          <Modal.Body></Modal.Body>

//                      </Modal>
              
          
//              </Modal>
//           </div>
//       )
//  }
// }
