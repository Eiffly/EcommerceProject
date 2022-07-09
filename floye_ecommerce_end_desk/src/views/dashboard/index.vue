<template>
  <div class="dashboard-container">
    <Card />
    <Sale />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "./Card";
import Sale from "./Sale";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  components: {
    Card,
    Sale,
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
