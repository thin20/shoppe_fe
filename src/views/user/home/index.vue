<template>
  <div class="app__container">
    <div class="grid wide">
        <div class="row sm-gutter app__content">
          <div class="home-produce">
          <category-mobile></category-mobile>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryMobile from '@/components/user/category_mobile'
export default {
  name: 'home',
  components: {
    CategoryMobile
  }
}
</script>

<style>

</style>
