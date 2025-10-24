<script setup lang="ts">
import { routes } from '@/router';
import type { RouteRecordRaw } from 'vue-router';

const nav = ref(routes)
const activeRoute = useRoute()
const router = useRouter()

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