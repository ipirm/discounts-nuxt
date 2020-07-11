import Link from 'next/link'
import { motion } from 'framer-motion'
import React from 'react'

let easing = [0.175, 0.85, 0.42, 0.96];

const imageVariants = {
    exit: { scale: 0,  opacity: 0, transition: { duration: 0.5, ease: easing } },
    enter: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: easing
        }
    }
};

export const Card = ({post,image,cat}) => {
    const truncateText = (item) => {
        return item.substring(0, 200) + '...'
    }

    return (
        <Link href="/discount/[pid]" as={`/discount/${post.slug}`}>
            <motion.a className="overlay-card" initial="exit" animate="enter" exit="exit"  variants={imageVariants}>
                {parseInt(post.ended) === 1 ?
                    <div className="overlay-card-item" style={{backgroundColor: 'rgb(255, 0, 0) '}}><span >Просрочено</span></div>
                    :
                    <div className="overlay-card-item" style={{backgroundColor: post.color}}><span >{post.color_text}</span></div>
                }
                { post.image === null ?
                    <img src={image}/>
                    :
                    <img src={post.image_url}/>
                }
                <div  className="overlay-card-text">
                    <span>{post.title}</span>
                    <p>{truncateText(post.description)}</p>
                    <div className="overlay-card-desc">
                    <div className="overlay-card-underline"></div>
                    <div className="overlay-date">
                        <div className="overlay-date-now">{post.duration}</div>
                        <div className="overlay-date-type">{cat}</div>
                    </div>
                    </div>
                </div>
            </motion.a>
        </Link>
    )
}
