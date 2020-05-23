<template>
    <div class="flex content-around flex-wrap p-6">
        <div class="w-64 p-2" v-for="userData in matchesData" :key="userData.id">
            <div id="profile-container" class="max-w-sm rounded overflow-hidden shadow-lg h-full ">
                <div id="image-container" class="rounded-md overflow-hidden w-full mx-auto mb-2">
                    <img :src="userData.imageUrl" alt="" srcset="">
                </div>
                <div id="info-wrapper" class="px-6 py-4">
                    <div id="name" class="text-3xl font-bold">
                        <h1>{{ userData.name }}</h1>
                    </div>
                    <div id="bio">{{ userData.bio }}</div>
                </div>
                <div id="dashboard-container" class="px-6 py-4">
                    <div id="expertises-container" class="">
                        <h2 class="text-lg font-bold">Expertises:</h2>
                        <ul class="m-2">
                            <li v-for="item in userData.expertises" :key="item"
                                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                    <div id="skillwishes-container">
                        <h2 class="text-lg font-bold">Interests:</h2>
                        <ul class="m-2">
                            <li v-for="item in userData.interests" :key="item"
                                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'Profile',
    props: {},
    data() {
        return {
            matchesData: [{
                name: 'pipi',
                birthDate: '',
                bio: '',
                email: '',
                location: {
                    latitude: '-37.3159',
                    longitude: '81.1496'
                },
                interests: [],
                expertises: undefined,
                imageUrl: undefined,
                id: 1234,
            },
            ],
        };
    },
    created() {
        this.displayMatches();
    },
    methods: {
        async getMatches() {
            const response = await axios.get('http://localhost:3000/users/match/20000', {
                credentials: 'include',
            });
            return response.data;
        },
        async displayMatches() {
            const matches = await this.getMatches();
            this.matchesData = matches;
        }
    },
};
</script>

<style lang="scss" scoped>

</style>
