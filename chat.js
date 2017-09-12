

//Make connection
var socket=io.connect('http://localhost:3000');

//Query DOM by Javascript
var message=document.getElementById('message');
var handle=document.getElementById('handle');
var btn=document.getElementById('send');
var output=document.getElementById('output');
var feedback=document.getElementById('feedback');
const API='trnsl.1.1.20170405T092712Z.e48fa449274ed9b4.04dfcd34fa494406f22b7cda162fe5fa49845913';
const ROOT=`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API}`;
//console.log(message);
var translate='lol';


//on button send click
//Emit events









btn.addEventListener('click',()=>{

var text=message.value;
const url=`${ROOT}&text=${text}&lang=en-de`;

axios.get(url)
.then((response)=>{
  console.log(response);

  translate=response.data.text[0];
  var x=message.value;
  console.log("x : "+x);

  //message.value=translate;
    if(message.value==="")
    {
      alert("Too lazy to type values ?");
    }
    else {

  socket.emit('chat',{


      message:translate,
      handle:handle.value
    });
  }

    console.log(message.value);


  console.log(translate);


})
.catch((err)=>
{
  console.log(err);
});

});





socket.on('chat',function(data){
  console.log('handle: '+data.handle);
  console.log('message: '+data.message);

feedback.innerHTML="";
output.innerHTML+='<p><strong>'+data.handle+' : </strong><h2 align="right">'+translate+'</h2></p>';

});


message.addEventListener('keypress',()=>
{
  socket.emit('typing',handle.value);
});

//Listen for events
socket.on('typing',function(data)
{
feedback.innerHTML=`<p style="font-size:20px;color:gray"><em>${data} is typing a message...</em></p>`;

})
;
