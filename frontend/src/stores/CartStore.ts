import type { Cart } from '@/types/api/cart'
import { defineStore } from 'pinia'

export interface Purchase {
    id: string;
    name: string;
    photo: string;
    type: string;
    price: number;
    quantity: number
}

interface CartState {
    contents: Record<string, Purchase>
}

export interface CartPreview {
    _id: string;
    productName: string;
    productPhoto: string;
    productType: string;
    price: number;
    quantity: number;
    totalPrice: number;
}

export const useCartStore = defineStore({
    id: 'CartStore',

    state: (): CartState => ({
        contents: JSON.parse(localStorage.getItem('CART_STORAGE') as string) ?? {}
    }),

    getters: {
        count(): number {
            return Object.keys(this.contents).reduce((acc, id) => {
                return acc + this.contents[id].quantity
            }, 0)
        },

        payAmount(): number {
            return Object.keys(this.contents).reduce((acc, id) => {
                return acc + this.contents[id].price * this.contents[id].quantity
            }, 0)
        },

        cartItems(): CartPreview[] {
            return Object.keys(this.contents).map(_id => {
                const purchase = this.contents[_id]
                return {
                    _id: purchase.id,
                    productName: purchase.name,
                    productPhoto: purchase.photo,
                    productType: purchase.type,
                    price: purchase.price,
                    quantity: purchase.quantity,
                    totalPrice: purchase.quantity * purchase.price,
                }
            })
        }
    },

    actions: {
        save() {
            localStorage.setItem('CART_STORAGE', JSON.stringify(this.contents))
        },
        clear() {
            localStorage.setItem('CART_STORAGE', JSON.stringify(this.contents))
            this.contents = {};
            this.save();
        },
        update() {
            this.contents = JSON.parse(localStorage.getItem('CART_STORAGE') as string) ?? {}
        },

        add(_id: string, newQuantity?: number) {
            if (this.contents[_id]) {
                if (newQuantity) this.contents[_id].quantity = newQuantity
                else this.contents[_id].quantity += 1
            }
            this.save();
            return;
        },
        remove(_id: string) {
            if (!this.contents[_id]) {
                return
            }

            if (this.contents[_id].quantity > 1) {
                this.contents[_id].quantity -= 1
                // delete this.contents[_id]
            }
            this.save();
        },
        addToCart(product: Purchase) {
            if (this.contents[product.id]) {
                // this.contents[product.id].quantity += 1
                return;
            } else {
                this.contents[product.id] = {
                    id: product.id,
                    name: product.name,
                    photo: product.photo,
                    type: product.type,
                    price: product.price,
                    quantity: product.quantity
                }
            }
            this.save();
        },
        removeFromCart(_id: string) {
            if (this.contents[_id]) {
                delete this.contents[_id]
            }
            this.save();
            return;
        },
    }
})