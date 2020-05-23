<template>
    <nav id="app">
        <nav id="nav" class="flex items-center justify-between flex-wrap bg-gray-800 p-6">
            <div class="flex items-center flex-shrink-0 text-white mr-6">
                <router-link to="/">
                    <img src="./assets/skillmarket-logo-small.png" class="h-12"/>
                </router-link>
            </div>
            <div class="w-full block flex-grow sm:flex sm:items-center sm:w-auto">
                <div class="text-sm sm:flex-grow">
                    <router-link
                            to="/"
                            class="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4">
                        Home
                    </router-link>
                    <router-link
                            to="/signup"
                            class="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4">
                        Sign Up
                    </router-link>
                </div>
                <div>
                <router-link
                        to="/login"
                        class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 md:mt-0">
                    Log In
                </router-link>
                </div>
            </div>
        </nav>
        <router-view/>
    </nav>
</template>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #326080;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #cd9364;
    }

    #nav a.router-link-exact-active {
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
