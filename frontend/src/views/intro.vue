<script setup lang="ts">
  import TheWelcome from '@/components/TheWelcome.vue';
  import HelloWorld from '@/components/HelloWorld.vue';
  import authService from '@/service/auth.service';
  import userService from '@/service/user.service';
  import cpuService from '@/service/products/cpu.service';
  import productService from '@/service/products/product.service';
  import { useCartStore } from '@/stores/CartStore';

  const cartStore = useCartStore();
  cartStore.addToCart({
    price: 2374.75,
    id: '04e96bd4-2a1e-42d5-88b9-c0c9fa804db4',
    name: 'Logitech MX MASTER 3S',
    quantity: 1,
    photo:
      'http://localhost:3005/images/products/mouse/487d6f4109b89a3e2c44fa934dd43b2c.256p.jpg',
    type: 'mouse',
  });
  // console.log(cartStore.cart);
</script>

<template>
  <div class="container">
    <header>
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/image/logo.svg"
        width="125"
        height="125"
      />
      <div class="wrapper">
        <HelloWorld msg="You did it!" />
        <nav>
          <RouterLink to="/home">Home</RouterLink>
          <RouterLink to="/test">Test</RouterLink>
          <RouterLink to="/auth/signup">Sign up</RouterLink>
          <RouterLink to="/auth/signin">Sign in</RouterLink>
          <div class="testApi">
            <button
              type="button"
              @click="
                userService.updateUser({
                  address: 'string',
                  city: 'string',
                  phone: 'string',
                })
              "
            >
              Test Auth API
            </button>
            <button type="button" @click="userService.test">
              Test User API
            </button>
          </div>
        </nav>
      </div>
    </header>

    <main>
      <TheWelcome />
    </main>
  </div>
</template>

<style lang="scss" scoped>
  header {
    line-height: 1.5;
    max-height: 100vh;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;

    a {
      display: inline-block;
      padding: 0 1rem;
      border-left: 1px solid var(--color-border);

      &:first-of-type {
        border: 0;
      }
      &.router-link-exact-active {
        color: var(--color-text);
      }
      &.router-link-exact-active:hover {
        background-color: transparent;
      }
    }
  }
  .testApi {
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 1024px) {
    .container {
      display: flex;
      place-items: center;
      min-height: 100vh;
    }

    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);

      .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
      }
    }

    .logo {
      margin: 0 2rem 0 0;
    }

    nav {
      text-align: left;
      margin-left: -1rem;
      font-size: 1rem;

      padding: 1rem 0;
      margin-top: 1rem;
    }
  }
</style>
