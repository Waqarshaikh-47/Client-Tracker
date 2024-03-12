<template>
    <div class="about-container">
      <div class="container">
        <h1 class="text-center text-light mb-4">About Us</h1>
        
        <div class="row align-items-center">
          <div class="col-md-6">
            <img src="https://via.placeholder.com/400" alt="About Us Image" class="img-fluid rounded">
          </div>
          <div class="col-md-6">
            <p class="text-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra, arcu et posuere eleifend, felis ex consectetur justo, eu tristique nisl ligula vel turpis.
            </p>
            <p class="text-light">
              Quisque volutpat erat non elit auctor, sit amet mollis urna auctor. Nulla facilisi. Curabitur quis orci non enim auctor sollicitudin.
            </p>
            <p class="text-light">
              Donec vitae arcu ac ex laoreet pellentesque. Sed efficitur velit vel tortor finibus lacinia. Aenean et lorem at nisi efficitur sodales.
            </p>
          </div>
        </div>
        
        <div class="row mt-4">
          <div class="col-md-6">
            <h3 class="text-light">Our Mission</h3>
            <p class="text-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra, arcu et posuere eleifend, felis ex consectetur justo, eu tristique nisl ligula vel turpis.
            </p>
          </div>
          <div class="col-md-6">
            <h3 class="text-light">Our Vision</h3>
            <p class="text-light">
              Quisque volutpat erat non elit auctor, sit amet mollis urna auctor. Nulla facilisi. Curabitur quis orci non enim auctor sollicitudin.
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // You can add script setup variables or functions here if needed
  </script>
  
  <style scoped>
  .about-container {
    background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
    padding: 60px 0;
  }
  
  .container {
    color: #fff;
  }
  
  .img-fluid {
    border-radius: 10px;
  }
  
  .text-light {
    color: #f8f9fa !important;
  }
  </style>
  