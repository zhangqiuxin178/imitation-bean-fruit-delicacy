<template>
  <div class="about">
    <div class="bar">
      <div class="left"></div>
      <div class="right"></div>
    </div>

    <div class="content">
      <h2>豆果美食,<br>会做饭很酷~</h2>
      <div class="boot">手机号登录</div>
      <div class="wx-login">微信号登录</div>
    </div>

    <div class="login-func">其他登录方式</div>

    <div class="foot">
      <div class="qq">
        <img src="../assets/res/drawable-xxhdpi-v4/icon_login_qq.png">
      </div>
      <div class="wb">
        <img src="../assets/res/drawable-xxhdpi-v4/icon_login_weibo.png">
      </div>
      <div class="sjh">
        <img src="../assets/res/drawable-xxhdpi-v4/icon_login_cmcc.png">
      </div>
    </div>
    <div class="user-check">
      <input type="checkbox"> <span class="one">登录注册即表示同意 <span class="two">《用户协议》</span> 和 <span
          class="two">《隐私条款》</span></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 45px;
  background-color: white;

  .left {
    width: 20px;
    height: 20px;
    margin-top: 16px;
    margin-left: 15px;
    background-image: url(../assets/res/drawable-xxhdpi-v4/bdpapp_m_icon_settings_menu_item.png);
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .right {
    width: 20px;
    height: 20px;
    margin-right: 15px;
    margin-top: 16px;
    background-image: url(../assets/res/drawable-xxhdpi-v4/icon_menu_message.png);
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: center center;
  }
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 50px;
  width: 100vw;
  height: 70vh;

  h2 {
    margin-top: 30px;
    margin-left: 15px;
    font-size: 28px;
    font-weight: 700;
  }

  .boot {
    width: 90vw;
    height: 45px;
    line-height: 45px;
    border-radius: 999px;
    text-align: center;
    margin: 0 auto;
    margin-top: 180px;
    background-color: #fc0;
  }

  .wx-login {
    width: 90vw;
    height: 45px;
    line-height: 45px;
    border-radius: 999px;
    text-align: center;
    margin: 0 auto;
    color: #fc0;
    border: 1px solid #fc0;
    background-color: #fff;
  }
}

.login-func {
  margin-top: 10px;
  margin-left: 5px;
  font-size: 12px;
  color: #777;
}

.foot {
  display: flex;
  margin-top: 15px;
  margin-left: 5px;

  .qq {
    margin-right: 20px;
    width: 40px;
    height: 40px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .wb {
    margin-right: 20px;
    width: 40px;
    height: 40px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .sjh {
    width: 40px;
    height: 40px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.user-check {
  margin-top: 10px;

  input[type="checkbox"]::before {
    position: relative;
    content: "";
    top: -1px;
    left: -3px;
    width: 17px;
    height: 17px;
    display: block;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #ff670c;
    z-index: 5;
  }

  input[type="checkbox"]:checked::after {
    position: relative;
    content: "";
    bottom: 15px;
    left: 2px;
    width: 9px;
    height: 9px;
    display: block;
    border-radius: 50%;
    visibility: visible;
    background-color: #ff670c;
    z-index: 6;
  }

  .one {
    font-size: 12px;
    color: #777;
  }

  .two {
    color: #8ebcc2;
  }

}
</style>