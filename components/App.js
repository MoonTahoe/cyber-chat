import { Link } from 'react-router'

const App = () =>
    <div className="app">
        <h1>Cyber Chat</h1>
        <ul>
            <li>
                <Link to="/help">Help</Link>
            </li>
            <li>
                <Link to="/room/politics">Politics</Link>
            </li>
            <li>
                <Link to="/room/sports">Sports</Link>
            </li>
            <li>
                <Link to="/room/entertainment">Entertianment</Link>
            </li>
        </ul>
    </div>

module.exports = App