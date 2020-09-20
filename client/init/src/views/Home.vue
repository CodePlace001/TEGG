<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <router-link to="/about">666</router-link>
	 -->
	 
	 <button @click="fn">xxx</button>
  </div>
</template>

<script>


export default {
  name: 'Home',
  components: {
    
  },
  methods:{
	  fn(){
		  
		  
		  this.$router.push("/about")
		  // console.log(this.$x)
	  }
  }
}
</script>
