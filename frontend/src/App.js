import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { signout } from './actions/userActions'
import AdminRoute from './components/AdminRoute'
import HomeScreen from './screens/HomeScreen'
import MemberEditScreen from './screens/MemberEditScreen'
import MemberListScreen from './screens/MemberListScreen'
import MemberScreen from './screens/MemberScreen'
import RegisterScreen from './screens/RegisterScreen'
import SigninScreen from './screens/SigninScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import SearchBox from './components/SearchBox'
import SearchScreen from './screens/SearchScreen'
import VisitorScreen from './screens/visitorScreen'
import VisitorEditScreen from './screens/VisitorEditScreen'
import VisitorListScreen from './screens/VisitorListScreen'

function App() {
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const dispatch = useDispatch()

  const signoutHandler = () => {
    dispatch(signout())
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">
              Church of Christ - 18 Junction, Spintex Road.
            </a>
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  {/* <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li> */}
                  <li>
                    <Link to="/memberlist">Members</Link>
                  </li>
                  <li>
                    <Link to="/visitorlist">Visitors</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          <Route path="/member/:id" component={MemberScreen} exact></Route>
          <Route
            path="/member/:id/edit"
            component={MemberEditScreen}
            exact
          ></Route>

          <Route path="/visitor/:id" component={VisitorScreen} exact></Route>
          <Route
            path="/visitor/:id/edit"
            component={VisitorEditScreen}
            exact
          ></Route>

          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route
            path="/search/surname/:surname?"
            component={SearchScreen}
            exact
          ></Route>
          <AdminRoute
            path="/memberlist"
            component={MemberListScreen}
          ></AdminRoute>

          <AdminRoute
            path="/visitorlist"
            component={VisitorListScreen}
          ></AdminRoute>

          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>

          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  )
}

export default App
