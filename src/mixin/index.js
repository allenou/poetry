import VirtualList from "../components/VirtualList";

const mixin = {
    components: {
        VirtualList
    },
    data() {
        return {
            speech: window.SpeechSynthesisUtterance
        }
    },
    methods: {
        read(content) {
            const ssu = new window.SpeechSynthesisUtterance();
            ssu.text = content;
            window.speechSynthesis.speak(ssu);
        },
        matchTitle(title) {
            title.includes(this.keyword)
        },
        matchContent(content) {
            let result = false;
            for (let i = 0; i < content.length; i++) {
                result = content[i].includes(this.keyword)
                if (result) { break }
            }
            return result;
        }
    }
}
export default mixin