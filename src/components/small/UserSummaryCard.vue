<template>

<div class="rounded md:rounded-t-full md:overflow-y-visible shadow m-3 bg-blue-100 border-solid border-black 
flex md:inline w-4/5 md:w-auto">
	<div class="block justify-center md:-mt-8 my-2 w-1/5 md:w-auto">
		<img :src="this.img" class="rounded-md md:rounded-full
		md:border-solid md:border-blue-300 md:border-2 md:-mt-3 w-full">
	</div>
	<div class="text-center px-3 md:pb-6 md:pt-2 flex md:inline-block align">
		<h3 class="text-black text-2xl bold font-sans">{{ this.name }}</h3>
		<p class="mt-2 font-sans font-light text-grey-dark">User Since:</p>
		</div>
		<div class="justify-center pb-3 text-grey-dark  md:flex hidden">
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