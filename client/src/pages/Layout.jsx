import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <header>
                <h2>CM Manager</h2>
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
            </header>
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