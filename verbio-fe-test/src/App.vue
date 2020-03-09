<template>
  <div id="app">
    <div id="fake-nav"></div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1200px;
  margin: 0 auto;
}
#fake-nav {
  height: 80px;
}
#nav {
  height: 80px;
  padding: 25px;
  box-shadow: 2px 5px 3px white;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  background: white;
}
#nav img {
  max-width: 80%;
  max-height: 25px;
  object-fit: contain;
}
#nav .logout {
  font-weight: bold;
  color: #2c3e50;
  position: absolute;
  right: 30px;
  cursor: pointer;
}

#nav a:hover {
  color: #42b983;
}

p {
  margin-bottom: 0 !important;
}

input,
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  box-shadow: 0 0 0 30px white inset !important;
}
</style>
