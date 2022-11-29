import Toast, { POSITION, type PluginOptions } from "vue-toastification";
// Import the CSS or use your own!

const options: PluginOptions = {
    // You can set your default options here
    position: POSITION.BOTTOM_RIGHT,
    maxToasts: 5,
    transition: "Vue-Toastification__fade",
    newestOnTop: false,
    hideProgressBar: true,
};

export { Toast, options }