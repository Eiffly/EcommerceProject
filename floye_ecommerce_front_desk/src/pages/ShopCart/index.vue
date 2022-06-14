<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="carInfo in carInfoLists" :key="carInfo.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="carInfo.isChecked == 1"
              @change="updateChecked(carInfo, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="carInfo.imgUrl" />
            <div class="item-msg">{{ carInfo.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ carInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('mins', -1, carInfo)"
              >-</a
            >
            <!-- 注意这里用的是value -->
            <input
              autocomplete="off"
              type="text"
              :value="carInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, carInfo)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, carInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ carInfo.skuNum * carInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleCart(carInfo)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && carInfoLists.length !== 0"
          @change="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allSum }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    // 一开始显示Array(0) 因为数据不知道是谁登陆的,需要有一个固定的用户
    this.getData();
  },
  computed: {
    ...mapGetters(["cartInfoList"]),
    // 所有的商品的列表
    carInfoLists() {
      return this.cartInfoList.cartInfoList || [];
    },
    // 是否是全选
    isAllChecked() {
      return this.carInfoLists.every((item) => item.isChecked === 1);
    },
    // 计算总价
    allSum() {
      let sum = this.carInfoLists.reduce(
        (previousValue, current) =>
          previousValue + parseInt(current.skuPrice) * parseInt(current.skuNum),
        0
      );
      return sum;
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("getCarList");
    },
    // 删除某一项商品
    deleCart: throttle(async function (carInfo) {
      try {
        await this.$store.dispatch("deleteCarList", carInfo.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 50),

    //修改某一个产品的勾选状态
    async updateChecked(cart, event) {
      //带给服务器的参数isChecked，不是布尔值，应该是0|1
      try {
        //如果修改数据成功，再次获取服务器数据（购物车）
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("updateCheckedById", {
          skuId: cart.skuId,
          isChecked,
        });
        this.getData();
      } catch (error) {
        //如果失败提示
        alert(error.message);
      }
    },

    // 删除所有选中的商品
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch("deleteAllCheckedCart");
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },

    //更新产品的全选状态
    async updateAllCartChecked(event) {
      let isChecked = event.target.checked ? "1" : "0";
      try {
        await this.$store.dispatch("updateAllCarIsChecked", isChecked);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //改变产品数量事件,需要用到节流
    handler: throttle(async function (type, curNum, carInfo) {
      // console.log(type, curNum, carInfo);
      switch (type) {
        case "mins":
          if (carInfo.skuNum > 1) {
            curNum = -1;
          } else {
            curNum = 0;
          }
          break;
        case "add":
          curNum = 1;
          break;
        case "change":
          //有三种情况
          if (isNaN(curNum) || curNum < 0) {
            curNum = 0;
          } else {
            // 当前的数据
            curNum = parseInt(curNum) - carInfo.skuNum;
          }
          break;
      }
      try {
        await this.$store.dispatch("addorUpdateShopCar", {
          skuId: carInfo.skuId,
          skuNum: curNum,
        });
        //商品数量修改成功后再次获取服务器数据
        await this.$store.dispatch("getCarList");
      } catch (error) {
        alert(error);
      }
    }, 50),
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>