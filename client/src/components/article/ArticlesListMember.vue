<template>
    <div>
        <h2>Mes articles</h2>
        <div class="d-flex justify-content-end my-3">
            <router-link :to="{name: 'new-article'}" class="btn btn-primary">Créer un article</router-link>
        </div>
        <div v-if="isLoaded">
            <div v-if="articlesMember.length" class="row row-cols-1 row-cols-md-3">
                <div v-for="article in articlesMember" :key="article._id" class="col mb-4">
                    <ArticleCard :article="article" :is-editable="true" v-on:articleDeleted="deleteArticle"></ArticleCard>
                </div>
            </div>
            <p v-else>Aucun article.</p>
        </div>
        <p v-else>
            Chargement...
        </p>
    </div>
</template>

<script>
    import axios from 'axios'
    import ArticleCard from "./ArticleCard";

    export default {
        name: "ArticlesListMember",
        components: {ArticleCard},
        data() {
            return {
                articlesMember: [],
                isLoaded: false,
            }
        },
        created() {
            axios.get(`${this.$api_url}/articles/members/${this.$store.getters.memberId}`)
                .then(response => {
                    this.articlesMember = response.data;
                    this.isLoaded = true;
                })
                .catch(error => console.log(error));
        },
        methods: {
            deleteArticle: function (id) {
                this.articlesMember = this.articlesMember.filter(value => value._id !== id);
            },
        }
    }
</script>
