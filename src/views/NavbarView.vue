<template>
    <div>
        
        <router-view name="one"></router-view>
    </div>
</template>
<script>
export default {
    
    data() {
        return {
            showMobile: false,
            activeLink: ' Formation FBWA' // Default active link
        }
    },
    methods: {
       
        openNav() {
            this.showMobile = true
            // document.body.style.overflow = "hidden";
        },
        closeNav() {
            this.showMobile = false
        }
    },
    mounted() {
        // Any initialization logic can go here
    },
};
</script>