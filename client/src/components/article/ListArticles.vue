<template>
    <div>
        <div v-for="article in articles" :key="article._id">
            {{ article.title }}
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "ListArticles",
        data() {
            return {
                articles: []
            }
        },
        created() {
            axios.get(this.$api_url + '/articles')
            .then(response => {
                this.articles = response.data;
            })
            .catch(error => console.log(error))
        }
    }
</script>
