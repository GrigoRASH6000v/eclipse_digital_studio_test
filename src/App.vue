<template>
  <Navigation
    v-model="currentComponent"
    :components="componentsList"
  />
  <main class="main">
    <component :is="componentsList[currentComponent].component" />
  </main>
</template>

<script>
import { markRaw, defineAsyncComponent } from "vue";
import axios from "axios";
import Navigation from "@/components/Navigation.vue";
export default {
  name: "App",
  components: {
    Navigation,
  },
  data() {
    return {
      currentComponent: "1",
      componentsList: {
        1: {
          title: "Список валют",
          component: markRaw(
            defineAsyncComponent(() =>
              import("@/components/ListOfCurrencies.vue")
            )
          ),
        },
        2: {
          title: "Конвертер",
          component: markRaw(
            defineAsyncComponent(() => import("@/components/Сonverter.vue"))
          ),
        },
      },
    };
  },
  methods: {
    
  },

  mounted() {
   
  },
};
</script>

<style lang="scss">
#app {
 
  overflow-y: auto;
  display: grid;
  height: 100vh;
  overflow: hidden;
  grid-template-rows: auto 1fr;
}
.main{
  padding: 20px;
  max-height: 100%;
  overflow-y: auto;
}
</style>
