<!--import {CustomSelect} from '../../elements/CustomSelect'-->
<!--import {useSelector} from "react-redux";-->
<!--import Router, {useRouter} from 'next/router'-->
<!--import {useEffect, useState} from 'react'-->

<!--export const SearchPanel = () => {-->

<!--    const companies = useSelector(state => state.post.companies)-->
<!--    const cats = useSelector(state => state.post.cats)-->

<!--    const router = useRouter()-->


<!--    const [companyQuery, setCompanyQuery] = useState(null);-->
<!--    const [catsQuery, setCatsQuery] = useState(null);-->


<!--    useEffect(() => {-->
<!--        // if (Object.entries(router.query).length !== 0) {-->
<!--        //     for (const [key, value] of Object.entries(router.query)) {-->
<!--        //         if (key === 'company') {-->
<!--        //             const seletedONE = companies.find(v => v.slug === value)-->
<!--        //             console.log(seletedONE)-->
<!--        //         } else if (key === 'cats') {-->
<!--        //             const seletedONE = cats.find(v => v.slug === value)-->
<!--        //             console.log(seletedONE)-->
<!--        //         }-->
<!--        //     }-->
<!--        // }-->
<!--    }, [companyQuery, catsQuery]);-->
    <template>
        <div class="overlaySearch">
            <div class="overlay-search">
                <div class="overlay-search-title">
                    <span>
                        {{ $t('searchPanel.title') }}
                        <b>{{ $t('searchPanel.subtitle') }}</b>
                    </span>
                </div>
                <div class="d-flex">
                    <CustomSelect :data="cats" type="cats" :placeHolder="$t('searchPanel.selectCategory')" />
                    <CustomSelect  :data="companies" type="company" :placeHolder="$t('searchPanel.selectCompany')" />
                </div>
            </div>
        </div>
    </template>

<script>
    import CustomSelect from "../../elements/CustomSelect";
    export default {
        props: ['cats','companies'],
        name: 'SearchPanel',
        components: {CustomSelect},

    }
</script>
