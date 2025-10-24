<script setup lang="ts">
defineProps({
  loading: Boolean
})
</script>
<template>
  <div v-if="loading" text="center">加载中...</div>
  <div v-else px-4 py-4>
    <div class="wrap">
      <article>
        <slot></slot>
      </article>
    </div>
  </div>
</template>

<style  lang="scss">
.wrap {
  // overflow-y: auto;
  // overflow-x: hidden;
  // max-width: 1200px;
  margin: 0 auto;
  // background: rgba(255, 255, 255, 0.95); 
  // border-radius: 16px;
  // box-shadow:
  //   0 8px 32px rgba(139, 38, 53, 0.1),
  //   inset 0 1px 0 rgba(255, 255, 255, 0.6);
  padding: 4rem 5rem;
  // max-height: calc(100vh - 6rem);
  // position: relative;
  // border: 1px solid rgba(139, 38, 53, 0.1);
}

.wrap::before {
  content: '';
  position: absolute;
  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;
  border: 1px solid rgba(139, 38, 53, 0.15);
  border-radius: 12px;
  pointer-events: none;
}

article {
  letter-spacing: 3px;
  line-height: 2.2;
  color: #3e2723;
  font-size: 1.2rem;
  font-family: 'Noto Serif SC', serif;
  position: relative;
  z-index: 1;
}

h2 {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 3rem;
  color: #8b2635;
  text-align: center;
  letter-spacing: 6px;
  border-bottom: 3px solid #d4af37;
  padding-bottom: 1.5rem;
  position: relative;
}

// h2::after {
//   content: '❦';
//   position: absolute;
//   bottom: -12px;
//   left: 50%;
//   transform: translateX(-50%);
//   background: #faf7f0;
//   padding: 0 1rem;
//   color: #d4af37;
//   font-size: 1.5rem;
// }

h3 {
  font-size: 2.2rem;
  font-weight: 500;
  margin: 3rem 0 2rem;
  color: #6b1c28;
  letter-spacing: 4px;
  text-align: center;
  position: relative;
}

h3::before,
h3::after {
  content: '◆';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #d4af37;
  font-size: 0.8rem;
}

h3::before {
  left: -2rem;
}

h3::after {
  right: -2rem;
}

h4 {
  font-size: 1.6rem;
  font-weight: 500;
  margin: 2.5rem 0 1.5rem;
  color: #8b2635;
  letter-spacing: 3px;
  padding-left: 2rem;
  position: relative;
}

h4::before {
  content: '◉';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #d4af37;
}

.line {
  padding: 1.2rem 0;
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
  color: #3e2723;
  border-bottom: 1px solid #e8d5d8;
  transition: all 0.3s ease;
  padding-left: 1rem;
  position: relative;

  &:hover {
    background-color: rgba(139, 38, 53, 0.03);
    padding-left: 1.5rem;
    border-left: 3px solid #d4af37;
  }
}

.line::before {
  content: '·';
  position: absolute;
  left: 0;
  color: #d4af37;
  font-size: 1.5rem;
  line-height: 1;
}

@media (max-width: 1200px) {
  .wrap {
    max-width: 95%;
    padding: 3rem 4rem;
  }
}

@media (max-width: 768px) {
  .wrap {
    padding: 2rem 2.5rem;
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }

  h2 {
    font-size: 2.2rem;
    letter-spacing: 4px;
  }

  h3 {
    font-size: 1.8rem;
  }

  .line {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .wrap {
    padding: 1.5rem 2rem;
  }

  h2 {
    font-size: 1.8rem;
    letter-spacing: 2px;
  }

  h3::before,
  h3::after {
    display: none;
  }
}
</style>