const testButtonFunction=()=>{
  alert('Thank you for clicking')
}

// connect to the socket

let socket = io();


socket.on('number', (msg) => {
    console.log('Random number: ' + msg);
})

function projectCard(project){
  return `
<div class="col s6 m4">
  <div class="card">
    <div class="card-image">
      <img src="${project.img ? project.img : 'assets/Iceberg_7292.JPG'}">
      <span class="card-title">${project.title}</span>
    </div>
    <div class="card-content">
      <p>${project.info}</p>
    </div>
    <div class="card-action">
      <a href="#">${project.projectID}</a>
    </div>
  </div>
</div>` ;
}

// console.log('test');
$(document).ready(function(){
  console.log('Ready');

  // Fixed typo, side nav menu works now
  // Moved datepicker init to jQuery
  $('.sidenav').sidenav(); 
  $('.modal').modal();
  $('.datepicker').datepicker();

  $('#save-project').click((e) => {
    // Validation TBA
  const data =  {
       projectID: $('#project-id').val(),
       title: $('#project-title').val(),
       info: $('#project-description').val(),
       img: $('#project-image').val(),
  
     }
    //  alert(JSON.stringify(data));
    //   alert("Tada"); 

      var settings = {
        "url": "/projects",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(data),
      };

      $.ajax (settings).done(function(response){
         console.log(response);
        $('#projects-list').append(projectCard(data));
        $('.modal').modal('close');
      });

        $('#project-id').val('');
        $('#project-title').val('');
        $('#project-description').val('');
        $('#project-img').val('');
     

        window.location.reload(true);
    

    });


  //bind the button
  // $('#testButton').click(testButtonFunction)

  //test get call
  // $.get('/test?user_name="Fantastic User"',(result)=>{
  //   console.log(result)
  
  // Add function to output allprojects on cards - for HTML 

 

  // append all projects to project list
  $.get('/projects', (result) => {
    for (let p of result) {

    $('#projects-list').append(projectCard(p));

    };
    console.log(result) 
  
    });

}) 

