<template>
    <div>
        <ListArticles></ListArticles>
    </div>
</template>

<script>
    import ListArticles from "./article/ListArticles";

    export default {
        name: "Home",
        components: {ListArticles},
    }
</script>