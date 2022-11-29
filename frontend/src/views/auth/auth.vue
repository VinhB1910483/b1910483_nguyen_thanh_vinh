<template>
  <div class="auth">
    <div class="auth-from">
      <!-- Nav -->
      <ul class="nav mb-1">
        <li class="nav-item">
          <router-link
            to="/auth/signin"
            class="nav-link"
            :class="{ active: authAction === 'signin' }"
            id="tab-login"
            >Đăng Nhập
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/auth/signup"
            class="nav-link"
            :class="{ active: authAction === 'signup' }"
            id="tab-register"
            >Đăng Ký
          </router-link>
        </li>
      </ul>

      <div class="orther-auth text-center">
        <p>{{authAction==='signin'?'Đăng nhập':'Đăng ký'}} với:</p>
        <div class="btn-group">
          <button type="button" class="btn btn-link">
            <font-awesome-icon icon="fa-brands fa-facebook"></font-awesome-icon>
          </button>

          <button type="button" class="btn btn-link">
            <font-awesome-icon icon="fa-brands fa-google"></font-awesome-icon>
          </button>

          <button type="button" class="btn btn-link">
            <font-awesome-icon icon="fa-brands fa-twitter"></font-awesome-icon>
          </button>

          <button type="button" class="btn btn-link">
            <font-awesome-icon icon="fa-brands fa-github"></font-awesome-icon>
          </button>
        </div>
      </div>

      <div class="content">
        <div v-if="authAction === 'signin'" class="auth-form signin-form">
          <SigninForm />
        </div>

        <div v-else class="auth-form signup-form">
          <SignupForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SigninForm from './components/SignInForm.vue';
import SignupForm from './components/SignUpForm.vue';
import { computed, watch } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

const route = useRoute();
const authAction = computed(() => route.params.action);
</script>

<style lang="scss">
.mb-1 {
  margin-bottom: 0.5rem;
}
.btn {
  padding: 5px 8px 4px;
}
.text-center {
  text-align: center;
}
.form-feedback {
  color: var(--red);
}
.error-feedback {
  margin-left: 10px;
  color: var(--red);
  font-size: 0.8rem;
}
.auth {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  user-select: none;
  .auth-from {
    background-color: white;
    padding: 30px;
    margin: 20vh;
    box-shadow: 5px 5px 25px #9dcab6;
    border-radius: 10px;
    .orther-auth {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        color: var(--text-light-2);
      }

      .btn-group {
        & > * {
          margin: 0px 5px;
        }
      }
    }
    .nav {
      display: flex;
      justify-content: center;
      gap: 10px;

      .nav-link {
        display: block;
        text-align: center;
        color: #aaaaaa;
        padding: 0 5px;
        cursor: pointer;
        &.active {
          font-weight: 600;
          background-color: #ddd;
          color: hsl(160deg, 100%, 37%);
        }
        &:hover {
          background-color: #eee;
        }
      }
    }

    .content {
      .auth-form {
        color: var(--text-light-2);
        .form-text-control {
          margin: 10px 0 6px;

          .input-field {
            position: relative;

            input {
              width: 400px;
              height: 40px;
              border-radius: 5px;
              padding-left: 5px;
            }
            input:not(:placeholder-shown) ~ label,
            input:focus ~ label {
              display: none;
            }
            label {
              position: absolute;
              user-select: none;
              top: 50%;
              transform: translateY(-50%);
              left: 10px;
            }
          }
        }
        .form-control-end {
          display: flex;
          justify-content: space-between;
          .form-checkbox {
            display: flex;
            justify-content: space-between;
            .form-check-input {
              appearance: checkbox;
            }
            .form-check-label {
              padding-left: 4px;
              cursor: pointer;
            }
          }
          /* .from-forgot {} */
        }
        .from-submit.center {
          display: flex;
          justify-content: center;
        }
        .form-submit-btn {
          font-size: 20px;
          margin: 10px;
        }
      }
    }
  }
}
</style>
