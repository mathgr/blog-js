<template>
    <form @submit.prevent="login">
        <div class="form-group">
            <label for="exampleInputEmail1">Adresse mail</label>
            <input v-model="email" type="email" :class="{ 'is-invalid': isEmailInvalid }" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Mail" required>
            <div class="invalid-feedback">
                L'adresse mail rentrée n'est pas valide
            </div>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Mot de passe</label>
            <input v-model="password" type="password" :class="{ 'is-invalid' : isPasswordInvalid }" class="form-control" id="exampleInputPassword1" placeholder="Mot de passe" required>
            <div class="invalid-feedback">
                Mauvais couple adresse mail / mot de passe
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Se connecter</button>
    </form>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Login",
        data: function () {
            return {
                email: null,
                isEmailInvalid: false,
                password: null,
                isPasswordInvalid: false,
            }
        },
        methods: {
            login: function () {
                if (!this.checkForm()) {
                    return;
                }

                axios.post(`${this.$api_url}/login`, {
                    'email': this.email,
                    'password': this.password,
                })
                .then(response => {
                    this.$store.state.jwtFromRequest = response.data.jwt;
                    this.$router.push({name: 'home'});
                })
                .catch(() => {
                    this.isPasswordInvalid = true;
                });
            },
            checkForm: function () {
                if (this.email && this.email !== '' && this.password && this.password !== '') {
                    this.isEmailInvalid = false;
                    this.isPasswordInvalid = false;

                    return true;
                }

                if (!this.email) {
                    this.isEmailInvalid = true;
                }

                if (!this.password) {
                    this.isPasswordInvalid = true;
                }

                return false;
            }

        }
    }
</script>
