<template>
  <div flex="~">
    <Aside />
    <main ml-134px>
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </main>
  </div>
</template>

