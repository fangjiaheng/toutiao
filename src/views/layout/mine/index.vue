<template>
  <div>
    <!-- 1.1 -->
    <div class="baseInfo" v-if="user">
      <van-cell class="userInfo" center :border='false'>
        <div slot="icon">
          <van-image
            class="avator"
            round
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div slot="title" class="nicheng">昵称</div>
        <div slot="default">
          <van-button
            size="mini"
            round
            >
            编辑资料
          </van-button>
        </div>
      </van-cell>
      <!-- 1.2 -->
      <van-grid :border='false'>
        <van-grid-item class="singleItem">
          <div slot="icon" class="item-num">1234</div>
          <div slot="text" class="item-name">头条</div>
        </van-grid-item>
        <van-grid-item class="singleItem">
          <div slot="icon" class="item-num">1234</div>
          <div slot="text" class="item-name">关注</div>
        </van-grid-item>
        <van-grid-item class="singleItem">
          <div slot="icon" class="item-num">1234</div>
          <div slot="text" class="item-name">粉丝</div>
        </van-grid-item>
        <van-grid-item class="singleItem">
          <div slot="icon" class="item-num">1234</div>
          <div slot="text" class="item-name">获赞</div>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 1.3 -->
    <div class="notLogin" v-else>
      <div class="notLoginImage">
        <van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" round fit="cover" />
      </div>
      <span @click="$router.push('/login')">点击登录</span>
    </div>
    <!-- 2 -->
    <van-grid clickable :column-num="2">
      <van-grid-item class="star" icon="star-o" text="收藏" />
      <van-grid-item class="underway" icon="underway-o" text="历史" />
    </van-grid>
    <!-- 3 -->
    <van-cell class="notice" title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell class="exitLogin" title="退出登录" v-if="user" @click="exitLogin"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
// import { removeLocalStorage } from '@/utils/transform.js'
export default {
  name: 'mine',
  data () {
    return {

    }
  },
  created: function () {
    this.httpUserInfo()
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    // 退出登录的操作
    exitLogin () {
      this.$dialog.confirm({
        title: '退户确认',
        message: '退出当前头条账号,将不能同步收藏,发布评论和云端分享等'
      })
        .then(() => {
          // on confirm
          // removeLocalStorage('user')
          this.$store.commit('getUserInfo', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    httpUserInfo () {
      // 获取当前用户的数据信息
      console.log('正在请求数据')
      getUserInfo()
    }
  }
}
</script>

<style lang='less'>
.baseInfo{
  background: url('./1.jpg') no-repeat;
  background-position: -127px 0;
  .userInfo{
    height: 115px;
    padding-top: 30px;
    padding-bottom: 11px;
    background-color: unset;
    .avator{
      margin-right: 5px;
      width: 60px;
      height: 60px;
      border: 1px solid white;
    }
    .nicheng{
      color: white;
    }
  }
  .singleItem{
    height: 65px;
    .item-num{
      font-size: 18px;
      color: white;
    }
    .item-name{
      font-size: 12px;
      color: white;
    }
  }
  .van-grid-item__content{
    background-color: unset;
  }
}
.star{
  height: 70px;
  .van-icon-star-o{
    &::before{
      color: red;
    }
  }
}
.underway{
  height: 70px;
  .van-icon-underway-o{
    &::before{
      color: orange;
    }
  }
}
.notice{
  margin-top: 5px;
}
.exitLogin{
  margin-top: 5px;
  text-align: center;
  color: rgb(192, 71, 34);
}
.notLogin{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 180px;
  text-align: center;
  background: url('./1.jpg') no-repeat;
  span{
    color: white;
    font-size: 16px;
  }
}
</style>
