<template>
    <div class="row row-cols-1 row-cols-md-3">
        <div v-for="article in articles" :key="article._id" class="col mb-4">
            <ArticleCard :article="article"></ArticleCard>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import ArticleCard from "./ArticleCard";

    export default {
        name: "ListArticles",
        components: {ArticleCard},
        data() {
            return {
                articles: []
            }
        },
        created() {
            axios.get(`${this.$api_url}/articles`)
            .then(response => this.articles = response.data)
            .catch(error => console.log(error));
        },
    }
</script>
