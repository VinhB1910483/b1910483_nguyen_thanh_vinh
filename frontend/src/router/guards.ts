import { useAuthStore } from "@/stores/auth/AuthStore";
import { storeToRefs } from 'pinia';
import { useCartStore } from "@/stores/CartStore";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const authGuard = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore();

    const privitePages = ['/payment',];

    const authRequired = privitePages.includes(to.path);

    if (authRequired && !authStore.user) {
        authStore.returnUrl = to.fullPath;
        return next('/auth/signin');
    }
    next();
}

export const redirectGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const cartStore = useCartStore();
    const { cartItems, payAmount, count } = storeToRefs(cartStore);

    if (to.path === '/auth') return next('/auth/signin');
    if (to.path === '/cart/checkout') {
        if (!cartItems.value.length) {
            next('/cart');
        }
    }
    next();
}