import Link from 'next/link'
import { useRouter } from "next/router";

export const Header = () => {
    const router = useRouter();
    return (
        <div className="overlayHeader">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <ul className="header-menu">
                            <li><Link  href="/"><a className={router.pathname == "/" ? "active-link" : ""}>Главная</a></Link></li>
                            <li><Link  href="/category"><a className={router.pathname == "/category" ? "active-link" : ""}>Категории</a></Link></li>
                            <li><Link  href="/company"><a className={router.pathname == "/company" ? "active-link" : ""}>Компании</a></Link></li>
                            <li><Link  href="/"><a className={router.pathname == "/aa" ? "active-link" : ""}>Популярное</a></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
