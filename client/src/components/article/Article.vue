<template>
    <div v-if="article" class="col">
        <h2>{{ article.title }}</h2>
        <p>{{ article.created_at }} by <a href="#">{{ article.author }}</a></p>
        <div>
            {{ article.content }}
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Article.vue",
        data() {
            return {
                article: null,
            }
        },
        created() {
            axios.get(this.$api_url + `/articles/${this.$route.params.id}`)
            .then(response => this.article = response.data)
            .catch(error => console.log(error));
        }
    }
</script>

<style scoped>

</style>