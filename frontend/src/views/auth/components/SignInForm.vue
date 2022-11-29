<template>
  <Form @submit="handleSignInSubmit" :validation-schema="schema">
    <p class="text-center mb-1">hoặc:</p>
    <p class="text-center form-feedback" v-if="signInMessage">
      {{ signInMessage }}
    </p>
    <!-- Email input -->
    <div class="form-text-control">
      <div class="input-field">
        <Field
          v-model="signInForm.signInUsername"
          type="text"
          id="signInUsername"
          name="signInUsername"
          autocomplete="on"
          placeholder=" "
          :disabled="signInLoad"
        />
        <label class="form-label" for="signInUsername"
          >Email hoặc tên đăng nhập</label
        >
      </div>
      <ErrorMessage name="signInUsername" class="error-feedback" />
    </div>

    <!-- Password input -->
    <div class="form-text-control">
      <div class="input-field">
        <Field
          v-model="signInForm.signInPassword"
          type="password"
          id="signInPassword"
          name="signInPassword"
          autocomplete="on"
          placeholder=" "
          :disabled="signInLoad"
        />
        <label class="form-label" for="signInPassword">Mật khảu</label>
      </div>
      <ErrorMessage name="signInPassword" class="error-feedback" />
    </div>

    <!-- 2 column grid layout -->
    <div class="form-control-end">
      <div class="form-checkbox">
        <!-- Checkbox -->
        <Field
          class="form-check-input"
          name="signInRemember"
          type="checkbox"
          id="signInCheck"
          :disabled="signInLoad"
        />
        <label class="form-check-label" for="signInCheck">
          Nhớ lần đăng nhập này
        </label>
      </div>

      <div class="from-forgot">
        <!-- Simple link -->
        <a href="#!">Quên mật khẩu?</a>
      </div>
    </div>

    <!-- Submit button -->
    <div class="from-submit center">
      <button type="submit" class="form-submit-btn btn">Đăng Nhập</button>
    </div>

    <!-- Register buttons -->
    <div class="text-center">
      <p>Chưa có tài khoản? <a href="#!">Đăng ký</a></p>
    </div>
  </Form>
</template>

<script setup lang="ts">
  import { reactive, watch, onMounted } from 'vue';
  import { Form, Field, useForm, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  import { useAuthStore } from '@/stores/auth/AuthStore';
  import { storeToRefs } from 'pinia';

  const authStore = useAuthStore();
  const { signInMessage, isProcessing: signInLoad } = storeToRefs(authStore);
  watch(signInMessage, (v) => {
    console.log(v);
  });
  onMounted(() => {
    document.title = 'Đăng nhập';
  });
  const schema = yup.object().shape({
    signInUsername: yup.string().required('Không được bỏ trống'),
    signInPassword: yup
      .string()
      .min(6, 'Phải nhiều hơn 6 ký tự')
      .required('Không được bỏ trống'),
  });

  const signInForm = reactive({
    signInUsername: '',
    signInPassword: '',
  });

  const handleSignInSubmit = async () => {
    await authStore.signIn({
      userName: signInForm.signInUsername,
      password: signInForm.signInPassword,
    });
  };
  // watch(signInForm, (value, oldValue) => {
  //   console.log(value);
  // });
</script>

<style lang="scss"></style>
