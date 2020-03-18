<template>
    <div class="row row-cols-1 row-cols-md-3">
        <div v-for="article in articles" :key="article._id" class="col mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ article.title }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{ article.created_at | formatDate }}</h6>
                    <p class="card-text">{{ article.content | abstract }}</p>
                    <router-link :to="{name: 'article', params: {id: article._id}}" class="btn btn-primary">Voir plus</router-link>
                </div>
            </div>
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
            .then(response => this.articles = response.data)
            .catch(error => console.log(error));
        },
        filters: {
            abstract: function (text) {
                const limit = 15;
                if (text.length <= limit) {
                    return text;
                }

                return text.substring(0, 15) + '...';
            },
            formatDate: function (date) {
                const d = new Date(date);

                return d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
            }
        },
    }
</script>
