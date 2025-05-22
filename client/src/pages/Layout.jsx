import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <header>
                <h1>CM Manager</h1>
            </header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/workbooks">Workbooks</Link>
                    </li>
                </ul>
            </nav>
            <main>
                <div className="app-container">
                    <Outlet />
                </div>
            </main>
            <footer>
                <p>© 2025 CM Manager</p>
            </footer>
        </>
    )
}

export default Layout;