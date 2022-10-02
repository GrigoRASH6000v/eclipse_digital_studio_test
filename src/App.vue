<template>
  <Navigation
    v-model="currentComponent"
    :components="componentsList"
  />
  <main class="main">
    <component :is="getCurrentComponent" />
  </main>
</template>

<script>
import { markRaw, defineAsyncComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import Navigation from "@/components/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation,
  },
  setup() {
    const store = useStore();
    let currentComponent = ref("1");
    const componentsList = {
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
    };
    const getCurrentComponent = computed(
      () => componentsList[currentComponent.value].component
    );
    store.dispatch("getListOfCurrencies");
    return {
      currentComponent,
      getCurrentComponent,
      componentsList,
    };
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
.main {
  padding: 20px;
  max-height: 100%;
  overflow-y: auto;
}
</style>
