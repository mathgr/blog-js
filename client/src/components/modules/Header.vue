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
                    <a class="nav-item nav-link" href="#">Mes articles</a>
                    <a class="nav-item nav-link" href="#">Connexion</a>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: "Header",
}
</script>