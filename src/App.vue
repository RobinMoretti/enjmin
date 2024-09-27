<script setup>
import { reactive, ref } from "vue";
import emitter from "./tools/emitter";
// import HelloWorld from './components/HelloWorld.vue'

const selectedGame = ref(0);
let axes = ref([]);

let gamepadCount = ref(0);

let isPressed;

// const emitter = inject('emitteremitter')

let upPressed, downPressed, leftPressed, rightPressed;
window.addEventListener("gamepadconnected", function (e) {
    gamepadCount++;
    var gp = navigator.getGamepads()[e.gamepad.index];
	
	console.log("gamepadconnected");

    setInterval(function () {
        if (gp.axes[1] == 1) {
            if (!rightPressed) {
                emitter.emit("player1-right-pressed");
            }

            rightPressed = true;
            emitter.emit("player1-right");
        } else {
            rightPressed = false;
        }

        if (gp.axes[1] == -1) {
            if (!leftPressed) {
                emitter.emit("player1-left-pressed");
            }

            leftPressed = true;
            emitter.emit("player1-left");
        } else {
            leftPressed = false;
        }

        if (gp.axes[2] == 1) {
            if (!downPressed) {
                emitter.emit("player1-down-pressed");
            }

            downPressed = true;
            emitter.emit("player1-down");
        } else {
            downPressed = false;
        }

        if (gp.axes[2] == -1) {
            if (!upPressed) {
                emitter.emit("player1-up-pressed");
            }

            upPressed = true;
            emitter.emit("player1-up");
        } else {
            upPressed = false;
        }

        for (let i = 0; i < gp.buttons.length; i++) {
            const button = gp.buttons[i];

            if (button.pressed) {
                emitter.emit("button-" + i);
            }
        }
    }, 100);
});
</script>

<template>
	<RouterView />
</template>

<style scoped>
.selected {
    border: solid 1px black;
}
</style>
