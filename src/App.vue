<template>
    <div id="app" class="flex flex-col min-h-screen justify-between">
        <nav id="nav" class="flex items-center justify-between flex-wrap p-6">
            <div class="flex items-center flex-shrink-0 text-white mr-6 ml-6">
                <router-link to="/" class="flex">
                    <img src="./assets/isologo-small.png" class="h-12 pr-2"/>
                    <img src="./assets/skillmarket-logo-small.png" class="h-12"/>
                </router-link>
            </div>
            <div class="w-full block flex-grow sm:flex sm:items-center sm:w-auto">
                <div class="text-md sm:flex-grow">
                    <router-link
                            to="/"
                            class="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4">
                        Home
                    </router-link>
                    <router-link
                            v-if="!isLoggedIn"
                            to="/signup"
                            class="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4">
                        Sign Up
                    </router-link>
                    <router-link
                            v-if="isLoggedIn"
                            to="/profile"
                            class="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4">
                        Profile
                    </router-link>
                    <router-link
                            v-if="isLoggedIn"
                            to="/explore"
                            class="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4">
                        Explore
                    </router-link>
                    <router-link
                            v-if="isLoggedIn"
                            to="/match"
                            class="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4">
                        Match
                    </router-link>
                </div>
                <div>
                    <router-link
                            v-if="!isLoggedIn"
                            to="/login"
                            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 md:mt-0 mr-2">
                        Log In
                    </router-link>
                    <button
                            v-else
                            @click="logOut"
                            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 ml-2 md:mt-0 mr-6">
                        Log Out
                    </button>
                </div>
            </div>
        </nav>
        <div class="bg-gray-300 min-h-screen">
            <router-view/>
        </div>
        <footer id="footer" class="flex flex-col justify-between items-center w-full text-center border-t border-grey p-4 pin-b h-12">
            <p class="block p-2">SkillMarket® 2020 ©</p>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'App',
    props: {},
    computed : {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        },
    },
    methods: {
        async logOut() {
            await this.$store.dispatch('logout');
            await this.$router.push('/login');
        },
    },
};
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #326080;
    }

    #nav {
        padding: 5px;
        background: #326080;
    }

    #nav a {
        font-weight: bold;
        color: #cd9364;
    }

    #nav a.router-link-exact-active {
        color: #f2e6dd;
    }

    #footer {
        padding: 5px;
        background: #326080;
    }

    #footer {
        font-weight: bold;
        color: #cd9364;
    }

    #footer a {
        color: #f2e6dd;
    }

    #app button {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        font-weight: bold;
        color: #264a63;
        background: #db9c6d;
    }
</style>
