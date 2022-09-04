<script setup lang="ts">
import { routes } from '@/router';
import type { RouteRecordRaw } from 'vue-router';

const nav = ref(routes)
const activeRoute = useRoute()
const router = useRouter()

const handleNavigate = (route: RouteRecordRaw) => {
  if (activeRoute.name === route.name) {
    router.push('/')
  } else {
    router.push(route.path)
    const index = nav.value.findIndex(item => item.name === route.name)
    if (index !== 0) {
      const item = nav.value.splice(index, 1)
      console.log(item);
      nav.value.unshift(item[0])
      console.log(nav.value);
    }
  }
}
</script>
  <template>

  <nav class="nav" :class="{ collapsed: activeRoute.path !== '/' }">
    <ul>
      <li v-for="route in routes">
        <div class="content">
          <div border="2 black" p="x-2px y-2px" @click="handleNavigate(route)">
            <div border="1 black" p="x-2 y-10" relative>
              <h1 text="6xl">
                {{ route.meta?.title }}
              </h1>
              <div class="seal">
                <img src="../assets/seal.png" alt="" class="img">
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </nav>
</template>
  
  <style scoped lang="scss">
  ul {
    height: 70%;
    writing-mode: vertical-lr;
    transition: width 500ms;
  }
  
  h1 {
    letter-spacing: 30px;
  }
  
  .collapsed {
    width: 134px !important;
  }
  
  .content {
    @apply bg-white px-2 py-2 mx-4;
  }
  
  .nav {
    @apply py-4 fixed w-full h-100vh bg-blue-900 overflow-hidden;
  }
  
  .seal {
    @apply absolute left-0 right-0 bottom-4 flex;
  
    img {
      @apply block w-8 h-8 m-auto;
    }
  }
  </style>