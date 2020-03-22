<template>
    <div>
        <h2>S'inscrire</h2>
        <form @submit.prevent="createAccount">
            <div class="form-group">
                <label for="exampleInputEmail1">Adresse mail</label>
                <input v-model="email" type="email" :class="{ 'is-invalid': isEmailInvalid }" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Mail" required>
                <div class="invalid-feedback">
                    L'adresse mail rentrée n'est pas valide, ou est déjà utilisée
                </div>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Mot de passe</label>
                <input v-model="password" type="password" :class="{ 'is-invalid' : isPasswordInvalid }" class="form-control" id="exampleInputPassword1" placeholder="Mot de passe" required>
                <div class="invalid-feedback">
                    Le mot de passe doit comporter au mois 6 caractères
                </div>
            </div>
            <button type="submit" class="btn btn-primary">S'inscrire</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "CreateAccount",
        data: function () {
            return {
                email: null,
                isEmailInvalid: false,
                password: null,
                isPasswordInvalid: false,
            }
        },
        methods: {
            createAccount: function () {
                if (!this.checkForm()) {
                    return;
                }

                axios.post(`${this.$api_url}/create_account`, {
                    'email': this.email,
                    'password': this.password,
                })
                    .then(() => {
                        this.$router.push({name: 'login'});
                    })
                    .catch(() => {
                        this.isEmailInvalid = true;
                    });
            },
            checkForm: function () {
                this.isEmailInvalid = false;
                this.isPasswordInvalid = false;

                if (this.email && this.email !== '' && this.password.length >= 6) {
                    return true;
                }

                if (!this.email) {
                    this.isEmailInvalid = true;
                }

                if (this.password.length < 6) {
                    this.isPasswordInvalid = true;
                }

                return false;
            }

        }
    }
</script>
