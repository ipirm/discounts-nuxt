import Skeleton from 'react-loading-skeleton';
import InfiniteScroll from "react-infinite-scroll-component";
import {motion} from "framer-motion";


export const CardScelet = () => {
    return (
        <div className="row" style={{margin: 'auto'}}>
            {Array(9)
                .fill()
                .map((item, index) => (
                    <a className="overlay-card" key={index}>
                        <Skeleton height={180}/>
                        <div  style={{marginTop: 15 + 'px'}}>
                            <Skeleton count={1} height="28px" width="90%" />
                            <div style={{marginTop: 20 + 'px'}}>
                            <Skeleton count={3} width="95%" height="10px"  />
                            </div>
                            <div className="overlay-card-desc">
                                <div className="overlay-card-underline"></div>
                                <div className="overlay-date">
                                    <Skeleton count={1} />
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
        </div>
    );
}
