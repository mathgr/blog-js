<template>
    <div v-if="article" class="col">
        <h2>{{ article.title }}</h2>
        <p>Publié le {{ createdAtFormatted }} par <a :href="'mailto:' + article.author">{{ article.author }}</a></p>
        <p>
            {{ article.content }}
        </p>
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
        },
        computed: {
            createdAtFormatted: function () {
                const d = new Date(this.article.created_at);

                return d.getDate() + ' ' + d.toLocaleString('default', {month: 'long'}) + ' ' + d.getFullYear();
            }
        }
    }
</script>

<style scoped>

</style>