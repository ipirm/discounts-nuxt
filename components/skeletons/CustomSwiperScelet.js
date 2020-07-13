import Skeleton from "react-loading-skeleton";
import Swiper from "react-id-swiper";
import Link from "next/link";
import React from "react";


export const CustomSwiperScelet = () => {
    const params = {
        spaceBetween: 16,
        slidesPerView: 4
    }
    return (
        <div className="container-fluid swiper-fluid">
            <div className="row swiper-title">
                <div className="col-12 swiper-col">
                    <div className="swiper-controls-title">  <Skeleton count={1}/></div>
                    <div className="swiper-controls">
                        <a className="swiper-controls-prev" href="#" >
                            <svg width="50" height="34" viewBox="0 0 50 34" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M35.514 6.93771L49.9999 17L35.514 27.0623V21.2368H15.5763V12.7632H35.514V6.93771Z"
                                    fill="#eee"/>
                                <path
                                    d="M10.9035 11.704C11.7637 11.704 12.4611 12.1782 12.4611 12.7632V21.2368C12.4611 21.8218 11.7637 22.296 10.9035 22.296C10.0432 22.296 9.34583 21.8218 9.34583 21.2368V12.7632C9.34583 12.1782 10.0432 11.704 10.9035 11.704Z"
                                    fill="#eee"/>
                                <path
                                    d="M6.23049 11.704C7.09077 11.704 7.78812 12.1782 7.78812 12.7632V21.2368C7.78812 21.8218 7.09077 22.296 6.23049 22.296C5.3702 22.296 4.67285 21.8218 4.67285 21.2368V12.7632C4.67285 12.1782 5.3702 11.704 6.23049 11.704Z"
                                    fill="#eee"/>
                                <path
                                    d="M1.55764 11.704C2.41792 11.704 3.11527 12.1782 3.11527 12.7632V21.2368C3.11527 21.8218 2.41792 22.296 1.55764 22.296C0.697351 22.296 0 21.8218 0 21.2368V12.7632C0 12.1782 0.697351 11.704 1.55764 11.704Z"
                                    fill="#eee"/>
                            </svg>
                        </a>
                        <a className="swiper-controls-next" href="#" >
                            <svg width="50" height="34" viewBox="0 0 50 34" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M35.514 6.93771L49.9999 17L35.514 27.0623V21.2368H15.5763V12.7632H35.514V6.93771Z"
                                    fill="#eee"/>
                                <path
                                    d="M10.9035 11.704C11.7637 11.704 12.4611 12.1782 12.4611 12.7632V21.2368C12.4611 21.8218 11.7637 22.296 10.9035 22.296C10.0432 22.296 9.34583 21.8218 9.34583 21.2368V12.7632C9.34583 12.1782 10.0432 11.704 10.9035 11.704Z"
                                    fill="#eee"/>
                                <path
                                    d="M6.23049 11.704C7.09077 11.704 7.78812 12.1782 7.78812 12.7632V21.2368C7.78812 21.8218 7.09077 22.296 6.23049 22.296C5.3702 22.296 4.67285 21.8218 4.67285 21.2368V12.7632C4.67285 12.1782 5.3702 11.704 6.23049 11.704Z"
                                    fill="#eee"/>
                                <path
                                    d="M1.55764 11.704C2.41792 11.704 3.11527 12.1782 3.11527 12.7632V21.2368C3.11527 21.8218 2.41792 22.296 1.55764 22.296C0.697351 22.296 0 21.8218 0 21.2368V12.7632C0 12.1782 0.697351 11.704 1.55764 11.704Z"
                                    fill="#eee"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Swiper {...params} >
                        {Array(9)
                            .fill()
                            .map((item, index) => (
                                <div key={index}>
                                    <Link href="/category">
                                        <a>
                                            <div style={{border: '1px solid #E5E5E5'}}> <Skeleton height={220}/></div>
                                            <p> <Skeleton count={1}  width="90%" /></p>
                                        </a>
                                    </Link>
                                </div>
                            ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
