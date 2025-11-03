<template>
  <div @article_added="console.log('second event')" class="">

    <articlecomponents ></articlecomponents>

  </div>

</template>

<script>

  import articlecomponents from "@/components/HomeComponent.vue"; 

  export default {

    components: {articlecomponents},
   

    data(){
      return{
        add:false,
      }
    }
  }
</script>
