<template>
  <div class="app-layout">
    <Aside />
    <main class="main-content">
      <div class="content-background">
        <div class="paper-texture"></div>
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f2e8 0%, #e8dfd0 100%);
}

.main-content {
  flex: 1;
  margin-left: 200px;
  padding: 0;
  position: relative;
  transition: margin-left 0.3s ease;
}

.content-background {
  position: relative;
  min-height: 100vh;
  background:
    radial-gradient(circle at 20% 80%, rgba(139, 38, 53, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(139, 38, 53, 0.03) 0%, transparent 50%),
    linear-gradient(180deg, #faf7f0 0%, #f5f2e8 100%);
}

.paper-texture {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(139, 38, 53, 0.02) 2px,
      rgba(139, 38, 53, 0.02) 4px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(139, 38, 53, 0.02) 2px,
      rgba(139, 38, 53, 0.02) 4px
    );
  pointer-events: none;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}
</style>

