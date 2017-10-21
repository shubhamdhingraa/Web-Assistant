var sl1=12.8230346;
var sl2= 80.0437919;
$(document).ready(()=>{

$('#search').on('submit',(e)=>{
var output='';
var searchJs=$('#searchBox').val();
console.log("you searched for "+searchJs);


//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCVJmrU7SX8Qf24SDRywti3-N8_EYAPdIU
var APIk="AIzaSyDDDjZQteROifaLcqe_s51bUgfjEQxWKIg";

//var url="https://maps.googleapis.com/maps/api/geocode/json?address="+searchJs+"&key="+API;
//axios.get(url)
axios.get("https://maps.googleapis.com/maps/api/geocode/json",{

  params:{
    address:searchJs,
    key:APIk
  }

})

// API key  AIzaSyCVJmrU7SX8Qf24SDRywti3-N8_EYAPdIU
.then((response)=>{
console.log('GM');
console.log(response);
console.log('GM');


output=output+`

  <h3>Address : ${response.data.results[0].formatted_address}</h3>
  <ul class="list-group">
  <li class="list-group-item"><h5>Latitude : ${response.data.results[0].geometry.location.lat}   </h5></li>
  <li class="list-group-item"><h5>Latitude : ${response.data.results[0].geometry.location.lng}   </h5></li>
</ul>
    `

 var sl11=response.data.results[0].geometry.location.lat;
var sl22=response.data.results[0].geometry.location.lng;
console.log("lol");
sl1=parseFloat(sl11);
sl2=parseFloat(sl22);
console.log(sl1);
console.log(sl2);
var ac=response.data.results[0].address_components;
var aco='<ul class="list-group">';
for(var i=0;i<ac.length;i++)
{
  aco+=`
    <li class="list-group-item"></h5>${ac[i].types[0]} : ${ac[i].long_name}</h5></li>
  `;
}


aco+='</ul>';

var city=response.data.results[0].address_components[1];
console.log(response.data.results[0].address_components[1]);
//$('#details').html(output);






output+=aco;


var API='89c02c28a31b133160cee5c25ed82a6e';
  axios.get("http://api.openweathermap.org/data/2.5/weather?appid="+API+"&q="+searchJs)



    .then((response)=>{
        console.log(response);
        let details=response.data.main;


          //output=`<h3>Temperature in ${response.data.name} is ${temp}</h3>`;


          //let temp=response.data.main.temp;
          let details2=response.data;
            console.log(response.data.main.temp);

            //output=`<h3>Temperature in ${response.data.name} is ${temp}</h3>`;


                output +=`
                  <h3>Weather Information :</h3>
                <ul class="list-group">

                  <li class="list-group-item"><h5>Temperature : ${details.temp} K  </h5></li>

                  <li class="list-group-item"><h5>Pressure : ${details.pressure}</h5></li>
                  <li class="list-group-item"><h5>Humidity : ${details.humidity}</h5></li>

    </ul>
                    `

    $('#details').html(output);
  //  $('#details2').html(aco);




    })

  .catch((err)=>
  {
    console.log(err);
  });


initMap();

e.preventDefault();













})


.catch((err)=>{
console.log(err);

})


  e.preventDefault();






});


















//Second part



$('#search1').on('submit',(e)=>{
var output='';
var searchLat=$('#searchLat').val();
var searchLong=$('#searchLong').val();
sl1=parseFloat(searchLat);
sl2=parseFloat(searchLong);
console.log(sl1);
console.log(sl2);
console.log("you searched for "+searchLat);
console.log("you searched for "+searchLong);
var co=searchLat+','+searchLong;
console.log(co);
var APIk="AIzaSyBV_8IPaCBKw4WEBg3wnloc5D09B371p_g";
axios.get("https://maps.googleapis.com/maps/api/geocode/json",{

params:
{
latlng:co,
key:APIk

}


})

.then((response)=>{

console.log(response);







output=output+`

  <h3>Address : ${response.data.results[0].formatted_address}</h3>
  <ul class="list-group">
  <li class="list-group-item"><h5>Latitude : ${response.data.results[0].geometry.location.lat}   </h5></li>
  <li class="list-group-item"><h5>Latitude : ${response.data.results[0].geometry.location.lng}   </h5></li>
</ul>
    `
console.log(response.data.results[0].formatted_address);
var city=response.data.results[0].address_components[1].long_name;
console.log(city);
console.log(response.data.results[0].address_components[1].long_name);
//$('#details').html(output);



var ac=response.data.results[0].address_components;
var aco='<ul class="list-group">';
for(var i=0;i<ac.length;i++)
{
  aco+=`
    <li class="list-group-item"></h5>${ac[i].types[0]} : ${ac[i].long_name}</h5></li>
  `;
}


aco+='</ul>';

output=output+aco;




var API='89c02c28a31b133160cee5c25ed82a6e';
  axios.get("http://api.openweathermap.org/data/2.5/weather?appid="+API+"&q="+city)



    .then((response)=>{
        console.log(response);
        let details=response.data.main;


          //output=`<h3>Temperature in ${response.data.name} is ${temp}</h3>`;


          //let temp=response.data.main.temp;
          let details2=response.data;
            console.log(response.data.main.temp);

            //output=`<h3>Temperature in ${response.data.name} is ${temp}</h3>`;


                output +=`
                  <h3>Weather Information :</h3>
                <ul class="list-group">

                  <li class="list-group-item"><h5>Temperature : ${details.temp} K  </h5></li>

                  <li class="list-group-item"><h5>Pressure : ${details.pressure}</h5></li>
                  <li class="list-group-item"><h5>Humidity : ${details.humidity}</h5></li>

    </ul>
                    `


    $('#details').html(output);




    })

  .catch((err)=>
  {
    console.log(err);
  });


e.preventDefault();






















})

.catch((err)=>{

  console.log(err);
})















initMap();



//  e.preventDefault();







  e.preventDefault();

});













});





function initMap(){
console.log(sl1);
console.log(sl2);
    var options={

      zoom:15,
      center:{
        lat:sl1,
        lng:sl2
      }
    }


var map=new
google.maps.Map(document.getElementById('map'),options);

var marker=new google.maps.Marker({
position:{lat:sl1,lng:sl2},
map:map,
animation:google.maps.Animation.BOUNCE

});







};
