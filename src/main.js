import Vue from "vue";
import pinyin from "pinyin";

import App from "./App.vue";
import store from "./store";
import router from "./router";
import mixin from "./mixin";
import "./styles/tailwindcss.css";
import "tailwindcss/tailwind.css";

Vue.mixin(mixin);
Vue.config.productionTip = false;
{
  /* <ruby>
关<rp>（</rp><rt>guān</rt><rp>）</rp>
关<rp>（</rp><rt>guān</rt><rp>）</rp>
雎<rp>（</rp><rt>jū</rt><rp>）</rp>
鸠<rp>（</rp><rt>jiū</rt><rp>）</rp>
，<rp>（</rp><rt></rt><rp>）</rp>
在<rp>（</rp><rt>zài</rt><rp>）</rp>
河<rp>（</rp><rt>hé</rt><rp>）</rp>
之<rp>（</rp><rt>zhī</rt><rp>）</rp>
洲<rp>（</rp><rt>zhōu</rt><rp>）</rp>
</ruby> */
}

Vue.prototype.highlight = function(content, keyword) {
  if (!keyword || !content.includes(keyword)) {
    return content
      .split("")
      .map((word) => {
        return `<ruby><rp>（</rp><rt>${
          !["，", "。","：","“","”","？","！","；","《","》"].includes(word) ? pinyin(word, { heteronym: true }) : ""
        }</rt><rp>）</rp>${word}</ruby>`;
      })
      .join("");
  }
  console.log(
    pinyin(keyword, {
      heteronym: true,
    })
  );
  return content.split(keyword).join(
    `<b class="keyword"><ruby>${keyword}<rp>（</rp><rt>${pinyin(keyword, {
      heteronym: true,
    })}</rt><rp>）</rp></ruby></b>`
  );
};

Vue.prototype.pinyin = function(content) {
  // const pattern = /[`~!@#_$%^&*()=|{}':;',.<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？\s]/g;
  // console.log(content.replae(pattern, content));
  return pinyin(content).flat();
};

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
