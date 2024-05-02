// import React, { useEffect, useState } from 'react'
// import Navbar from '../../components/Navbar/Navbar'
// import './WatchParty.css'
// import './render'
// // import io from 'socket.io-client';
// import { Notyf } from 'notyf';
// import { useLocation } from 'react-router-dom';
// // // import 'bootstrap'; // Import the entire Bootstrap library
// // // import { Alert, Button, Carousel, Collapse, Dropdown, Modal, Offcanvas, Popover, ScrollSpy, Tab, Toast, Tooltip } from 'bootstrap';
// // import { Tooltip } from 'bootstrap';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // Define the useExternalScript hook
// function useExternalScript(src) {
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = src;
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, [src]);
// }

// // const location = useLocation();


// export default function WatchTogether() {
//   const location = useLocation();
//   // useExternalScript('./render.js');
// //     useEffect(() => {
// //         // Get all elements with the data-toggle="tooltip" attribute
// //         const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
        
// //         // Initialize tooltips for each element
// //         const tooltips = tooltipTriggerList.map(tooltipTriggerEl => {
// //             return new Tooltip(tooltipTriggerEl);
// //         });

// //         // Clean up function to remove the tooltips when the component unmounts
// //         return () => {
// //             tooltips.forEach(tooltip => tooltip.dispose());
// //         };
// //     }, []); // Empty dependency array ensures this effect runs only once

// //     const notyf = new Notyf({ duration: 1500, position: { x: 'center', y: 'top' } })

// //     function randomString(length, chars) {
// //         var result = '';
// //         for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
// //         return result;
// //     }
    
// //     function time(state,username,context){
// //         let hours = parseInt(Math.round(context) / 60 /60, 10);
// //         let minutes = parseInt((context / 60) % 60, 10);
// //         let seconds = Math.round(context) % 60
// //         hours = hours < 10 ? "0" + hours.toString() : hours.toString();
// //         minutes = minutes < 10 ? '0'+ minutes.toString() : minutes.toString()
// //         seconds = seconds < 10 ? '0'+ seconds.toString() : seconds.toString()
// //         let contentString = `${username} ${state} the video at ${minutes}:${seconds}`
// //         if(hours != 0){
// //             contentString = `${username} ${state} the video at ${hours}:${minutes}:${seconds}` 
// //         }
// //         return contentString
// //     }
       
// //     const append = message => {
// //         document.getElementById("messages-box").innerHTML = document.getElementById("messages-box").innerHTML + `<div class="col-12 mt-3" id="message"><span class="username" style="color: ${message.pfp}">${message.name}: </span>${message.content}</div>`
// //     }
    
// //     function appendData(roomName, roomCode){
// //         append({name: "Local Party", content: "Watch Party allows you to watch local videos with your friends synchronously while chatting.", pfp: "#f3dfbf"})
// //         append({name: "Local Party", content: `Welcome to ${roomName}`, pfp: "#f3dfbf"})
// //         append({name: "Local Party", content: `Share the room code (${roomCode}) with others to invite them to the party.`, pfp: "#f3dfbf"})
// //         append({name: "Local Party", content: "They would need to have the same video file with them to join this watch party.", pfp: "#f3dfbf"})
// //         append({name: "Local Party", content: "You can change your username in the settings page.", pfp: "#f3dfbf"})
        
// //     }
    
// //     document.getElementById('roomCodeText').addEventListener('click', ()=>{
// //         let text = document.getElementById('roomCodeText').innerHTML
// //         navigator.clipboard.writeText(text).then(()=>{
// //             notyf.success("Copied to clipboard")
// //         })
// //     })
    
// //     var videoPlayer = document.getElementById("video-player")
// //     let lastcurrentime = 0;
    
// //     const landingPage = document.getElementById("landing")
// //     const profilePage = document.getElementById("profile")
// //     const createPage = document.getElementById("create")
// //     const joinPage = document.getElementById("join")
// //     const roomPage = document.getElementById("room")
// //     const socket = io.connect("https://local-party.herokuapp.com")
    
// //     socket.on('connect', function (socket) {
// //         console.log('Connected to the server!');   
// //         landingPage.style.display = "block" 
// //     });
    
// //     socket.on('user-joined', data => {
// //         if(data.roomCode == localStorage.getItem("roomCode")){
// //             append({
// //                 name: data.name,
// //                 content: `${data.name} just popped into the party.`,
// //                 pfp: data.pfp
// //             })
// //             document.getElementById("pplinparty").setAttribute("title", `People in party: ${data.members}`)
// //             var toolTipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
// //             toolTipTriggerList.map(function (tooltipTriggerE1){
// //                 return new bootstrap.Tooltip(tooltipTriggerE1)
// //                 });
// //             document.getElementById("messages-box").scrollTop = document.getElementById("messages-box").scrollHeight
// //         }
// //     })
    
// //     socket.on('updateMemberInfo', data => {
// //         if(data.roomCode == localStorage.getItem("roomCode")){
// //             document.getElementById("pplinparty").setAttribute("title", `People in party: ${data.members}`)
// //             var toolTipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
// //             toolTipTriggerList.map(function (tooltipTriggerE1){
// //                 return new bootstrap.Tooltip(tooltipTriggerE1)
// //             });
// //         }
// //     })
    
// //     socket.on('receive', data => {
// //         append({
// //             name: data.name,
// //             content: data.message,
// //             pfp: data.pfp
// //         })
// //         document.getElementById("messages-box").scrollTop = document.getElementById("messages-box").scrollHeight
// //     })
    
// //     socket.on('left', data => {
// //         append({
// //             name: 'Local Party',
// //             content: `${data.name} left the party.`,
// //             pfp: '#f3dfbf',
// //         })
// //         document.getElementById("pplinparty").setAttribute("title", `People in party: ${data.members}`)
// //         var toolTipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
// //         var toolTipList = toolTipTriggerList.map(function (tooltipTriggerE1){
// //             return new bootstrap.Tooltip(tooltipTriggerE1)
// //             });
// //         document.getElementById("messages-box").scrollTop = document.getElementById("messages-box").scrollHeight
// //     })
    
// //     socket.on('leftdefault', data => {
// //         append({
// //             name: 'Local Party',
// //             content: `${data.name} left the party.`,
// //             pfp: '#f3dfbf',
// //         })
// //         document.getElementById("pplinparty").setAttribute("title", `People in party: ${data.members}`)
// //         var toolTipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
// //         var toolTipList = toolTipTriggerList.map(function (tooltipTriggerE1){
// //             return new bootstrap.Tooltip(tooltipTriggerE1)
// //             });
// //         document.getElementById("messages-box").scrollTop = document.getElementById("messages-box").scrollHeight
// //     })
    
    
// //     socket.on('playerControlUpdate', data => {
// //         if(data.message == "play") {
// //             console.log(data)
// //             videoPlayer.currentTime = data.context
// //             allowEmit = false;
// //             videoPlayer.play()
// //             let content = time("played", data.username, data.context)
// //             append({
// //                 name: "Local Party", 
// //                 content: content,
// //                 pfp: "#f3dfbf"
// //             })
// //             document.getElementById("messages-box").scrollTop = document.getElementById("messages-box").scrollHeight
// //         }
// //         if(data.message == "pause") {
// //             console.log(data)
// //             videoPlayer.currentTime = data.context
// //             allowEmit = false;
// //             videoPlayer.pause()
// //             let content = time("paused", data.username, data.context)
// //             append({
// //                 name: "Local Party", 
// //                 content: content,
// //                 pfp: "#f3dfbf"
// //             })
// //             document.getElementById("messages-box").scrollTop = document.getElementById("messages-box").scrollHeight
// //         }
// //     })
    
// //     if(localStorage.getItem("username") == null) {
// //         localStorage.setItem("username", "unknown")
// //     }
    
// //     const colors = ['#F26E5C', '#FCE060', '#63E683', '#6085FC', '#F52C93','#00FFFF','#800080','#006400','#FF8C00','#4B0082']
    
// //     function random_item(items) {
// //         return items[Math.floor(Math.random() * items.length)];
// //     }
    
// //     const color = random_item(colors)
    
// //     if(localStorage.getItem("pfpUrl") == null) {
// //         localStorage.setItem("pfpUrl", color)
// //     }
    
// //     document.addEventListener("click", function (e) {
// //         if(e.target.id == "createRoomButton") {
// //             landingPage.style.display = "none"
// //             createPage.style.display = "block"
// //         }
// //         if(e.target.id == "roomCreateButton") {
// //             const roomName = document.getElementById("roomname").value
// //             if(roomName.length == 0) {
// //                 console.log("error")
// //                 document.getElementById("createRoomText").innerHTML = "Please fill in all the fields"
// //             } else {
// //                 if(localStorage.getItem("videoPath") == null || localStorage.getItem("videoSize") == null || document.getElementById("create-username").value.length == 0) {
// //                     document.getElementById("createRoomText").innerHTML = "Please fill in all the fields"
// //                 } else {
// //                     localStorage.setItem("roomName", roomName)
// //                     localStorage.setItem("username", document.getElementById("create-username").value)
// //                     const roomCode = randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
// //                     document.getElementById("createRoomText").innerHTML = ""
// //                     document.getElementById("roomNameText").innerHTML = roomName
// //                     document.getElementById("roomCodeText").innerHTML = roomCode
// //                     videoPlayer.setAttribute("src", localStorage.getItem("videoPath"))
// //                     var myHeaders = new Headers();
// //                     myHeaders.append("Content-Type", "application/json");
    
// //                     var raw = JSON.stringify({
// //                         "roomName": roomName,
// //                         "roomCode": roomCode,
// //                         "videoSize": localStorage.getItem("videoSize")
// //                     });
    
// //                     var requestOptions = {
// //                         method: 'POST',
// //                         headers: myHeaders,
// //                         body: raw,
// //                         redirect: 'follow'
// //                     };
    
// //                     fetch("https://local-party.herokuapp.com/room/create", requestOptions)
// //                     .then( async (result) => {
// //                         const resp = await result.json()
// //                         if(resp.message == "success") {
// //                             var toolTipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
// //                             var toolTipList = toolTipTriggerList.map(function (tooltipTriggerE1){
// //                                 return new bootstrap.Tooltip(tooltipTriggerE1)
// //                             });
// //                             localStorage.setItem("roomCode", roomCode)
// //                             appendData(roomName, roomCode)
// //                             socket.emit('new-user-joined', { name: localStorage.getItem("username"), roomCode: roomCode, pfp: localStorage.getItem("pfpUrl") })
// //                             createPage.style.display = "none"
// //                             document.title = `Local Party | ${roomName}`
// //                             roomPage.style.display = "block"
// //                         }
// //                     })
// //                     .catch(error => console.log('error', error));
// //                 }
// //             }
// //         }
// //         if(e.target.id == "joinRoomButton") {
// //             landingPage.style.display = "none"
// //             joinPage.style.display = "block"
// //         }
// //         if(e.target.id == "roomJoinButton") {
// //             const inputRoomCode = document.getElementById("roomCode").value
// //             if(inputRoomCode.length == 0) {
// //                 document.getElementById("joinRoomText").innerHTML = "Please fill in all the fields"
// //             } else {
// //                 if(localStorage.getItem("videoPath") == null || localStorage.getItem("videoSize") == null || document.getElementById("join-username").value.length == 0) {
// //                     document.getElementById("joinRoomText").innerHTML = "Please fill in all the fields"
// //                 } else {
// //                     var myHeaders = new Headers();
// //                     myHeaders.append("Content-Type", "application/json");
    
// //                     var raw = JSON.stringify({
// //                         "roomCode": inputRoomCode,
// //                         "videoSize": localStorage.getItem("videoSize")
// //                     });
    
// //                     var requestOptions = {
// //                         method: 'POST',
// //                         headers: myHeaders,
// //                         body: raw,
// //                         redirect: 'follow'
// //                     };
    
// //                     fetch("https://local-party.herokuapp.com/room/join", requestOptions)
// //                     .then( async (result) => {
// //                         const resp = await result.json()
// //                         if(resp.message != "success") {
// //                             document.getElementById("joinRoomText").innerHTML = resp.message
// //                         } else {
// //                             document.getElementById("joinRoomText").innerHTML = ""
// //                             document.getElementById("roomNameText").innerHTML = resp.roomName 
// //                             document.getElementById("roomCodeText").innerHTML = resp.roomCode
// //                             var toolTipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
// //                             var toolTipList = toolTipTriggerList.map(function (tooltipTriggerE1){
// //                                 return new bootstrap.Tooltip(tooltipTriggerE1)
// //                             });
// //                             localStorage.setItem("roomCode", inputRoomCode)
// //                             localStorage.setItem("username", document.getElementById("join-username").value)
// //                             videoPlayer.setAttribute("src", localStorage.getItem("videoPath"))
// //                             appendData(resp.roomName, resp.roomCode)
// //                             socket.emit('new-user-joined', { name: localStorage.getItem("username"), roomCode: resp.roomCode, pfp: localStorage.getItem("pfpUrl") })
// //                             joinPage.style.display = "none"
// //                             document.title = `Local Party | ${resp.roomName}`
// //                             roomPage.style.display = "block"
// //                         }   
// //                     })
// //                     .catch(error => console.log('error', error));
// //                 }
// //             }
// //         }
    
// //         if(e.target.id == "roomLeaveButton") {
// //             videoPlayer.setAttribute("src", "C:\Users\anshu\Desktop\Anshul\Projects\local-party\src\test.mp4")
// //             socket.emit('disconnectUser', { roomCode: localStorage.getItem("roomCode"), name: localStorage.getItem("username") , pfp: localStorage.getItem("pfpUrl") })
// //             location.reload()
// //         }
// //         if(e.target.id == "backButton") {
// //             joinPage.style.display = "none"
// //             createPage.style.display = "none"
// //             landingPage.style.display = "block"
// //         }
// //     })
    
// //     const form = document.getElementById("send-form")
    
// //     form.addEventListener('submit', (e) => {
// //         e.preventDefault()
// //         const messageInput = document.getElementById("messageInp").value
// //         if(messageInput.split(" ").join("").length != 0) {
// //             socket.emit('send', messageInput)
// //             append({
// //                 name: localStorage.getItem("username"),
// //                 content: messageInput,
// //                 pfp: localStorage.getItem("pfpUrl")
// //             })
// //             document.getElementById("messageInp").value = ""
// //             document.getElementById("messages-box").scrollTop = document.getElementById("messages-box").scrollHeight
// //         }
// //     })
    
// //     let allowEmit = true;
    
// //     videoPlayer.addEventListener('play', videoControlsHandler, false);
// //     videoPlayer.addEventListener('pause', videoControlsHandler, false);
// //     videoPlayer.addEventListener('d', videoControlsHandler, false);
    
// //     function videoControlsHandler(e) {
// //         if (e.type == 'play') {
// //             if(allowEmit == true){
// //                 socket.emit("playerControl", {message: "play", context: videoPlayer.currentTime, roomCode: localStorage.getItem("roomCode")}) 
// //                 let content = time("played","You", videoPlayer.currentTime)
// //                 append({
// //                     name: "Local Party", 
// //                     content: content,
// //                     pfp: "#f3dfbf"
// //                 })
// //                 document.getElementById("messages-box").scrollTop = document.getElementById("messages-box").scrollHeight
// //             } 
// //             setTimeout(() => {
// //                 allowEmit = true
// //             }, 500);
// //         } else if (e.type == 'pause') {
// //             if(allowEmit == true){
// //                 socket.emit("playerControl", {message: "pause", context: videoPlayer.currentTime, roomCode: localStorage.getItem("roomCode")})
// //                 let content = time("paused","You", videoPlayer.currentTime)
// //                 append({
// //                     name: "Local Party", 
// //                     content: content,
// //                     pfp: "#f3dfbf"
// //                 })
// //                 document.getElementById("messages-box").scrollTop = document.getElementById("messages-box").scrollHeight
// //             }
// //             setTimeout(() => {
// //                 allowEmit = true
// //             }, 500);
// //         }
// //     }
    
// //     function onChangeFile() {
// //         const file = document.getElementById("file-id").files[0]
// //         const path = (window.URL || window.webkitURL).createObjectURL(file)
// //         const size = file.size
// //         localStorage.setItem("videoSize", size)
// //         localStorage.setItem("videoPath", path)
// //     }
    
// //     function onChangeJoinFile() {
// //         const file = document.getElementById("join-file-id").files[0]
// //         const path = (window.URL || window.webkitURL).createObjectURL(file)
// //         const size = file.size
// //         localStorage.setItem("videoSize", size)
// //         localStorage.setItem("videoPath", path)
// //     }
    


//     return (
//     <div>
//         <Navbar />
//       <div>
//         <meta charSet="UTF-8" />
//         <title>Watch Party</title>
//         <link href="https://vjs.zencdn.net/7.10.2/video-js.css" rel="stylesheet" />
//         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/inter-ui@3.15.1/inter.min.css" />
//         {/* Bootstrap */}
//         <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossOrigin="anonymous" />
//         {/* Fonts */}
//         <link rel="preconnect" href="https://fonts.gstatic.com" />
//         <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca&display=swap" rel="stylesheet" />
//         {/* Icons */}
//         <link rel="shortcut icon" href="icon.png" />
//         {/* Notyf */}
//         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css" />
//         <link rel="stylesheet" href="index.css" />
//         {/* Landing Page */}
//         <div className="landing" id="landing">
//           <div className="container-fluid main">
//             <div className="row">
//               <div className="col-12 logo text-center">
//                 <img src="icon.png" width="300px" alt="Logo" />
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-12 text-center">
//                 <h1 className="head">
//                   Watch Party
//                 </h1>
//               </div>
//               <div className="col-12 text-center mt-4">
//                 <button className="buttons" id="createRoomButton">
//                   Create Room
//                 </button>
//               </div>
//               <div className="col-12 mt-4 text-center">
//                 <button className="buttons" id="joinRoomButton">
//                   Join Room
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Create Page */}
//         <div className="create" id="create">
//           <div className="container-fluid">
//             <div className="row mt-3">
//               <div className="col-1 text-center">
//                 <i className="fas fa-arrow-left back-btn" id="backButton" />
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-12 text-center create-col">
//                 <h1 className="create-head">
//                   Create Room
//                 </h1>
//               </div>
//               <div className="col-12 text-center mt-2">
//                 <p id="createRoomText" />
//                 <div>
//                   <div className="mt-1 mb-1">
//                     <input className type="text" name="username" id="create-username" placeholder="username" autoComplete="off" required />
//                   </div>
//                   <div className="mt-3">
//                     <input className type="text" name="roomname" id="roomname" placeholder="room name" autoComplete="off" required />
//                   </div>
//                   <div className="mt-4">
//                     <input type="file" className="form-control fileInput" id="file-id" onchange="onChangeFile();" />
//                     <br />
//                     <p id="filePathText" />
//                   </div>
//                 </div>
//                 <div className="mt-4">
//                   <button className="buttons" style={{width: '10rem'}} id="roomCreateButton">
//                     Create
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Join Page */}
//         <div className="join" id="join">
//           <div className="container-fluid">
//             <div className="row mt-3">
//               <div className="col-1 text-center">
//                 <i className="fas fa-arrow-left back-btn" id="backButton" />
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-12 text-center join-col">
//                 <h1 className="create-head">
//                   Join Room
//                 </h1>
//               </div>
//               <div className="col-12 text-center mt-3">
//                 <p id="joinRoomText" />
//                 <div className="mt-1 mb-1">
//                   <input className type="text" name="username" id="join-username" placeholder="username" autoComplete="off" required />
//                 </div>
//                 <div className="mt-3">
//                   <input className type="text" name="roomCode" id="roomCode" placeholder="room code" autoComplete="off" required />
//                 </div>
//                 <div className="mt-4">
//                   <input type="file" className="form-control fileInput" id="join-file-id" onchange="onChangeJoinFile();" />
//                   <br />
//                   <p id="filePathText" />
//                 </div>
//                 <div className="mt-4">
//                   <button className="buttons" style={{width: '10rem'}} id="roomJoinButton">
//                     Join
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Room Page */}
//         <div className="room" id="room">
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-9 left-side">
//                 <div className="video video-player-conatiner">
//                   <video id="video-player" className="video-js vjs-big-play-centered" controls preload="metadata" data-setup="{}">
//                     <source id="videoSrc" src="test.mp4" type="video/mp4" />
//                   </video>
//                 </div>
//                 {/* <img src="loading.gif" alt="loader" id="loader"/> */}
//               </div>
//               <div className="col-3 right-side">
//                 <div className="row mt-3">
//                   <div className="col-12 text-center">
//                     <h6 className="room-code" id="roomNameText">Room Name</h6>
//                   </div>
//                 </div>
//                 <hr className="mt-1" style={{height: '0.1rem', width: '90%', backgroundColor: 'white', margin: 'auto'}} />
//                 <div className="row mt-3">
//                   <div className="col-12">
//                     <div className="row">
//                       <div className="col-2 text-center" data-toggle="tooltip" data-placement="bottom" title="Leave Party">
//                         <i className="fas fa-sign-out-alt icon" id="roomLeaveButton" />
//                       </div>
//                       <div className="col-8 text-center">
//                         <h6 className="room-code" data-toggle="tooltip" data-placement="left" title="Room Code" id="roomCodeText">1234</h6>
//                       </div>
//                       <div className="col-2 text-center">
//                         <h6 id="pplinparty" className="members" data-toggle="tooltip" data-placement="left" title="People in party: 1">
//                           <i className="fas fa-user-friends" />
//                         </h6>
//                       </div>
//                     </div>
//                     <div className="row mt-2 mb-2 messages" id="messages-box">
//                     </div>
//                     <div className="row">
//                       <div className="col-12">
//                         <div className="row justify-content-center chattimg">
//                           <form action="#" id="send-form">
//                             <div className="col-12">
//                               <input autoComplete="off" className="form-control" type="text" name="messageInp" id="messageInp" placeholder="Message" />
//                             </div>
//                           </form>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     )
// }
