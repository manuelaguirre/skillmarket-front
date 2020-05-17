<template>
    <div id=card-container class="p-2 flex-none flex bg-blue-200 rounded overflow-hidden border-2">
        <div id="img-container" class="w-8 flex-shrink-0">
            <img :src="this.img" alt="" srcset="" class="w-24">
        </div>
        <div id="info-container">
            <h2 class="user-summary-name text-3xl font-bold mb-2 flex-shrink">{{ this.name }}</h2>
            <h3 class="matching-attributes">
                You have a matching number of <strong>{{ this.number }}</strong> 
                </h3>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'UserSummaryCard',
    props: {
        img: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: 'Name'
        },
        number: {
            type: Number,
            default: 0
        },
        
    },
    
        
};
</script>

<style lang="scss" scoped>

</style>