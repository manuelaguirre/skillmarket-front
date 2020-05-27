<template>
    <div class="flex-grow flex flex-row flex-wrap overflow-y-scroll">
        <div class="h-full block content-around w-3/5 flex-wrap py-6 overflow-y-scroll">
            <div class="w-full" v-for="userData of matchesData" :key="userData.id">
                <div id="profile-card" class="h-64 flex flex-row border-b border-grey-600 p-4 overflow-auto"
                     :class="{ selected: userData.isSelected }"
                     @click.prevent="clickHandler"
                     :data-userid="userData.id">
                    <div id="image-container" class="rounded-md overflow-hidden h-full w-1/3 mx-auto">
                        <img :src="userData.imageUrl" alt="" srcset="" class="object-cover w-full h-full">
                    </div>
                    <div class="w-2/3 text-left ml-6">
                        <div id="info-wrapper" class="w-full mb-3">
                            <div class="flex items-baseline">
                                <span id="name" class="text-xl font-bold align-baseline mr-5">{{ userData.name }}</span>
                                <span id="age" class="text-l align-baseline">{{calculateAge(userData.birthDate)}}</span>
                                <span class="text-l align-baseline mx-1">·</span>
                                <span id="gender" class="text-l align-baseline">{{userData.gender}}</span>
                                <span id="email" class="text-right w-full align-baseline mr-2">{{userData.email}}</span>
                            </div>
                            <div id="bio">{{ userData.bio }}</div>
                        </div>
                        <div class="flex flex-row items-end">
                            <div id="dashboard-container" class="w-full">
                                <div id="expertises-container" class="">
                                    <h2 class="font-bold">Expertise Areas:</h2>
                                    <ul class="my-1">
                                        <li v-for="item in userData.expertises" :key="item"
                                            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                            {{ item }}
                                        </li>
                                    </ul>
                                </div>
                                <div id="skillwishes-container">
                                    <h2 class="font-bold">Interests:</h2>
                                    <ul class="my-1">
                                        <li v-for="item in userData.interests" :key="item"
                                            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                            {{ item }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div
                                    id="distance"
                                    class="font-extrabold flex-none text-right mr-2">
                                {{calculateDistance(mainLocation, toLatLng(userData.location))}} Km
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <MapComponent class="w-2/5"
             v-bind:main-location="mainLocation"
             v-bind:selected-location-id="selectedLocationId"
             v-bind:secondary-locations="secondaryLocations"
             v-bind:should-reprocess-secondary-locations="shouldReprocessSecondaryLocations"
        />
    </div>
</template>

<script>
import { API_URL } from '../config';
import axios from 'axios';

import MapComponent from '@/components/MapComponent.vue';
import distance from '../utils/distance';

export default {
    name: 'Profile',
    methods: {
        toLatLng(location) {
            if (!location) {
                return;
            }
            return {
                lat: parseFloat(location.latitude),
                lng: parseFloat(location.longitude),
            };
        },
        calculateDistance(location1, location2) {
            if (!location1 || !location2 ) {
                return;
            }
            return distance(location1, location2).toFixed();
        },
        calculateAge(birthDate) {
            return new Date(Date.now() - Date.parse(birthDate)).getFullYear() - 1970;
        },
        async getMatches() {
            const response = await axios.get(this.matchingEndpoint, {
                credentials: 'include',
            });
            response.data.forEach(element => {
                element.isSelected = false;
            });
            return response.data;
        },
        async displayMatches() {
            this.secondaryLocations = new Map();
            this.matchesData = await this.getMatches();
            this.matchesData = this.matchesData.filter(e => e.id !== this.mainId);
            this.matchesData.forEach(m => {
                this.secondaryLocations.set(m.id, this.toLatLng(m.location));
            });
            if (this.matchesData.length > 0) {
                this.selectedLocationId = this.matchesData[0].id;
                this.matchesData[0].isSelected = true;
            }
            // TODO: Vue won't trigger a watch when adding an element to the map, so this flag is needed. This should
            // be possible to fix with VUEX, without using a flag like this one.
            this.shouldReprocessSecondaryLocations = !this.shouldReprocessSecondaryLocations;
        },
        async getMainLocation() {
            const response = await axios.get(`${API_URL}/users/profile`, {
                credentials: 'include',
            });
            this.mainId = response.data.id;
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
            if (this.matchesData) {
                const currentSelected = this.matchesData.filter(e => e.id === this.selectedLocationId)[0];
                if (currentSelected) {
                    currentSelected.isSelected = false;
                }

                this.selectedLocationId = userID;
                this.matchesData.filter(e => e.id === userID)[0].isSelected = true;
            }
        }
    },
    components: {
        MapComponent,
    },
    props: {
        maxDistanceKm: {
            type: Number,
            default: 20000,
        },
        explore: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        matchingEndpoint: function() {
            return this.explore ? `${API_URL}/users/` : `${API_URL}/users/match/${this.maxDistanceKm}`;
        },
    },
    data() {
        return {
            selectedLocationId: null,
            mainLocation: null,
            mainId: null,
            shouldReprocessSecondaryLocations: false,
            secondaryLocations: new Map(),
            matchesData: [],
        };
    },
    async created() {
        await this.getMainLocation();
        await this.displayMatches();
    }
};
</script>

<style scoped>
.selected{
    background-color: #f2e6dd;
}
</style>
