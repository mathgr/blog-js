<template>
  <div id="app">
    <Header></Header>

    <main role="main" class="container">
      <Home></Home>
    </main>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/modules/Header";
import Footer from "./components/modules/Footer";
import Home from "./components/Home";

export default {
  name: "App",
  components: {
    Home,
    Footer,
    Header
  }
};
</script>
