<script setup>
import { ref } from "vue";
import emitter from "./../tools/emitter";
import { useRouter } from "vue-router";
const router = useRouter();

const selectedGame = ref(0);

emitter.on("player1-down-pressed", (evt) => {
    selectedGame.value++;
    if (selectedGame.value > 1) selectedGame.value = 0;
    if (selectedGame.value < 0) selectedGame.value = 1;
    // this.testEvent = evt.eventContent;
});
emitter.on("player1-up-pressed", (evt) => {
    selectedGame.value--;
    if (selectedGame.value > 1) selectedGame.value = 0;
    if (selectedGame.value < 0) selectedGame.value = 1;
    // this.testEvent = evt.eventContent;
});

emitter.on("button-2", (evt) => {
    // this.testEvent = evt.eventContent;
    console.log('selectedGame', selectedGame.value)
    router.push({ name: 'game', params: { id: selectedGame.value} })
});

function goGame(){
    router.push({ name: 'game', params: { id: selectedGame.value} })
}


let games = [
    {
        title: `Just Shapes and Tears`,
        team: `Faer Souville - GD, Léa Docteur - CDP, Gaby Laty - CV `,
        promotion: `ENJMIN - P20`,
        tagline: `Évitez les différentes attaques en déplaçant votre curseur et tentez de survivre le plus longtemps possible`,
        tuto: `Déplacez votre souris pour vous déplacer sur l'écran, appuyez sur SPACEBAR pour recommencer.`
    },
    {
        title: `£££`,
        team: `*** `,
        promotion: `ENJMIN - P21`,
        tagline: `£££`,
        tuto: `£££`
    },
]


</script>

<template>
    <div class="game-content">
        <div class="game" 
            v-for="(game, key) in games" :key="`key-`+ key" 
            :class="[selectedGame == key ? 'selected' : '']" 
            @mouseenter="selectedGame = key" @click="goGame">
            <h1>{{ game.title }}</h1>
            <p>{{ game.team }}</p>
            <p>{{ game.tagline }}</p>
            <p>{{ game.tuto }}</p>
        </div>
    </div>
</template>

<style scoped>
.selected {
    border: solid 1px black;
}
</style>
