<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ createdAtFormatted }}</h6>
            <p class="card-text">{{ contentAbstract }}</p>
            <router-link :to="{name: 'article', params: {id: article._id}}" class="btn btn-primary">Voir plus</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ArticleCard",
        props: {
            article: Object
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
    }
</script>

<style scoped>

</style>