export function formatVND(number: number | String) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ' as string;
}