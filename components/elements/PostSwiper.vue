import React, {useRef} from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import Link from 'next/link'
import Skeleton from "react-loading-skeleton";
import {Card} from "./Card";
import {loadPosts} from "../../store/actions/post";
import Router from "next/router";

const PostSwiper = ({items, label,companies,cats}) => {
    const swiperRef = useRef(null)
    const params = {
        spaceBetween: 16,
        slidesPerView: 5,
        observer: true,
        observeParents: true
    }
    const goNext = (e) => {
        if (swiperRef.current) {
            e.preventDefault();
            swiperRef.current.swiper.slideNext()
        }
    };

    const goPrev = (e) => {
        if (swiperRef.current) {
            e.preventDefault();
            swiperRef.current.swiper.slidePrev()
        }
    };
    return (
        <div className="post-swiper">
            <div className="row swiper-title">
                <div className="col-12 swiper-col">
                    <div className="swiper-controls-title"> {label || <Skeleton count={1}/>}</div>
                    <div className="swiper-controls">
                        <a className="swiper-controls-prev" href="#" onClick={goPrev}>
                            <svg width="50" height="34" viewBox="0 0 50 34" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M35.514 6.93771L49.9999 17L35.514 27.0623V21.2368H15.5763V12.7632H35.514V6.93771Z"
                                    fill="#F8C563"/>
                                <path
                                    d="M10.9035 11.704C11.7637 11.704 12.4611 12.1782 12.4611 12.7632V21.2368C12.4611 21.8218 11.7637 22.296 10.9035 22.296C10.0432 22.296 9.34583 21.8218 9.34583 21.2368V12.7632C9.34583 12.1782 10.0432 11.704 10.9035 11.704Z"
                                    fill="#F8C563"/>
                                <path
                                    d="M6.23049 11.704C7.09077 11.704 7.78812 12.1782 7.78812 12.7632V21.2368C7.78812 21.8218 7.09077 22.296 6.23049 22.296C5.3702 22.296 4.67285 21.8218 4.67285 21.2368V12.7632C4.67285 12.1782 5.3702 11.704 6.23049 11.704Z"
                                    fill="#F8C563"/>
                                <path
                                    d="M1.55764 11.704C2.41792 11.704 3.11527 12.1782 3.11527 12.7632V21.2368C3.11527 21.8218 2.41792 22.296 1.55764 22.296C0.697351 22.296 0 21.8218 0 21.2368V12.7632C0 12.1782 0.697351 11.704 1.55764 11.704Z"
                                    fill="#F8C563"/>
                            </svg>
                        </a>
                        <a className="swiper-controls-next" href="#" onClick={goNext}>
                            <svg width="50" height="34" viewBox="0 0 50 34" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M35.514 6.93771L49.9999 17L35.514 27.0623V21.2368H15.5763V12.7632H35.514V6.93771Z"
                                    fill="#F8C563"/>
                                <path
                                    d="M10.9035 11.704C11.7637 11.704 12.4611 12.1782 12.4611 12.7632V21.2368C12.4611 21.8218 11.7637 22.296 10.9035 22.296C10.0432 22.296 9.34583 21.8218 9.34583 21.2368V12.7632C9.34583 12.1782 10.0432 11.704 10.9035 11.704Z"
                                    fill="#F8C563"/>
                                <path
                                    d="M6.23049 11.704C7.09077 11.704 7.78812 12.1782 7.78812 12.7632V21.2368C7.78812 21.8218 7.09077 22.296 6.23049 22.296C5.3702 22.296 4.67285 21.8218 4.67285 21.2368V12.7632C4.67285 12.1782 5.3702 11.704 6.23049 11.704Z"
                                    fill="#F8C563"/>
                                <path
                                    d="M1.55764 11.704C2.41792 11.704 3.11527 12.1782 3.11527 12.7632V21.2368C3.11527 21.8218 2.41792 22.296 1.55764 22.296C0.697351 22.296 0 21.8218 0 21.2368V12.7632C0 12.1782 0.697351 11.704 1.55764 11.704Z"
                                    fill="#F8C563"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Swiper {...params} ref={swiperRef}>
                        {
                            items.map(function (item, i) {
                                let image = companies.find(i => i.slug === item.company)
                                let cat = cats.find(i => i.slug === item.cat)
                                return (
                                    <div key={item.id}>
                                        <Link href="/category">
                                            <a style={{display: 'flex'}}>
                                                <Card
                                                    key={item.id}
                                                    post={item}
                                                    image={image ? image.image_url : ''}
                                                    cat={cat ? cat.name : ''}
                                                />
                                            </a>
                                        </Link>
                                    </div>
                                )
                            }
                        )}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default PostSwiper;
