<template>
  <div id="app">
    <div>

    </div>

    <div class="fenlei">
      <h1>精选专辑</h1>
      <div class="fenlei1">
        <div @click="fn('one')">
          <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1828635773,2025381406&fm=26&gp=0.jpg">
        </div>
        <div @click="fn('two')">
          <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1828635773,2025381406&fm=26&gp=0.jpg">
        </div>
        <div @click="fn('three')">
          <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1828635773,2025381406&fm=26&gp=0.jpg">
        </div>
        <div @click="fn('four')">
          <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1828635773,2025381406&fm=26&gp=0.jpg">
        </div>

      </div>
      <h2>将相机的精彩聚集在自己手中</h2>
      <components :is="conent"></components>
    </div>


  </div>
</template>
<script>
  import one from "@/components/one.vue"
  import two from "@/components/two.vue"
  import three from "@/components/three.vue"
  import four from "@/components/four.vue"

  export default {
    data() {
      return {
        conent: one,
        one: true,
        two: false,
        three: false,
        four: false
      }
    },
    methods: {
      fn(arg) {
        this.conent = arg
      }
    },
    filters: {

    },
    components: {
      four, one, two, three
    }
  }
</script>
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
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

  .fenlei {
    text-align: center;
  }

  .fenlei1 {
    display: flex;
    justify-content: center;
    margin: 50px 0;
  }

  .fenlei1 img {
    border-radius: 10px;
    width: 200px;
    height: 100px;
    margin: 0 10px;
  }
</style>