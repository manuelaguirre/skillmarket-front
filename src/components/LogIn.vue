<template>
    <div class="min-h-screen bg-gray-300 flex flex-col">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <form
                    @submit="logIn"
                    class="bg-white px-6 py-8 rounded shadow-md text-black w-full"
            >
                <h1 class="mb-8 text-3xl text-center">Log In</h1>

                <input
                        type="email"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        v-model="email"
                        required
                        placeholder="Email"/>

                <input
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        v-model="password"
                        required
                        placeholder="Password"/>

                <button
                        type="submit"
                        class="w-full text-center py-3 rounded bg-green-300 text-white hover:bg-green-dark focus:outline-none my-1"
                >Log In
                </button>

            </form>

            <div class="text-grey-dark mt-6">
                Don't have an account yet?
                <a class="no-underline border-b border-blue text-blue" href="#/signup">
                    Sign Up
                </a>.
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'LogIn',
    props:{},
    methods: {
        async logIn(e) {
            e.preventDefault();
            // TODO: don't hardcode URLS, and use HTTPS
            const response = await axios.post('http://localhost:3000/login', {
                email: this.email,
                password: this.password,
            });

            const {status} = response;

            if (status === 200) {
                await this.$router.push('/profile');
            }
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
