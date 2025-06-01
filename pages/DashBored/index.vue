<template>
    <div>
      <h1 class="text-3xl font-bold text-gray-800 mb-6"> DashBored</h1>
      <p>
        The Main Center 
      </p>
  
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">ALL REQUESTS</h3>
          <p class="text-gray-500">Requests for the displaced </p>
        </div>
  
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Hanging Requests </h3>
          <p class="text-gray-500">Requests awaitiing the review </p>
        </div>
  
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Requests of hanging companies</h3>
          <p class="text-gray-500"> waiting for approval </p>
        </div>    
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: 'default'
  });
  </script>