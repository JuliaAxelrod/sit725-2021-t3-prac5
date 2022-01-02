let socket = io();


socket.on('number', (msg) => {
    console.log('Random number: ' + msg);
})

function projectCard(project){
  return `
<div class="col s6 m4 l3 xl2 id="project-id-${project.projectID}">
  <div class="card">
    <div class="card-image">
      <img src="${project.img ? project.img : 'assets/Iceberg_7292.JPG'}">
      <span class="card-title">${project.title}</span>
    </div>
    <div class="card-content">
      <p>${project.info}</p>
    </div>
    <div class="card-action">
    <a class="waves-effect waves-light btn" href="project.html?pid=${project.projectID}">Open</a>
    <a class="waves-effect waves-light red btn" onClick="deleteProject(${project.projectID})"><i class="material-icons">delete</i></a>
    </div>
  </div>
</div>` ;
}

function deleteProject(id) {
  var settings = {
    "url": `/api/projects/${id}`,
    "method": "DELETE",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    $(`#project-id-${id}`).remove();
  });
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function createProject() {
  let img = document.querySelector('#project-file').files[0];;
  if (img) {
    getase64(img).then(
      d => {
        const project =  {
          "projectID": $('#project-id').val(),
          "title": $('#project-title').val(),
          "info": $('#project-description').val(),
          "img": d
      };
      var settings = {
        "url": "/api/projects",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(project),
      };

      $.ajax (settings).done(function(response){
        console.log(response);
       $('#projects-list').append(projectCard(project)); 
       $('#project-id').val('');
       $('#project-title').val('');
       $('#project-info').val('');
       $('#project-description').val('');
       $('.modal').modal('close');
       console.log(response);
    });
  })
}
$(document).ready(function(){
  console.log('Ready');
  $('.sidenav').sidenav(); 
  $('.modal').modal();
  $('.datepicker').datepicker();

  $('#insert-project').click(() => {
    createProject();
  });

  // $('#save-project').click((e) => {
  //   // Validation TBA
  // const data =  {
  //      projectID: $('#project-id').val(),
  //      title: $('#project-title').val(),
  //      info: $('#project-description').val(),
  //      img: $('#project-image').val(),
  
  //    }
  //   //  alert(JSON.stringify(data));
  //   //   alert("Tada"); 

  //     var settings = {
  //       "url": "/projects",
  //       "method": "POST",
  //       "timeout": 0,
  //       "headers": {
  //         "Content-Type": "application/json"
  //       },
  //       "data": JSON.stringify(data),
  //     };

  //     $.ajax (settings).done(function(response){
  //        console.log(response);
  //       $('#projects-list').append(projectCard(data));
  //       $('.modal').modal('close');
  //     });

  //       $('#project-id').val('');
  //       $('#project-title').val('');
  //       $('#project-description').val('');
  //       $('#project-image').val('');
     

  //       window.location.reload(true);
    

  //   });


  //bind the button
  // $('#testButton').click(testButtonFunction)

  //test get call
  // $.get('/test?user_name="Fantastic User"',(result)=>{
  //   console.log(result)
  
  // Add function to output allprojects on cards - for HTML 

 

  // append all projects to project list
  $.get('/api/projects', (result) => {
    for (let p of result) {

    $('#projects-list').append(projectCard(p));

    }
    console.log(result) 
  
    })

}) 

