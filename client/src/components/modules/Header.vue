<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Simple Blog</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link to="/" class="nav-item nav-link">Accueil<span class="sr-only">(current)</span></router-link>
                    <router-link to="/mes-articles" v-if="$store.getters.isLoggedIn" class="nav-item nav-link">Mes articles</router-link>
                    <router-link to="/identification" v-if="!$store.getters.isLoggedIn" class="nav-item nav-link">Connexion</router-link>
                    <a v-if="$store.getters.isLoggedIn" v-on:click="logout" class="nav-item nav-link">Deconnexion</a>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: "Header",
    methods: {
        logout: function () {
            this.$store.state.jwtFromRequest = null;
            this.$router.push({name: 'home'});
        }
    }
}
</script>