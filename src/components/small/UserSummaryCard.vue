<template>

<div class="rounded rounded-t-lg overflow-y-visible shadow max-w-xs my-3 bg-blue-100 border-solid border-black">
	<div class="flex justify-center -mt-8">
		<img :src="this.img" class="rounded-full
		border-solid border-silver border-2 -mt-3">
	</div>
	<div class="text-center px-3 pb-6 pt-2">
		<h3 class="text-black text-lg bold font-sans">{{ this.name }}</h3>
		<p class="mt-2 font-sans font-light text-grey-dark">User Since:</p>
		</div>
		<div class="flex justify-center pb-3 text-grey-dark">
			<div class="text-center mx-2 border-r pr-4">
				<h2>{{this.number}}</h2>
				<span>Interests</span>
			</div>
			<div class="text-center mx-2 pr-1">
				<h2>{{this.number - 2}}</h2>
				<span>Expertise</span>
			</div>
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