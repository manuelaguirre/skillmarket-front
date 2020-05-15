<template>
<div id="profile-container" class="flex">
	<div id="info-wrapper" class="w-1/3">
		<div id="image-container" class="rounded-md overflow-hidden w-48 mx-auto mb-2">
			<img :src="userData.img" alt="" srcset="">
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
				<li v-for="item in userData.expertise" :key="item.name">
					{{ item.name }}
				</li>
			</ul>
		</div>
		<div id="skillwishes-container">
			<h2 class="text-lg font-bold">Wants to learn:</h2>
			<ul class="m-2">
				<li v-for="item in userData.interests" :key="item.name">
					{{ item.name }}
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
                username: '',
                name:'pipi',
                bio:'',
                email:'',
                geo: {
                    lat:	'-37.3159',
                    lng:	'81.1496'
                },
                radius: null,
                interests: [],
                expertise: undefined,
                availability: null,
            },
            userId: this.$route.params.id
        };
    },
    created () {
        this.displayUser(this.userId);
    },
    methods: {
        async getUser(id) {
            const result = await axios.get(`https://my-json-server.typicode.com/manuelaguirre/my-json/users/${id}`)
                .then(res => res.data);            
            return result;
        },
        async displayUser(id) {
            const user = await this.getUser(id);
            this.userData = {...user};
        }
    },
};
</script>

<style lang="scss" scoped>

</style>