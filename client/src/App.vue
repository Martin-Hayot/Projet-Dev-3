<template>
  <nav>
    <router-link to="/">Home</router-link> 
    <router-link to="/about">About</router-link> 
    <router-link to="/faq">FAQ</router-link> 
    <router-link to="/contact">Contact</router-link>
    <router-link to="/login">Login</router-link>
  </nav>
  <router-view/>
</template>

<style>
body{
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: center;
  gap: 4em;
}

nav a {
  font-weight: bold;
  color: #fdfdfd;
  font-size: 1.5em;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #ffffff;
}
</style>
