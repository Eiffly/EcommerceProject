<template>
  <div class="type-nav">
    <div class="container" @mouseleave="leaveShow()" @mouseenter="enterShow()">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!-- 添加动画效果 -->
      <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-show="index !== 16"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              @mouseenter="mouseenter(index)"
              :class="{ cur: curIndex == index }"
            >
              <h3>
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div
                class="item-list clearfix"
                :style="{ display: curIndex === index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>



<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      curIndex: -1,
      show: true,
    };
  },
  mounted() {
    //挂载完毕后 进行事件的委派
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (value) => value.home.categoryList,
    }),
  },
  methods: {
    // 事件一:鼠标移入，背景颜色变成天蓝色
    mouseenter: throttle(function (index) {
      this.curIndex = index;
    }, 50),
    // 事件二：鼠标离开，背景恢复到之前的颜色
    leaveShow() {
      if (this.$route.path !== "/home") {
        this.show = false;
      }
      this.curIndex = -1;
    },
    // 事件三：点击相应的内容后，路由进行了跳转
    goSearch(event) {
      let element = event.target;
      // console.log(element.dataset);
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;

      if (categoryname) {
        let location = { name: "Search" }; //跳转路由name
        //添加相应的对象
        let query = { categoryName: categoryname };
        if (category1id) {
          //向对象的身上添加相应的属性
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // 将路由信息进行合并
        if (this.$route.params) {
          location.params = this.$route.params;
          //整理完参数
          location.query = query;
          //路由跳转
          this.$router.push(location);
        }
      }
    },
    // 事件四：鼠标移入的时候，
    enterShow() {
      if (this.$route.path !== "/home") {
        this.show = true;
      }
    },
  },
};
</script>

<style lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    //过度动画开始状态（进入）
    .sort-enter {
      height: 0px;
    }
    // 过渡动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画的时间和速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>