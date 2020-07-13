import React from "react";
import Skeleton from "react-loading-skeleton";


export const CompanyScelet = () => {
    return (
        <div className="company-section-item">
            <div className="company-section-item-right">
                <Skeleton width="35px" height="35px" />
            </div>
            <div className="company-section-item-elements" style={{flexDirection: 'row'}}>
                {Array(16).fill().map((item, index) =>{
                    return <div className="company-section-item-left" key={index}><Skeleton width="160px" /> </div>
                })}
            </div>
        </div>
    )
}
