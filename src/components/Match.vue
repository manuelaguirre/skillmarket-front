<template>
    <div class="flex flex-column">
        <div class="flex content-around w-1/2 flex-wrap p-6">
            <div class="w-64 p-2" v-for="userData in matchesData" :key="userData.id">
                <div id="profile-container" class="max-w-sm rounded overflow-hidden shadow-lg h-full "
                    :class="{ selected: userData.isSelected }"
                    @click.prevent="clickHandler"
                    :data-userid="userData.id">
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
        <div class="flex w-1/2">
            <Map
                    v-bind:main-location="mainLocation"
                    v-bind:selected-location="selectedLocation"
                    v-bind:secondary-locations="secondaryLocations"
            />
        </div>
    </div>

</template>

<script>
import axios from 'axios';

import Map from '@/components/Map.vue';

export default {
    name: 'Profile',
    components: {
        Map,
    },
    props: {},
    data() {
        return {
            selectedLocation: null,
            mainLocation: null,
            secondaryLocations: [],
            matchesData: [],
        };
    },
    async beforeMount() {
        await this.displayMatches();
    },
    async created() {
        await this.displayMatches();
    },
    methods: {
        async getMatches() {
            const response = await axios.get('http://localhost:3000/users/match/20000', {
                credentials: 'include',
            });
            response.data.forEach(element => {
                element.isSelected = false;
            });
            return response.data;
        },
        async displayMatches() {
            this.matchesData = await this.getMatches();
            this.secondaryLocations = this.matchesData.map(d => {
                return {
                    lat: parseFloat(d.location.latitude),
                    lng: parseFloat(d.location.longitude),
                };
            });

            this.mainLocation = {lat:51.5, lng: 0};
            this.selectedLocation = {lat:51.55, lng: -0.0012};
            console.log('Match.vue updating data');
        },
        clickHandler(event) {
            const userID = event.currentTarget.dataset.userid;
            this.deselectAllUsers();
            this.selectUser(userID);
        },
        deselectAllUsers(){
            this.matchesData.forEach(element => {
                element.isSelected = false;
            });
        },
        selectUser(userID) {
            this.matchesData.forEach(element => {
                if (element.id === userID) {
                    element.isSelected = true;
                    this.selectedLocation = {
                        lat: parseFloat(element.location.latitude),
                        lng: parseFloat(element.location.longitude),
                    };
                }
            });
                
            
        }
    }
    
};
</script>

<style scoped>
.selected{
    border-radius: 3px;
    border-color: cadetblue;
}
</style>
