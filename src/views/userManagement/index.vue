<template>
  
</template>

<script lang="ts" setup>
import { mallGoodsDetailAPI } from "../../api/index";

mallGoodsDetailAPI({}).then((res: any) => {
     console.log(res, "res");
});

</script>

<style lang="scss" scoped>

</style>