<template>
  <div>
    <search-inp ref="search" page="search" Right="54px"></search-inp>
    <history v-show="!loading"></history>
    <hot-search v-show="!loading" @returnKey = "setKey" @childFn="parentFn"></hot-search>
    <page-loading v-if="loading"></page-loading>
  </div>
</template>

<script>
import searchInp from '@/components/searchInput.vue';
import history from '@/components/history.vue';
import hotSearch from '@/components/hotSearch.vue';
import pageLoading from '@/components/Loading.vue';
export default {
  name: 'search',
  data () {
    return {
      hotSearchKey: '',
      loading: true
    }
  },
  components: {
    searchInp,
    history,
    hotSearch,
    pageLoading
  },
  activated () {
    this.setKey()
  },
  methods: {
    setKey (key) {
      if (key) {
        this.$refs.search.searchKey(key)
      }
    },
    parentFn (result) {
      this.loading = result;
    }
  }
}
</script>

<style lang="less" scoped>
</style>
