<template>
  <div id="app">
	<div>
		<!-- <button>home</button> -->
		<!-- <button>about</button> -->
		<!-- <a href="http://192.168.3.113:8080/">home</a> &nbsp; 
		<a href="http://192.168.3.113:8080/about">about</a> -->
		
		<!-- <a href="/">home</a> &nbsp;
		<a href="/about">about</a> -->
		
		<router-link to="/">home</router-link>&nbsp; 
		<router-link to="/about">about</router-link>
	</div>
  
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
