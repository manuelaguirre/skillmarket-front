<template>
	<div class="bg-gray-300 flex flex-col flex-grow items-center justify-center">
		<div class="container mx-auto my-2 items-center justify-center px-2 flex flex-1 flex-col">
			<form
					@submit.prevent="updateProfile"
					class="bg-white px-6 py-8 rounded shadow-md flex flex-col"
			>
				<h1 class="mb-8 text-3xl text-center font-extrabold flex-initial">Your Profile</h1>
				<div v-if="errors.length" class="bg-red-200 p-3 mb-4 rounded-md">
					<b>Please correct the following error(s):</b>
					<ul>
						<li v-for="error in errors" :key="error">{{ error }}</li>
					</ul>
				</div>
				<div class="flex flex-col sm:flex-row flex-initial items-start justify-center">
					<div class="sm:m-6 px-3 sm:w-1/3 w-full items-start flex-grow-0 border-r border-silver border-solid">
						<div id="image-container" class="rounded-md overflow-hidden w-48 mx-auto mb-2">
							<img :src="userData.imageUrl"
							@error="handleImageLoadError"
							:class="{error : imageLoadError}"
							alt="Your profile picture."
							srcset="">
							<p v-show="imageLoadError" class="text-red-400">Invalid Image URL</p>
						</div>
						<label>
							<div>Profile Pic URL:</div>
							<input
									type="text"
									class="block border border-grey-light w-full p-3 rounded mb-4"
									name="imageUrl"
									@focus="clearImageLoadError"
									@drop="handleDropEvent"
									v-model.lazy="userData.imageUrl"

									placeholder="http://example.jpg"/>
						</label>
					</div>
					<div class="sm:m-6 sm:w-2/3 w-full flex-grow-0">
						<label>
							<div>First Name:</div>
							<input
									type="text"
									class="block border border-grey-light w-full p-3 rounded mb-4"
									name="fullname"
									v-model="userData.name"
									placeholder="John"/>
						</label>

						<label>
							<div>Birth date:</div>
							<input
									onfocus="(this.type='date')"
									class="block border border-grey-light w-full p-3 rounded mb-4"
									name="birthdate"
									v-model="userData.birthDate"
									v-bind:max="maxDate"
									placeholder="Birth Date"/>
						</label>

						<label for="gender-select">
							<div>Gender:</div>
							<select name="gender" id="gender-select"
									class="block border border-grey-light w-full p-2 rounded mb-4 bg-white h-12"
									v-model="userData.gender">
								<option value="null" disabled hidden>Gender</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Other">Other</option>
							</select>
						</label>

						<label>
							<div>Interests (comma separated):</div>
							<input
									type="text"
									class="block border border-grey-light w-full p-3 rounded mb-4"
									name="interests"

									v-model="interestsField"
									@keyup="processInterests"
									placeholder="music, photography"/>
						</label>

						<label>
							<div>Expertise areas (comma separated):</div>
							<input
									type="text"
									class="block border border-grey-light w-full p-3 rounded mb-4"
									name="expertises"

									v-model="expertisesField"
									@keyup="processExpertises"
									placeholder="sword fighting, french"/>
						</label>

						<label>
							<div>Bio:</div>
							<input
									type="text"
									class="block border border-grey-light w-full p-3 rounded mb-4"
									name="bio"
									v-model="userData.bio"
									placeholder="Tell us something about yourself."/>
						</label>

						<label class="block my-6">
							<div class="flex flex-row items-end">
								<div class="w-1/2">Location: </div>
								<button
										type="button"
										class="button w-1/2 my-1 inline-block text-sm px-4 py-2 leading-none border rounded"
										@click="getPosition">
									Get
								</button>
							</div>
							<div v-if="gettingLocation" class="bg-yellow-200 mb-2 rounded">
								Processing...
							</div>
							<div class="flex flex-row">
								<input
										type="text"
										class="block border border-grey-light w-1/2 p-3 rounded mb-4"
										name="latitude"

										v-model="userData.location.latitude"
										placeholder="Latitude"/>

								<input
										type="text"
										class="block border border-grey-light w-1/2 p-3 rounded mb-4"
										name="longitude"

										v-model="userData.location.longitude"
										placeholder="Longitude"/>
							</div>
						</label>

						<label class="border-t border-silver border-solid">
							<div>Email:</div>
							<input
									type="email"
									class="block border border-grey-light w-full p-3 rounded mb-4"
									name="email"
									autocomplete="email"
									v-model="userData.email"
									placeholder="your.name@example.com"/>
						</label>

						<label>
							<div>Password:</div>
							<input
									type="password"
									class="block border border-grey-light w-full p-3 rounded mb-4"
									name="password"
									autocomplete="new-password"
									v-model="userData.password"
									pattern="^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).{8,}$"
									title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
									placeholder="Password"/>
						</label>

						<label>
							<div>Password Confirmation:</div>
							<input
									type="password"
									class="block border border-grey-light w-full p-3 rounded mb-4"
									name="confirm_password"
									autocomplete="new-password-confirmation"
									v-model="userData.passwordConfirmation"
									pattern="^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).{8,}$"
									title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
									placeholder="Confirm Password"/>
						</label>


						<button
								type="submit"
								class="w-full text-center py-3 rounded bg-green-300 text-white hover:bg-green-dark focus:outline-none my-1"
						>Update Profile
						</button>
					</div>
				</div>
			</form>

			<div class="text-grey-dark mt-6">
				Already have an account?
				<a class="no-underline border-b border-blue text-blue" href="#/login">
					Log in
				</a>.
			</div>
		</div>
	</div>
</template>

<script>
import { API_URL } from '../config';
import axios from 'axios';
export default {
    name:'Profile',
    props:{},
    data() {
        return {
            errors: [],
            imageLoadError: false,
            interestsField: null,
            expertisesField: null,
            gettingLocation: false,
            maxDate: new Date(),
            userData: {
                name: null,
                birthDate: null,
                bio: null,
                email: null,
                location: {
                    latitude: null,
                    longitude: null,
                },
                interests: [],
                expertises: undefined,
                imageUrl: undefined,
            },
            userId: null,
        };
    },
    created () {
        this.displayUser();
    },
    methods: {
        async getUser() {
            const response = await axios.get(`${API_URL}/users/profile`, {
                credentials: 'include',
            });
            return response.data;
        },
        async displayUser() {
            const user = await this.getUser();
            this.userData = {location: {latitude:null, longitude: null}, ...user};
            this.expertisesField = this.userData.expertises.join();
            this.interestsField = this.userData.interests.join();
        },
        processInterests() {
            this.userData.interests = this.interestsField ? this.interestsField.split(',') : [];
        },
        processExpertises() {
            this.userData.expertises = this.expertisesField ? this.expertisesField.split(',') : [];
        },
        setPosition(position) {
            console.log(position);
            const {latitude, longitude} = position.coords;
            this.userData.location = {latitude, longitude};
            this.gettingLocation = false;
        },
        getPosition() {
            if (!navigator.geolocation) {
                console.log('Geolocation is not supported by your browser');
            } else {
                this.gettingLocation = true;
                navigator.geolocation.getCurrentPosition(this.setPosition, console.log);
            }
        },
        validatePassword() {
            if (this.userData.password !== this.userData.passwordConfirmation) {
                this.errors.push(['Passwords do not match']);
                return false;
            }
            this.errors = [];
            return true;
        },
        handleImageLoadError() {
            this.imageLoadError = true;
        },
        clearImageLoadError() {
            this.imageLoadError = false;
        },
        handleDropEvent(e) {
            const value = e.dataTransfer.getData('text/plain');
            this.userData.imageUrl = value;
        },
        updateProfile() {
            if (!this.validatePassword()) {
                return;
            }
            axios.put(`${API_URL}/users/profile`, this.userData,{
                credentials: 'include',
            });
        }

    },
};
</script>

<style scoped>
	label {
		text-align: left;
		font-weight: bold;
	}

</style>
