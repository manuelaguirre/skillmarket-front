<template>
    <div class="h-full bg-gray-300 flex flex-col">
        <div class="container max-w-sm mx-auto my-2 flex-1 flex flex-col items-center justify-center px-2">
            <form
                    @submit.prevent="logIn"
                    class="bg-white px-6 py-8 rounded shadow-md text-black w-full"
            >
                <h1 class="mb-8 text-3xl text-center">Log In</h1>

                <input
                        type="email"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        autocomplete="email"
                        v-model="email"
                        required
                        placeholder="Email"/>

                <input
                        type="password"
                        autocomplete="current-password"
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
export default {
    name:'LogIn',
    props:{},
    data() {
        return {
            email: null,
            password: null,
        };
    },
    methods: {
        async logIn() {

            const data = {
                email: this.email,
                password: this.password,
            };

            await this.$store.dispatch('login', data);
            await this.$router.push('/');
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
