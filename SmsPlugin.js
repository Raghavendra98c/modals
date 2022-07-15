// import React from 'react';
// import { VERSION } from '@twilio/flex-ui';
// import { FlexPlugin } from '@twilio/flex-plugin';
// //import Modals from "./components/Modal.js";



// const PLUGIN_NAME = 'SmsPlugin';


// export default class SmsPlugin extends FlexPlugin {
  
//   constructor() {
//     super(PLUGIN_NAME);
     
//   } 
//   async init(flex, manager) {
//     //flex.MessageInput.Content.add(<Modals key="sms-plugin" />);
//     flex.MessageInput.Content.add(<button>Mesage</button>);


//   }
  
// }
import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import Modals from "./components/Modal.js";
//import CannedResponses from './components/CannedResponses.jsx';
//import {App} from "./App.js";
//import './index.css';


const PLUGIN_NAME = 'SmsPlugin';

//let nameofcx;
export default class SmsPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);   
  } 

  async init(flex, manager) {
    flex.MessageInput.Content.add(<Modals key="sms-plugin" />);
    //,{
      // if:(props)=>{
      //   let data=props.channel.source.attributes.from
        
      //   let phone_number=data.split(":")[1]
      //   if(data != undefined ){
      
      //     if((data.startsWith("whatsapp") || data.startsWith("viber")) && phone_number.startsWith("+63")){
      //       return true;
      //     }
      //     else{
      //       return false;
      //     }

      //   }
      //  else{
      //       return false;
      //     }
    
      
    //}
   
   // }


    // flex.MessageInput.Content.add(<button key="sms-plugin" onClick={App}>SMS</button>);
    //flex.MessageInput.Content.add(<div key='sms-block'><Modal/></div>)
  
    // flex.Actions.addListener("afterAcceptTask", (payload) => {
    //   nameofcx   =payload.task.attributes.name;
     
    //  flex.MessageInput.Content.replace(<CannedResponses key="canned-responses" agentname={nameofcx}/>);
    //    }
       
    //    );
       
    //  // flex.MessageInput.Content.add(<CannedResponses key="canned-responses" agentname={nameofcx}/>);
    //    console.log(nameofcx,"name of agent ")
      
    //    // flex.MessageInput.Content.replace("textarea", {options});
     
   
    //    // flex.Component.Content.remove(MessageInput, {options});
    //    manager.chatClient.on('channelJoined', (payload) => {
    //      // define a message to send into the channel - alternatively you could look it up here
   
    //      // let body = `Hi! I'm ${manager.workerClient.attributes.full_name} and this is our predefined message.`;
    //      let body   =`Hi, ${manager.workerClient.attributes.full_name}! We’re here to help you with your (insert ticket concern). Before we proceed, we’d just like to share with you our Data Privacy policy:
    //      IMPORTANT: NOTICE FOR CUSTOMERS By replying to this message and providing personal information that will allow us to assist you with your concern, you hereby consent to the processing, monitoring, and recording of personal information provided for use of Philippine Airlines products, services, and promotions, its disclosure or transfer by Philippine Airlines to its affiliates, third-party providers, consistent with applicable laws, rules, and regulations. The processing of your personal information is covered by DATA PRIVACY POLICY of Philippine Airlines and that by replying to this message, you hereby acknowledge that you have read and understood the DATA PRIVACY POLICY of Philippine Airlines.
    //     For the full Data Privacy disclosure, please visit https://bit.ly/PAL-Data-Privacy.`;
      
        
    //     flex.Actions.invokeAction('SendMessage', {
           
    //        channelSid: payload.sid,
    //        body: body
    //      });
    //    });


  }
  
}

