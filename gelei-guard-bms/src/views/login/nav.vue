<template>
  <div class="navigation-page">
    <h1 class="title">欢迎使用格雷盒子后台管理系统</h1>
    <div class="nav-boxes">
      <router-link v-for="(nav, index) in navs" v-if="nav.visible" :key="index" :to="{name: nav.name}">
        <svg-icon icon-class="finger" />
        {{ nav.label }}
      </router-link>
    </div>
  </div>
</template>

<script>

import { NAVIGATION_PAGES } from '@/views/login/data/nav_data'
import { mapGetters } from 'vuex'

export default {
  name: 'NavigationPage',
  components: {},
  data() {
    return {
      navs: NAVIGATION_PAGES
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ])
  },
  mounted: function() {
    this.init_page_links()
  },
  methods: {
    init_page_links: function() {
      const _perms = this.get_all_routes(this.permission_routes)
      const navs = NAVIGATION_PAGES.filter(r => {
        return _perms.indexOf(r.name) !== -1
      })
      console.log('navs: ', navs)
      this.navs = navs
    },
    get_all_routes: function(permissions) {
      const _perms = []

      function _recursion(perms) {
        perms.map(r => {
          if (r.name) {
            _perms.push(r.name)
          }
          if (r.children && r.children.length) {
            _recursion(r.children)
          }
        })
      }

      _recursion(permissions)
      return _perms
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navigation-page {
  width: 100%;
  height: 100%;
  padding: 20px 10px 25px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    color: #454545;
  }

  .nav-boxes {
    margin: 10px auto;
    width: 800px;
    display: flex;
    color: #70a0d2;
    width: 120px;
    flex-direction: column;
    justify-content: center;
    align-items: start;

    a {
      height: 32px;
    }

    a:hover {
      color: #1476de;
    }
  }
}
</style>
