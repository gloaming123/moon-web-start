<script setup lang="ts">
import MainHeader from './components/MainHeader.vue'
import MainClock from './components/MainClock.vue'
import SiteContainer from './components/SiteContainer.vue'
import MainSetting from './components/MainSetting.vue'

defineOptions({
  name: 'HomePage',
})

const settingStore = useSettingStore()
</script>

<template>
  <TheDoc>
    <div my="0 sm:6vh" p="12 sm:24" bg="$main-bg-c" w="full sm:auto" :class="{ no_select: settingStore.isSetting }">
      <MainHeader />
      <MainClock v-if="!settingStore.isSetting" />
      <SiteContainer :key="settingStore.siteContainerKey" />
      <MainSetting />
      <TheFooter v-if="settingStore.getSettingValue('showFooter')" />
    </div>
    <Blank />
  </TheDoc>
</template>

<route lang="yaml">
path: /
children:
  - name: setting
    path: setting
    component: /src/components/Blank.vue
</route>
