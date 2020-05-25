<template>
    <div class="h-full flex flex-row flex-wrap overflow-y-scroll">
        <div class="h-full block content-around w-3/5 flex-wrap py-6 overflow-y-scroll">
            <div class="w-full" v-for="userData in matchesData" :key="userData.id">
                <div id="profile-card" class="h-64 flex flex-row border-b border-grey-600 p-4"
                     :class="{ selected: userData.isSelected }"
                     @click.prevent="clickHandler"
                     :data-userid="userData.id">
                    <div id="image-container" class="rounded-md overflow-hidden h-full w-1/3 mx-auto object-cover">
                        <img :src="userData.imageUrl" alt="" srcset="">
                    </div>
                    <div class="w-2/3 overflow-y-scroll text-left ml-6">
                        <div id="info-wrapper" class="w-full mb-3">
                            <div class="flex items-baseline">
                                <span id="name" class="text-3xl font-bold align-baseline mr-5">{{ userData.name }}</span>
                                <span id="age" class="text-2xl align-baseline">{{calculateAge(userData.birthDate)}}</span>
                                <span class="text-xl align-baseline mx-1">·</span>
                                <span id="gender" class="text-xl align-baseline">{{userData.gender}}</span>
                                <span id="email" class="text-right w-full align-baseline">{{userData.email}}</span>
                            </div>
                            <div id="bio">{{ userData.bio }}</div>
                        </div>
                        <div class="flex flex-row items-end">
                            <div id="dashboard-container" class="w-full">
                                <div id="expertises-container" class="">
                                    <h2 class="font-bold">Expertises:</h2>
                                    <ul class="m-2">
                                        <li v-for="item in userData.expertises" :key="item"
                                            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                            {{ item }}
                                        </li>
                                    </ul>
                                </div>
                                <div id="skillwishes-container">
                                    <h2 class="font-bold">Interests:</h2>
                                    <ul class="m-2">
                                        <li v-for="item in userData.interests" :key="item"
                                            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                            {{ item }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div
                                    id="distance"
                                    class="font-extrabold flex-none text-right">
                                {{calculateDistance(mainLocation, toLatLng(userData.location)).toFixed(2)}} Km
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Map class="w-2/5"
             v-bind:main-location="mainLocation"
             v-bind:selected-location="selectedLocation"
             v-bind:secondary-locations="secondaryLocations"
        />
    </div>
</template>

<script>
import axios from 'axios';

import Map from '@/components/Map.vue';
import distance from '../utils/distance';

export default {
    name: 'Profile',
    methods: {
        toLatLng(location) {
            return {
                lat: parseFloat(location.latitude),
                lng: parseFloat(location.longitude),
            };
        },
        calculateDistance(location1, location2) {
            if (!location1 || !location2 ) {
                return;
            }
            return distance(location1, location2);
        },
        calculateAge(birthDate) {
            return new Date(Date.now() - Date.parse(birthDate)).getFullYear() - 1970;
        },
        async getMatches() {
            const response = await axios.get('http://localhost:3000/users/', {
                credentials: 'include',
            });
            response.data.forEach(element => {
                element.isSelected = false;
            });
            return response.data;
        },
        async displayMatches() {
            this.matchesData = await this.getMatches();
            this.secondaryLocations = this.matchesData.map(d => this.toLatLng(d.location));
        },
        async getMainLocation() {
            const response = await axios.get('http://localhost:3000/users/profile', {
                credentials: 'include',
            });
            this.mainLocation = this.toLatLng(response.data.location);
        },
        clickHandler(event) {
            const userID = event.currentTarget.dataset.userid;
            this.deselectAllUsers();
            this.selectUser(userID);
        },
        deselectAllUsers() {
            this.matchesData.forEach(element => {
                element.isSelected = false;
            });
        },
        selectUser(userID) {
            this.matchesData.forEach(element => {
                if (element.id === userID) {
                    element.isSelected = true;
                    this.selectedLocation = this.toLatLng(element.location);
                }
            });
        }
    },
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
    async created() {
        await this.displayMatches();
        await this.getMainLocation();
    }
};
</script>

<style scoped>
.selected{
    background-color: #f2e6dd;
}
</style>
