<template>
    <div class="w-full">
       
        <div class="w-full">
           
           <LoginComponent class="w-full"/>
        </div>
    </div>
</template>
<script>
import LoginComponent from '@/views/auth/LoginView.vue';

export default {
    data() {
        return {
            loading: true,
        }
    },
   
    components: {
        LoginComponent
    }
   
}
</script>
