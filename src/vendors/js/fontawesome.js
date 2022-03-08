//Khởi tạo thư viện icon của riêng bạn
import { library } from '@fortawesome/fontawesome-svg-core'; 

//Import các icon mà bạn muốn sử dụng trong từng gói
import { faCode, faHighlighter, faCoffee,
      faList, faUser, faKey, faUserEdit, faCircleInfo,faQuestionCircle,faBell,faEllipsisVertical,faGlassMartini,faChampagneGlasses
} from '@fortawesome/free-solid-svg-icons';  


//Add các icon đã được import vào trong thư viện của bạn
library.add( faCode, faHighlighter,
     faCoffee ,faList, faUser, faKey,faUserEdit, faCircleInfo,faQuestionCircle,faBell,faEllipsisVertical,faGlassMartini,faChampagneGlasses
)