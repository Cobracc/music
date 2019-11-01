<template>
  <div>
    <ul class="list-wrap">
      <li
        class="list-item"
        :class="{active : item.id === _firstId }"
        v-for="(item) in firstList"
        :key="item.id"
        @click="selectFirst(item.id)"
      >{{item.text}}</li>
    </ul>
    <ul class="list-wrap">
      <li
        class="list-item"
        :class="{active : item.id === _secondId }"
        v-for="(item) in secondList"
        :key="item.id"
        @click="selectSecond(item.id)"
      >{{item.text}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    firstList: {
      type: Array
    },
    secondList: {
      type: Array
    },
    firstId: {
      type: String
    },
    secondId: {
      type: String
    }
  },
  computed: {
    _firstId: {
      get() {
        return this.firstId;
      },
      set(val) {
        this.$emit("updatefirstID", val);
      }
    },
    _secondId: {
      get() {
        return this.secondId;
      },
      set(val) {
        this.$emit("updatesecondID", val);
      }
    }
  },
  methods: {
    selectFirst(id) {
      this._firstId = id;
    },
    selectSecond(id) {
      this._secondId = id;
    }
  }
};
</script>

<style lang='less' scoped>
.list-wrap {
  display: flex;
  margin: 15.75px 0;
  list-style: none;
  .list-item {
    margin-right: 21px;
  }
}
.active {
  color: #dd001b;
}
</style>
