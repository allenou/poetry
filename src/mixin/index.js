
const mixin = {
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
            if (title.includes(this.keyword)) {
                return true;
            }
        },
        matchContent(content) {
            let result = false;
            const keyword = this.keyword;
            for (let i = 0; i < content.length; i++) {
                if (content[i].includes(keyword)) {
                    result = true;
                    break;
                }
            }
            return result;
        }
    }
}
export default mixin
// https://www.cnblogs.com/jiangxiaobo/p/6276879.html