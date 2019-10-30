<template>
  <div @click.stop>
    <div class="mask" v-show="isShowAudioList" @click="showAudioList"></div>
    <transition name="list-show" mode="out-in">
      <div class="audio-list pd23" v-show="isShowAudioList">
        <div class="list-title border-bottom">
          <div class="left">
            <span @click="changeMode">
              <i class="audio" :class="[modeClass]"></i>
              <span>{{ modeText }}</span>
              <span class="list-num">({{ num }})</span>
            </span>
          </div>
          <div class="right">
            <span>
              <i class="audio audiowenjianjia"></i>
              收藏全部
            </span>
            <span>
              <i class="audio audiolajitong"></i>
            </span>
          </div>
        </div>
        <ul class="scroll">
          <li
            class="list-item"
            v-for="(item, index) in audioList"
            :key="index"
            @click="audioThis(item, index)"
            :class="isActive(item)"
          >
            <i class="audio audiovolume"></i>
            <div class="info">
              <span class="name">
                <i>{{item.name}}</i>
              </span>
              <span class="artist">
                <i v-for="(item, index) in artist(item)" :key="index">{{ item.name }}</i>
              </span>
            </div>
            <!-- 删除此项歌曲 -->
            <span @click.stop="deleteSong(item)">
              <i class="audio audiochushaixuanxiang"></i>
            </span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>