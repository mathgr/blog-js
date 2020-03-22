<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ createdAtFormatted }}</h6>
            <p class="card-text">{{ contentAbstract }}</p>
            <div class="btn-group">
                <router-link :to="{name: 'article', params: {id: article._id}}" class="btn btn-primary">Voir plus</router-link>
                <router-link :to="{name: 'edit-article', params: {id: article._id}}" v-if="isEditable" type="button" class="btn btn-secondary">Éditer</router-link>
                <button v-if="isEditable" v-on:click="deleteArticle" type="button" class="btn btn-danger">Supprimer</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "ArticleCard",
        props: {
            article: Object,
            isEditable: Boolean,
        },
        computed: {
            contentAbstract: function () {
                const limit = 15;
                if (this.article.content.length <= limit) {
                    return this.article.content;
                }

                return this.article.content.substring(0, 15) + '...';
            },
            createdAtFormatted: function () {
                const d = new Date(this.article.created_at);

                return d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
            }
        },
        methods: {
            deleteArticle: function () {
                axios.defaults.headers.common = {'Authorization': `Bearer ${this.$store.state.jwtFromRequest}`};
                axios.delete(`${this.$api_url}/articles/${this.article._id}`)
                .then(() => this.$emit('articleDeleted', this.article._id))
                .catch(error => console.log(error))
            }
        }
    }
</script>

<style scoped>

</style>