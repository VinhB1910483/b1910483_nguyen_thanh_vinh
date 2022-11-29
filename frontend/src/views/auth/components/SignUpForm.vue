<template>
  <!-- signUp From -->
  <Form @submit="handleSignUpSubmit" :validation-schema="schema">
    <p class="text-center mb-1">hoặc:</p>
    <p class="text-center form-feedback" v-if="signInMessage">
      {{ signInMessage }}
    </p>

    <!-- Name input -->
    <div class="form-text-control">
      <div class="input-field">
        <Field
          type="text"
          v-model="signUpForm.signUpUsername"
          id="signUpUsername"
          name="signUpUsername"
          autocomplete="on"
          placeholder=" "
        />
        <label class="form-label" for="signUpUsername">Tên đăng nhập</label>
      </div>
      <ErrorMessage name="signUpUsername" class="error-feedback" />
    </div>

    <!-- Last name input -->
    <div class="form-text-control">
      <div class="input-field">
        <Field
          type="text"
          v-model="signUpForm.signUpLastName"
          id="signUpLastName"
          name="signUpLastName"
          autocomplete="on"
          placeholder=" "
        />
        <label class="form-label" for="signUpLastName">Họ</label>
      </div>
      <ErrorMessage name="signUpLastName" class="error-feedback" />
    </div>

    <!-- Name input -->
    <div class="form-text-control">
      <div class="input-field">
        <Field
          type="text"
          v-model="signUpForm.signUpName"
          id="signUpName"
          name="signUpName"
          autocomplete="on"
          placeholder=" "
        />
        <label class="form-label" for="signUpName">Tên</label>
      </div>
      <ErrorMessage name="signUpName" class="error-feedback" />
    </div>

    <!-- Email input -->
    <div class="form-text-control">
      <div class="input-field">
        <Field
          type="email"
          v-model="signUpForm.signUpEmail"
          id="signUpEmail"
          name="signUpEmail"
          autocomplete="on"
          placeholder=" "
        />
        <label class="form-label" for="signUpEmail">Email</label>
      </div>
      <ErrorMessage name="signUpEmail" class="error-feedback" />
    </div>

    <!-- Password input -->
    <div class="form-text-control">
      <div class="input-field">
        <Field
          type="password"
          v-model="signUpForm.signUpPassword"
          id="signUpPassword"
          name="signUpPassword"
          autocomplete="on"
          placeholder=" "
        />
        <label class="form-label" for="signUpPassword">Mật khẩu</label>
      </div>
      <ErrorMessage name="signUpPassword" class="error-feedback" />
    </div>

    <!-- Repeat Password input -->
    <div class="form-text-control">
      <div class="input-field">
        <Field
          type="password"
          v-model="signUpForm.signUpRepeatPassword"
          id="signUpRepeatPassword"
          name="signUpRepeatPassword"
          autocomplete="on"
          placeholder=" "
        />
        <label class="form-label" for="signUpRepeatPassword"
          >Nhập lại mật khẩu</label
        >
      </div>
      <ErrorMessage name="signUpRepeatPassword" class="error-feedback" />
    </div>

    <!-- Checkbox -->
    <div class="form-check">
      <Field
        class="form-check-input"
        type="checkbox"
        v-model="signUpForm.signUpCheck"
        id="signUpCheck"
        name="signUpCheck"
        autocomplete="on"
      />
      <label class="form-check-label" for="signUpCheck">
        Tôi đã đọc và đồng ý với các điều khoản
      </label>
      <ErrorMessage name="signUpCheck" class="error-feedback" />
    </div>

    <!-- Submit button -->
    <div class="from-submit center">
      <button type="submit" class="form-submit-btn btn">Đăng Ký</button>
    </div>
  </Form>
  <!-- signUp From End -->
</template>
<script setup lang="ts">
  import { Form, Field, useForm, ErrorMessage } from 'vee-validate';
  import { useAuthStore } from '@/stores/auth/AuthStore';
  import { storeToRefs } from 'pinia';
  import { watch, reactive, onMounted } from 'vue';
  import * as yup from 'yup';

  const authStore = useAuthStore();
  const { signInMessage, isProcessing: signUpLoad } = storeToRefs(authStore);
  watch(signInMessage, (v) => {
    console.log(v);
  });

  const schema = yup.object().shape({
    signUpUsername: yup
      .string()
      .min(6, 'Phải nhiều hơn 6 ký tự')
      .required('Không được bỏ trống'),
    signUpName: yup.string(),
    signUpEmail: yup
      .string()
      .min(6, 'Phải nhiều hơn 6 ký tự')
      .required('Không được bỏ trống'),
    // .email('Email không đứng định dạng')
    signUpPassword: yup.string().required('Không được bỏ trống'),
    signUpRepeatPassword: yup
      .string()
      .oneOf([yup.ref('signUpPassword'), null], 'Mật khẩu không trùng')
      .required('Không được bỏ trống'),
    signUpCheck: yup.string().oneOf([undefined], 'Chưa xác nhận'),
  });

  const signUpForm = reactive({
    signUpLastName: '',
    signUpUsername: '',
    signUpName: '',
    signUpEmail: '',
    signUpPassword: '',
    signUpRepeatPassword: '',
    signUpCheck: 'on',
  });
  watch(signUpForm, (v) => {
    console.log(v.signUpCheck);
  });
  onMounted(() => {
    document.title = 'Đăng ký';
  });
  const handleSignUpSubmit = async () => {
    await authStore.signUp({
      username: signUpForm.signUpUsername,
      name: signUpForm.signUpName,
      lastname: signUpForm.signUpLastName,
      email: signUpForm.signUpEmail,
      password: signUpForm.signUpPassword,
    });
  };
</script>
<style lang="scss"></style>
