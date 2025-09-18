import { defineStore } from 'pinia';
import { ref } from 'vue';

// Define Interface
interface TimerConfig {
    focus: number;
    break: number;
    longBreak: number;
    nBreaks: number;
    goal: number;
}
interface Timer {
    time: number;
    count: number;
    isFocus: boolean;
    isRunning: boolean;
}

// Define Store
export const useTimerStore = defineStore('timer', () => {
    // Define Variables
    const timer = ref({
        time: 1500,
        count: 1,
        isFocus: true,
        isRunning: false,
    }as Timer);
    const timerConfig = ref({
        focus: 1500,
        break: 300,
        longBreak: 600,
        nBreaks: 4,
        goal: 4,
    }as TimerConfig);
    let timerObj:number;
    const status = ref('Focus');

    // Define Actions
    const startTimer = () => {
        timerObj = setInterval(()  => {
            timer.value.time--
        }, 1000) // One Second Delay
        timer.value.isRunning = true;
    }
    const pauseTimer = () => {
        timer.value.isRunning = false;
        clearInterval(timerObj)
    }
    const nextTimer = () => {
        if(timer.value.isFocus){
            if(timer.value.count === timerConfig.value.nBreaks){
                // status.value.type = "Long Break"
                timer.value.time = timerConfig.value.longBreak
                status.value = "Long Break"
            }else {
                status.value = "Break"
                timer.value.time = timerConfig.value.break
            }
        }else{
            if(status.value == "Break"){
                timer.value.count ++;
            } else {
                timer.value.count = 1;
            }
        status.value = "Focus"
        timer.value.time = timerConfig.value.focus
        }
        timer.value.isFocus = !timer.value.isFocus
    }

    return {
        timer,
        timerConfig,
        status,
        startTimer,
        pauseTimer,
        nextTimer,
    };
});