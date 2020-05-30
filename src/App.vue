<template>
    <div id="app" class="flex flex-col justify-between h-screen">
        <nav id="nav">
            <div class="container mx-auto px-6 py-2 flex flex-wrap justify-between items-center">
                <router-link to="/" class="mx-6">
                    <img src="./assets/isologo-small.png" class="h-12 pr-2 inline"/>
                    <img src="./assets/skillmarket-logo-small.png" class="h-12 hidden sm:inline"/>
                </router-link>

                <label for="menu-toggle" class="pointer-cursor sm:hidden block">
                    <div class="button flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500">
                        <svg class="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                        </svg>
                    </div>
                </label>
                <input class="hidden" type="checkbox" id="menu-toggle" />

                <div class="hidden sm:flex items-center sm:w-auto w-full sm:justify-end sm:flex-grow" id="menu">
                    <ul class="sm:inline-flex">
                        <li>
                            <router-link
                                    to="/"
                                    class="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4">
                                Home
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                    v-if="!isLoggedIn"
                                    to="/signup"
                                    class="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4">
                                Sign Up
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                    v-if="isLoggedIn"
                                    to="/profile"
                                    class="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4">
                                Profile
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                    v-if="isLoggedIn"
                                    to="/explore"
                                    class="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4">
                                Explore
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                    v-if="isLoggedIn"
                                    to="/match"
                                    class="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4">
                                Match
                            </router-link>
                        </li>
                    </ul>
                    <ul class="sm:inline-flex">
                        <li>
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
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div v-if="errors.length" class="bg-red-200 p-3 rounded-md text-lg text-red-700 font-bold">
            <button id="close-errors-button" class="float-right inline-block p-2 rounded" style="background:transparent; color:#c53030" @click="clearErrors">X</button>
            Error:
            <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
        </div>
        <router-view/>
        <footer id="footer" class="flex flex-col justify-between items-center w-full text-center border-t border-grey p-4 h-12">
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
        errors() {
            return this.$store.getters.errors;
        },
    },
    methods: {
        async logOut() {
            await this.$store.dispatch('logout');
            await this.$router.push('/login');
        },
        async clearErrors() {
            await this.$store.dispatch('clearErrors');
        }
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

    #app button, .button {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        font-weight: bold;
        color: #264a63;
        background: #db9c6d;
    }

    #close-errors-button button {
        background: transparent;
        color: red;
    }

    #menu-toggle:checked + #menu {
        display: block;
    }
</style>
