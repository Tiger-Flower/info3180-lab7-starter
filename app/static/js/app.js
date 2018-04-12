/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/uploadphoto">Upload Photo <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const uploadphoto = Vue.component('upload-form', {
  template: `
  <div>
  <h1>Upload new File</h1>
    
    <div v-for="error in errorMessages">
        <div class="alert alert-danger" role="alert">
          {{ error }}
        </div>
    </div>
    <div v-if="this.statusMsg == '200OK'" class="alert alert-success" role="alert">
        File successfully uploaded
    </div>
    <form id="uploadForm" method=post enctype=multipart/form-data @submit.prevent="uploadPhoto">
    <div class="form-group">
        <label for="description">Description</label>
        <textarea class="form-control" name="description" id="description" placeholder="Enter description here"></textarea>
    </div>
    <div class="form-group">
        <label for="photo">Photo</label>
        <input name="photo" id="photo" type="file">
    </div>
    <button type=submit class="btn btn-primary" > Upload </button>
    </form>
  </div>
  
  `,
     methods:{
         uploadPhoto: function() {
          let self = this; 
          let uploadForm = document.getElementById('uploadForm');
          let form_data = new FormData(uploadForm);
          
          fetch("/api/upload", 
          {method: 'POST',
          body: form_data,
          headers: { 'X-CSRFToken': token }, 
          credentials: 'same-origin'})
          
          .then(function (response) {
              return response.json();
          }).then(function (jsonResponse) {
              console.log(jsonResponse);
               self.errorMessages = jsonResponse.errors;
               self.statusMsg = jsonResponse.message;
          }).catch(function (error) { 
              console.log(error);
              
          });}
        
        
         
     },
     data:function(){ return{errorMessages:[],statusMsg: ''  }}
    
});




const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

// Define Routes
const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        { path: "/uploadphoto", component: uploadphoto }
        
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});