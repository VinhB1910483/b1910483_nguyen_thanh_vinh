import morgan from 'morgan';

morgan.token('now', () => {
    return new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
})
const morganFormat = ':remote-addr :now :remote-user [:method :url :status :res[content-length]] [:response-time ms] \n';
export const morganLogger = morgan(morganFormat);