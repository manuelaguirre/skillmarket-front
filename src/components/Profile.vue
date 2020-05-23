<template>
<div id="profile-container" class="flex">
	<div id="info-wrapper" class="w-1/3">
		<div id="image-container" class="rounded-md overflow-hidden w-48 mx-auto mb-2">
			<img :src="userData.imageUrl" alt="" srcset="">
		</div>
		<div id="name" class="text-3xl font-bold">
			<h1>{{ userData.name }}</h1>
		</div>
		<div id="bio">{{ userData.bio }}</div>
	</div>
	<div id="dashboard-container" class="">
		<div id="expertises-container" class="">
			<h2 class="text-lg font-bold">Expertise</h2>
			<ul class="m-2">
				<li v-for="item in userData.expertises" :key="item">
					{{ item }}
				</li>
			</ul>
		</div>
		<div id="skillwishes-container">
			<h2 class="text-lg font-bold">Wants to learn:</h2>
			<ul class="m-2">
				<li v-for="item in userData.interests" :key="item">
					{{ item }}
				</li>
			</ul>
		</div>
	</div>
</div>

</template>

<script>
import axios from 'axios';
export default {
    name:'Profile',
    props:{},
    data() {
        return {
            userData: {
                name:'pipi',
                birthDate: '',
                bio:'',
                email:'',
                location: {
                    latitude:	'-37.3159',
                    longitude:	'81.1496'
                },
                interests: [],
                expertises: undefined,
                imageUrl: undefined,
            },
            userId: this.$route.params.id
        };
    },
    created () {
        this.displayUser();
    },
    methods: {
        async getUser() {
            const response = await axios.get('http://localhost:3000/users/profile', {
                credentials: 'include',
            });
            return response.data;
        },
        async displayUser() {
            const user = await this.getUser();
            this.userData = {...user};
        }
    },
};
</script>

<style lang="scss" scoped>

</style>
