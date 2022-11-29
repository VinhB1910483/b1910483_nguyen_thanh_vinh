/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
    faSun as fasSun,
    faStar as fasStar,
    faUserSecret,
    faMoon,
    faCartArrowDown,
    faEye,
    faChevronLeft,
    faChevronRight,
    faCartShopping,
    faSpinner, faList, faRotateLeft, faCaretUp


} from '@fortawesome/free-solid-svg-icons'
import {
    faFacebookF,
    faFacebook,
    faGoogle,
    faTwitter,
    faGithub,
    faYoutube,


} from '@fortawesome/free-brands-svg-icons';
import { faStar, faUser, faCircleXmark, } from '@fortawesome/free-regular-svg-icons';

// faFacebook
// faGoogle
// faTwitter
// faGithub

/* add icons to the library */
library.add(
    faEye,
    faFacebookF,
    faCircleXmark,
    faFacebook,
    faGoogle,
    faGithub,
    faTwitter,
    faYoutube,
    faCartArrowDown,
    faCartShopping,
    faSpinner,
    faList,
    faRotateLeft, faCaretUp
);
library.add(fasStar, fasSun, faMoon, faUserSecret, faChevronLeft, faChevronRight);
library.add(faStar, faUser);

export { FontAwesomeIcon }