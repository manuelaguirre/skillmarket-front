<template>
	<div class="bg-gray-300 flex flex-col flex-grow items-center justify-center">
		<div class="container mx-auto my-2 items-center justify-center px-2 flex flex-col">
			<form
					@submit.prevent="signUp"
					class="bg-white px-6 py-8 rounded shadow-md flex flex-col"
			>
				<h1 class="mb-8 text-3xl text-center flex-initial">Sign up</h1>
				<div v-if="errors.length" class="bg-red-200 p-3 mb-4 rounded-md">
					<b>Please correct the following error(s):</b>
					<ul>
						<li v-for="error in errors" :key="error">{{ error }}</li>
					</ul>
				</div>
				<div class="flex flex-col sm:flex-row flex-initial items-center justify-center">
					<div class="m-6 sm:w-1/3 w-full flex-grow-0">
						<div id="image-container" class="rounded-md overflow-hidden w-48 mx-auto mb-2">
							<img :src="userData.imageUrl" alt="" srcset="">
						</div>
						<input
								type="text"
								class="block border border-grey-light w-full p-3 rounded mb-4"
								name="imageUrl"
								v-model="userData.imageUrl"
								placeholder="Profile pic URL"/>
					</div>
					<div class="m-6 sm:w-2/3 w-full flex-grow-0">
						<input
								type="text"
								class="block border border-grey-light w-full p-3 rounded mb-4"
								name="fullname"
								required
								v-model="userData.name"
								placeholder="Full Name"/>
						<div class="flex flex-row justify-between">
							<input
									onfocus="(this.type='date')"
									class="block border border-grey-light w-5/8 p-3 rounded mb-4"
									name="birthdate"
									required
									v-model="userData.birthDate"
									v-bind:max="maxDate"
									placeholder="Birth Date"/>
							<select name="gender" id="gender-select"
									class="block border border-grey-light w-1/4 p-1 rounded mb-4 bg-white"
									v-model="userData.gender">
								<option value="null" disabled hidden>Gender</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Other">Other</option>
							</select>
						</div>

						<label>
							Interests (comma separated)
							<input
									type="text"
									class="block border border-grey-light w-full p-3 rounded mb-4"
									name="interests"
									required
									v-model="interestsField"
									@keyup="processInterests"
									placeholder="music, photography"/>
						</label>

						<label>
							Expertises (comma separated)
							<input
									type="text"
									class="block border border-grey-light w-full p-3 rounded mb-4"
									name="expertises"
									required
									v-model="expertisesField"
									@keyup="processExpertises"
									placeholder="sword fighting, french"/>
						</label>

						<input
								type="text"
								class="block border border-grey-light w-full p-3 rounded mb-4"
								name="bio"
								v-model="userData.bio"
								placeholder="Bio"/>

						<label class="block my-6">
							<div class="flex flex-row">
								<div class="w-1/2">Location</div>
								<button class="button w-1/2 inline-block text-sm px-4 py-2 leading-none border rounded" @click="getPosition">
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
										required
										v-model="userData.location.latitude"
										placeholder="Latitude"/>

								<input
										type="text"
										class="block border border-grey-light w-1/2 p-3 rounded mb-4"
										name="longitude"
										required
										v-model="userData.location.longitude"
										placeholder="Longitude"/>
							</div>
						</label>

						<input
								type="email"
								class="block border border-grey-light w-full p-3 rounded mb-4"
								name="email"
								autocomplete="email"
								required
								v-model="userData.email"
								placeholder="Email"/>

<!--						<input-->
<!--								type="password"-->
<!--								required-->
<!--								class="block border border-grey-light w-full p-3 rounded mb-4"-->
<!--								name="password"-->
<!--								autocomplete="current-password"-->
<!--								v-model="userData.password"-->
<!--								pattern="^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).{8,}$"-->
<!--								title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"-->
<!--								placeholder="Password"/>-->

						<input
								type="password"
								required
								class="block border border-grey-light w-full p-3 rounded mb-4"
								name="password"
								autocomplete="new-password"
								v-model="userData.password"
								pattern="/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).{8,}$/"
								title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
								placeholder="Password"/>
						<input
								type="password"
								required
								class="block border border-grey-light w-full p-3 rounded mb-4"
								name="confirm_password"
								autocomplete="mew-password-confirmation"
								v-model="userData.passwordConfirmation"
								pattern="^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).{8,}$"
								title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
								placeholder="Confirm Password"/>


						<button
								type="submit"
								class="w-full text-center py-3 rounded bg-green-300 text-white hover:bg-green-dark focus:outline-none my-1"
						>Create Account
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
import axios from 'axios';
export default {
    name:'Profile',
    props:{},
    data() {
        return {
            errors: ['someerror'],
            interestsField: null,
            expertisesField: null,
            gettingLocation: false,
            maxDate: new Date(),
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
        },
        processInterests() {
            this.interests = this.interestsField ? this.interestsField.split(',') : [];
        },
        processExpertises() {
            this.expertises = this.expertisesField ? this.expertisesField.split(',') : [];
        },
        setPosition(position) {
            console.log(position);
            const {latitude, longitude} = position.coords;
            this.location = {latitude, longitude};
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
            if (this.password !== this.passwordConfirmation) {
                this.errors = ['Passwords do not match'];
                return false;
            }
            this.errors = [];
            return true;
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
