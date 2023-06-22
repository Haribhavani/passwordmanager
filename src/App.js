import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  listenWebsite = e => {
    this.setState({website: e.target.value})
  }

  listenUsername = e => {
    this.setState({username: e.target.value})
  }

  listenPassword = e => {
    this.setState({password: e.target.value})
  }

  addContent = e => {
    e.preventDefault()
    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()

    const classValue = colorList[Math.floor(Math.random() * 5)]

    const newValue = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }

    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValue],
      isTrue: true,
      website: '',
      username: '',
      password: '',
      searchInput: '',
    }))
  }

  showPassword = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = e => {
    this.setState({searchInput: e.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(each => each.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {
      latestList,
      website,
      password,
      username,
      isShow,
      searchInput,
    } = this.state

    let {isTrue} = this.state

    const newList = latestList.filter(each =>
      each.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="main-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="logo"
          className="logo-img"
        />
        <div className="sub-div">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-img"
          />
          <form className="add-details" onSubmit={this.addContent}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="image1"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="input-el"
                onChange={this.listenWebsite}
                value={website}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="image1"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="input-el"
                onChange={this.listenUsername}
                value={username}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="image1"
              />
              <input
                type="text"
                placeholder="Enter Password"
                className="input-el"
                onChange={this.listenPassword}
                value={password}
              />
            </div>

            <button type="submit" className="button">
              Add
            </button>
          </form>

          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-img2"
          />
        </div>
        <div className="div2">
          <div className="first-div">
            <div className="your-password">
              <h1 className="heading">Your Password</h1>
              <p className="color-list">{newList.length}</p>
            </div>

            <div className="search-header">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-img"
              />
              <input
                type="search"
                placeholder="Search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-password">
            <input
              type="checkbox"
              className="box"
              id="check"
              onChange={this.showPassword}
            />

            <label htmlFor="check" className="label">
              Show Passwords
            </label>
          </div>

          {!isTrue && (
            <div className="empty-div">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords-img"
              />

              <p className="no-passwords">No Passwords</p>
            </div>
          )}

          {isTrue && (
            <ul className="result-div">
              {newList.map(each => (
                <li className="item-list" id={each.id} key={each.id}>
                  <p className={`initial ${each.classAdd}`}>
                    {each.initialValue}
                  </p>
                  <div className="li-content">
                    <p className="para">{each.websiteName}</p>
                    <p className="para">{each.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars-img"
                      />
                    )}
                    {isShow && <p className="para">{each.Password}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={this.deleteItem}
                    data-testid="delete"
                    className="button"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete-img"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
