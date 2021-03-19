<template>
  <div id="app">
    <toast position="top-center" :base-z-index="10000" />
    <ProgressSpinner v-if="$store.state.loadingTrigger" />
    <Menu />
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <transition name="slide" mode="out-in">
            <router-view />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Menu from "./components/menu/Menu.vue";
export default {
  components: { Menu },
};
</script>

<style>
.p-progress-spinner {
  position: fixed !important;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%!important;
  height: 100%!important;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 3000!important;
}
.p-progress-spinner-svg {
  width:80px!important;
  height: 80px!important;
}
</style>
