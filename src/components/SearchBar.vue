<template>
  <header>
    <input type="search" :placeholder="placeholder" v-model="keyword">
    <i
      class="iconfont"
      :class="{'speaking':isSpeaking}"
      @click="speak"
      v-if="isRecognition"
    >&#xe65a;</i>
  </header>
</template>
<script>
export default {
  data() {
    return {
      keyword: "",
      placeholder: "输入关键字进行搜索",
      isSpeaking: false,
      lang: "zh-Hans",
      isRecognition: window.SpeechRecognition || window.webkitSpeechRecognition
    };
  },
  watch: {
    keyword(keyword) {
      this.$store.commit("setKeyword", keyword);
    },
    "$route.path"(path) {
      this.keyword = "";
      if (path.includes("shijing")) {
        this.lang = "zh-Hans";
      } else {
        this.lang = "zh-Hant";
      }
    }
  },
  methods: {
    speak() {
      this.isSpeaking = true;
      this.placeholder = "说出关键字进行搜索";
      window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      const _this = this;
      const recognition = new SpeechRecognition();
      recognition.lang = this.lang;
      recognition.interimResults = true;
      recognition.maxAlternatives = 7;
      recognition.start();

      recognition.onresult = function(e) {
        const transcript = Array.from(e.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join("");

        if (e.results[0].isFinal) {
          _this.keyword = transcript;
          console.log("You said: ", transcript);
        }
      };
      recognition.onend = function() {
        _this.isSpeaking = false;
        _this.placeholder = "输入关键字进行搜索";
      };
    }
  }
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  /* position: fixed;
  top: 0; */
  width: 80%;
  margin: 30px auto;
  padding-right: 10px;
  /* margin: 30px; */
  /* margin: auto; */
  text-align: center;
  /* background-color: #232323; */
  background-color: #fff;
}
header input {
  flex: 1;
  height: 36px;

  /* margin: auto; */
  border: none;
  outline: none;
  text-indent: 14px;
}
.iconfont {
  cursor: pointer;
}
.speaking {
  color: #e74c3c;
}
</style>
