import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import {Fragment} from 'react'
import Router,{useRouter} from 'next/router'
import {useDispatch} from 'react-redux'
import {loadPosts} from "../../store/actions/post";

export const CustomSelect = ({items, placeHolder, type}) => {
    const router = useRouter()
    const [selectedOption, setSelectedOption] = useState(items.find(v => v.slug === router.query.company));
    const dispatch = useDispatch()

    items.forEach((item) => {
        Object.assign(item, {label: item.name, value: item.slug});
    })

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        Router.push({
            pathname: '/',
            query: type === 'company' ? {...Router.query, ...{company: selectedOption.slug}} : {...Router.query, ...{cats: selectedOption.slug}}
        })
    };
    useEffect(() => {
        dispatch(loadPosts(1, Router.router.asPath));
    }, [dispatch, selectedOption]);

    items.sort(function (a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    })

    useEffect(() => {
    }, [selectedOption]);
    return (
        <Fragment>
            <Select
                className="basic-single"
                classNamePrefix="select"
                placeholder={placeHolder}
                defaultValue={items[0]}
                id="1"
                instanceId="1"
                inputId="1"
                isSearchable={true}
                name="color"
                value={selectedOption}
                onChange={handleChange}
                options={items.sort()}
            />

        </Fragment>
    )
}
