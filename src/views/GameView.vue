<script setup>
import emitter from "./../tools/emitter";
import { useRoute, useRouter } from "vue-router";

import { ref, onMounted, onUnmounted } from "vue";

const route = useRoute();
const router = useRouter();

const props = defineProps({
  id: Number
})

let games = [
    "https://editor.p5js.org/atocorp.af/full/vRPzShbMK",
    "https://editor.p5js.org/paul.bouyer.pro/full/yr-U447Us",
]

let url = games[props.id];


emitter.on("button-2", (evt) => {
    // this.testEvent = evt.eventContent;
    // console.log('selectedGame', selectedGame.value)
    router.push({ name: 'home' })
});


</script>

<template>
    <div class="game-content">
        <iframe :src="url"></iframe>
    </div>
</template>

<style scoped>
.game-content, iframe{
    width: 100%;
    height: 100%;
    border: 0px; 
}
</style>
