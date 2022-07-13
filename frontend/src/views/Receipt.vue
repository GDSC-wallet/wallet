import Home from '../views/Home.vue'

<template>

  <vc-donut
    :sections="[{ value: 35 }, { value: 10*2 }, { value: 15-5 }, { value: 35 }]"
    :thickness="100">
  </vc-donut>


</template>

<script>
export default {
  data() {
    return {
      sections: [
        { label: 'Red section', value: 25, color: '#47ede8' },
        { label: 'Green section', value: 50, color: '#a8ffe1' },
        { label: 'Blue section', value: 25, color: '#a3f7ff' }
      ],
      thickness: 100,
    };
  },
  
};
</script>