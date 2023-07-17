<template>
  <q-carousel
    animated
    v-model="slide"
    navigation
    infinite
    :autoplay="autoplay"
    arrows
    transition-prev="slide-right"
    transition-next="slide-left"
    @mouseenter="autoplay = false"
    @mouseleave="autoplay = true"
  >
    <q-carousel-slide
      :name="1"
      img-src="http://localhost/backdbase/pic/stu1.jpg"
    />
    <q-carousel-slide
      :name="2"
      img-src="http://localhost/backdbase/pic/stu2.jpg"
    />
    <q-carousel-slide
      :name="3"
      img-src="http://localhost/backdbase/pic/stu3.jpg"
    />
    <q-carousel-slide
      :name="4"
      img-src="http://localhost/backdbase/pic/stu4.jpg"
    />
  </q-carousel>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      slide: ref(1),
      autoplay: ref(true),
    };
  },
};
</script>
