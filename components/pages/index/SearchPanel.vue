import {CustomSelect} from '../../elements/CustomSelect'
import {useSelector} from "react-redux";
import Router, {useRouter} from 'next/router'
import {useEffect, useState} from 'react'

export const SearchPanel = () => {

    const companies = useSelector(state => state.post.companies)
    const cats = useSelector(state => state.post.cats)

    const router = useRouter()


    const [companyQuery, setCompanyQuery] = useState(null);
    const [catsQuery, setCatsQuery] = useState(null);


    useEffect(() => {
        // if (Object.entries(router.query).length !== 0) {
        //     for (const [key, value] of Object.entries(router.query)) {
        //         if (key === 'company') {
        //             const seletedONE = companies.find(v => v.slug === value)
        //             console.log(seletedONE)
        //         } else if (key === 'cats') {
        //             const seletedONE = cats.find(v => v.slug === value)
        //             console.log(seletedONE)
        //         }
        //     }
        // }
    }, [companyQuery, catsQuery]);
    return (
        <div className="overlaySearch">
            <div className="overlay-search">
                <div className="overlay-search-title">
                    <span>
                        Скидки
                        <b> в магазинах Баку </b>
                    </span>
                </div>
                <div className="d-flex">
                    <CustomSelect type={'company'} items={companies}
                                  placeHolder="Выбрать магазин..."/>
                    <CustomSelect  type={'cats'} items={cats} placeHolder="Выбрать категорию..."/>
                </div>
            </div>
        </div>
    )
}
