import ScrollToTop from "react-scroll-to-top";
import { FaChevronUp } from 'react-icons/fa';


function ToTop() {

    return (
        <>
            <ScrollToTop smooth component={<FaChevronUp />}></ScrollToTop>
        </>
    )
}

export default ToTop;