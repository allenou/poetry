<script setup lang="ts">
import { routes } from '@/router'
import type { RouteRecordRaw } from 'vue-router'
import usePinyin from '@/hooks/usePinyin'
import useTtsEnabled from '@/hooks/useTtsEnabled'

const nav = ref(routes)
const activeRoute = useRoute()
const router = useRouter()
const { enabled, toggle } = usePinyin()
const { enabled: ttsEnabled, toggle: toggleTts } = useTtsEnabled()

const handleNavigate = (route: RouteRecordRaw) => {
  // 直接导航到目标路由，不使用复杂的判断逻辑
  router.push(route.path)
}
</script>
<template>
  <nav class="sidebar">
    <div class="sidebar-header">
      <h1 class="site-title">中文古诗词</h1>
      <div class="seal-decoration">
        <img src="../assets/seal.png" alt="印章" class="seal-img">
      </div>
    </div>

    <ul class="nav-list">
      <li
        v-for="route in routes"
        :key="route.name"
        class="nav-item"
        :class="{ active: activeRoute.path === route.path }"
      >
        <div class="nav-link" @click="handleNavigate(route)">
          <span class="nav-title">{{ route.meta?.title }}</span>
        </div>
      </li>
    </ul>

    <div class="sidebar-footer">
      <button
        class="pinyin-toggle"
        type="button"
        :aria-pressed="enabled"
        @click="toggle"
      >
        <div class="toggle-text">
          <span class="toggle-label">注音</span>
        </div>
        <span class="toggle-indicator" :class="{ active: enabled }">
          <span class="toggle-dot"></span>
        </span>
      </button>

      <button
        class="tts-toggle"
        type="button"
        :aria-pressed="ttsEnabled"
        @click="toggleTts"
      >
        <div class="toggle-text">
          <span class="toggle-label">朗读</span>
        </div>
        <span class="toggle-indicator" :class="{ active: ttsEnabled }">
          <span class="toggle-dot"></span>
        </span>
      </button>
    </div>
  </nav>
</template>
  
  <style scoped lang="scss">
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 200px;
  height: 100vh;
  background: linear-gradient(180deg, #8b2635 0%, #6b1c28 100%);
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow-y: auto;
}

.sidebar-header {
  padding: 2rem 1.5rem 1.5rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.site-title {
  font-size: 1.5rem;
  color: #f8f4e9;
  margin-bottom: 1rem;
  font-weight: 300;
  letter-spacing: 4px;
}

.seal-decoration {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.seal-img {
  width: 48px;
  height: 48px;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
}

.nav-list {
  list-style: none;
  padding: 1rem 0;
  margin: 0;
}

.nav-item {
  margin: 0.5rem 1rem;
}

.nav-link {
  display: block;
  padding: 0.8rem 1rem;
  color: #f8f4e9;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(4px);
  }
}

.nav-item.active .nav-link {
  background: rgba(248, 244, 233, 0.15);
  border-left: 3px solid #f8f4e9;
}

.nav-title {
  font-size: 1.1rem;
  letter-spacing: 2px;
}

.sidebar-footer {
  margin: 2rem 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  color: #f8f4e9;
}

.pinyin-toggle,
.tts-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(248, 244, 233, 0.2);
  background: rgba(255, 255, 255, 0.08);
  color: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pinyin-toggle:hover,
.tts-toggle:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(248, 244, 233, 0.4);
}

.pinyin-toggle[aria-pressed='true'],
.tts-toggle[aria-pressed='true'] {
  background: rgba(248, 244, 233, 0.2);
  border-color: rgba(248, 244, 233, 0.6);
  box-shadow: 0 6px 18px rgba(248, 244, 233, 0.2);
}

.toggle-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
}

.toggle-label {
  font-size: 1rem;
  letter-spacing: 2px;
}

.toggle-status {
  font-size: 0.8rem;
  opacity: 0.7;
}

.toggle-indicator {
  position: relative;
  width: 46px;
  height: 22px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.25);
  transition: background 0.3s ease;
}

.toggle-indicator.active {
  background: #f6ad55;
}

.toggle-dot {
  position: absolute;
  top: 2px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.3s ease;
}

.toggle-indicator.active .toggle-dot {
  transform: translateX(22px);
  background: #fff8e6;
}

.toggle-hint {
  margin-top: 0.8rem;
  font-size: 0.85rem;
  line-height: 1.4;
  opacity: 0.75;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;

    &.mobile-open {
      transform: translateX(0);
    }
  }
}
  </style>
