<template>
    <div class="bg-gray-300 flex flex-col flex-grow">
        <div class="container max-w-sm mx-auto my-2 flex-1 flex flex-col items-center justify-center px-2">
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
                        type="email"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        required
                        v-model="email"
                        placeholder="Email"/>

                <div class="text-grey-dark my-6 text-s">
                    <span class="font-bold">Note:</span> this email address will be shared with other members.
                </div>

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
                <a class="no-underline border-b border-blue text-blue" href="/login">
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
            email: null,
            password: null,
            passwordConfirmation: null,
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

            const successful = await this.$store.dispatch('register', data);
            if (successful) {
                await this.$router.push('/profile');
            }
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
