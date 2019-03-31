
const mixin = {
    data() {
        return {
            speech: window.SpeechSynthesisUtterance
        }
    },
    methods: {
        speak(content) {
            const speech = new window.SpeechSynthesisUtterance();
            speech.text = content;
            window.speechSynthesis.speak(speech);
        }
    }
}
export default mixin
// https://www.cnblogs.com/jiangxiaobo/p/6276879.html