<template>
    <div class="bg-gray-300 flex flex-col">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <form
                    @submit.prevent="signUp"
                    class="bg-white px-6 py-8 rounded shadow-md w-full"
            >
                <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                <div v-if="errors.length" class="bg-red-200 p-3 mb-4 rounded-md">
                    <b>Please correct the following error(s):</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </div>
                <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        required
                        v-model="fullName"
                        placeholder="Full Name"/>
                <div class="flex flex-row justify-between">
                    <input
                            onfocus="(this.type='date')"
                            class="block border border-grey-light w-5/8 p-3 rounded mb-4"
                            name="birthdate"
                            required
                            v-model="birthDate"
                            v-bind:max="maxDate"
                            placeholder="Birth Date"/>
                    <select name="gender" id="gender-select"
                            class="block border border-grey-light w-1/4 p-1 rounded mb-4 bg-white"
                            v-model="gender">
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
                        name="imageUrl"
                        v-model="imageUrl"
                        placeholder="Profile pic URL"/>

                <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="bio"
                        v-model="bio"
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
                                v-model="location.latitude"
                                placeholder="Latitude"/>

                        <input
                                type="text"
                                class="block border border-grey-light w-1/2 p-3 rounded mb-4"
                                name="longitude"
                                required
                                v-model="location.longitude"
                                placeholder="Longitude"/>
                    </div>
                </label>

                <input
                        type="email"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        required
                        v-model="email"
                        placeholder="Email"/>

                <input
                        type="password"
                        required
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        v-model="password"
                        pattern="^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).{8,}$"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        placeholder="Password"/>
                <input
                        type="password"
                        required
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        v-model="passwordConfirmation"
                        pattern="^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).{8,}$"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        placeholder="Confirm Password"/>


                <button
                        type="submit"
                        class="w-full text-center py-3 rounded bg-green-300 text-white hover:bg-green-dark focus:outline-none my-1"
                >Create Account
                </button>

                <div class="text-center text-sm text-grey-dark mt-4">
                    By signing up, you agree to the
                    <a class="no-underline border-b border-grey-dark text-grey-dark" href="#/toc">
                        Terms of Service
                    </a> and
                    <a class="no-underline border-b border-grey-dark text-grey-dark" href="#/privacy">
                        Privacy Policy
                    </a>
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
export default {
    name: 'SignUp',
    props: {},
    data() {
        return {
            errors: [],
            fullName: null,
            email: null,
            birthDate: null,
            gender: null,
            password: null,
            interestsField: null,
            imageUrl: null,
            interests: [],
            expertisesField: null,
            expertises: [],
            passwordConfirmation: null,
            maxDate: new Date(),
            bio: null,
            gettingLocation: false,
            location: {
                latitude: null,
                longitude: null,
            },
        };
    },
    methods: {
        validatePassword() {
            if (this.password !== this.passwordConfirmation) {
                this.errors = ['Passwords do not match'];
                return false;
            }
            this.errors = [];
            return true;
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
        async signUp() {
            if (!this.validatePassword()) {
                return;
            }

            const data = {
                name: this.fullName,
                email: this.email,
                birthDate: this.birthDate,
                gender: this.gender,
                interests: this.interests,
                expertises: this.expertises,
                password: this.password,
                passwordConfirmation: this.passwordConfirmation,
                location: this.location,
                imageUrl: this.imageUrl,
                bio: this.bio,
            };

            await this.$store.dispatch('register', data);
            await this.$router.push('/profile');
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
