<template>
    <div>
        <h2>{{ createOrEditLabel }}</h2>
        <form @submit.prevent="createOrEdit">
            <div v-if="error" class="alert alert-danger" role="alert">
                Une erreur s'est produite
                <button v-on:click="error = false" type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="form-group">
                <label for="title">Titre</label>
                <input v-model="title" type="text" :class="{ 'is-invalid': isTitleInvalid }" class="form-control form-control-lg" id="title" required>
                <div class="invalid-feedback">
                    Le titre de l'article doit avoir une longueur minimum de 3 caractères
                </div>
            </div>
            <div class="form-group">
                <label for="content">Contenu</label>
                <textarea v-model="content" :class="{ 'is-invalid': isContentInvalid }" class="form-control" id="content" rows="6" required></textarea>
                <div class="invalid-feedback">
                    Le contenu de l'article doit avoir une longueur minimum de 10 caractères
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Enregistrer</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "ArticleCreateOrEdit",
        props: {
            isEditing: Boolean,
        },
        computed: {
            createOrEditLabel: function () {
                if (this.isEditing) {
                    return 'Édition de l\'article';
                }

                return 'Création d\'un article';
            }
        },
        data() {
            return {
                title: '',
                isTitleInvalid: false,
                content: '',
                isContentInvalid: false,
                error: false,
            }
        },
        created() {
            if (this.isEditing) {
                axios.get(`${this.$api_url}/articles/${this.$route.params.id}`)
                    .then(response => {
                        this.title = response.data.title;
                        this.content = response.data.content;
                    })
                    .catch(error => {
                        this.error = true;
                        console.log(error)
                    });
            }
        },
        methods: {
            createOrEdit: function() {
                if (!this.checkForm()) {
                    return;
                }

                const data = {
                    'title': this.title,
                    'content': this.content,
                };

                if (this.isEditing) {
                    this.edit(data);
                } else {
                    this.create(data);
                }
            },
            edit: function (data) {
                axios.defaults.headers.common = {'Authorization': `Bearer ${this.$store.state.jwtFromRequest}`};
                axios.put(`${this.$api_url}/articles/${this.$route.params.id}`, data)
                .then(() => this.$router.push({name: 'my-articles'}))
                .catch(error => {
                    this.error = true;
                    console.log(error);
                });
            },
            create: function (data) {
                axios.defaults.headers.common = {'Authorization': `Bearer ${this.$store.state.jwtFromRequest}`};
                axios.post(`${this.$api_url}/articles`, data)
                .then(() => this.$router.push({name: 'my-articles'}))
                .catch(error => {
                    this.error = true;
                    console.log(error);
                })
            },
            checkForm: function () {
                this.isTitleInvalid = false;
                this.isContentInvalid = false;

                if (this.title.length > 3 && this.content.length > 10) {
                    return true;
                }

                if (this.title.length <= 3) {
                    this.isTitleInvalid = true;
                }

                if (this.content.length <= 10) {
                    this.isContentInvalid = true;
                }

                return false;
            }
        }
    }
</script>

<style scoped>

</style>