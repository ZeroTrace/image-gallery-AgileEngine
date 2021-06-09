<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {getToken} from "@/api/auth";

export default {
  name: 'App',
  created() {
    getToken()
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#main {
  display: flex;
  flex-direction: column;
}

button {
  cursor: pointer;
  padding: 8px 16px;
  color: white;
  background-color: #42b983;
  border: none;
  border-radius: 5px;
}

.container-fluid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
