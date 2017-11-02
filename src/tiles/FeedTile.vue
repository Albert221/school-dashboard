<template>
  <article class="tile feed">
        <h2 class="feed--title">Ogłoszenia</h2>
        <div class="feed--content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim, est quis molestie faucibus, ligula urna mollis dui, in gravida nibh libero id risus. Donec eget nibh eget sem suscipit sodales. Nam interdum velit dolor, eget placerat turpis tincidunt et. Fusce a augue nunc. Aenean volutpat ut risus eget vestibulum. In luctus odio in libero congue ullamcorper quis vitae enim. Duis tempor purus id tellus condimentum pretium. Aliquam in ligula aliquet, fermentum lectus sit amet, scelerisque felis. Curabitur at tempor velit.
            Sed vestibulum suscipit efficitur. Quisque ac pretium urna, at ornare lorem. Proin metus felis, tristique a egestas et, aliquet at mauris. Morbi nec pellentesque ipsum. Nam consectetur justo id sollicitudin bibendum. Suspendisse potenti. Morbi mollis pharetra dolor, a lobortis sem. Nam quis varius neque. Proin imperdiet dignissim dui, a suscipit dui lobortis id. Integer iaculis id felis nec semper. Donec nisl magna, condimentum sed nisi in, dictum cursus ligula. Proin efficitur risus semper commodo sollicitudin. Phasellus ullamcorper mauris nec quam tempus sollicitudin.
        </div>
    </article>
</template>

<script>
    export default {
    }
</script>

<style lang="scss" scoped>
    .feed {
        grid-area: auto / auto / span 2 / span 1;
        display: flex;
        flex-direction: column;
        padding: 1vw 1vw 0;

        &--title {
            margin-top: 0;
        }

        &--content {
            flex: 1;
            white-space: pre-line;
            overflow: hidden;
        }
    }
</style>

