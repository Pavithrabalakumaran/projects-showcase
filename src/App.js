import {Component} from 'react'

import Loader from 'react-loader-spinner'

import ProjectsShowCase from './components/ProjectsShowCase'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatus = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
}

class App extends Component {
  state = {
    api: apiStatus.initial,
    data: [],
    select: 'ALL',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {select} = this.state
    this.setState({api: apiStatus.loading})

    const url = `https://apis.ccbp.in/ps/projects?category=${select}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        image_url: each.imageUrl,
      }))
      this.setState({
        data: updatedData,
        api: apiStatus.success,
      })
    } else {
      this.setState({api: apiStatus.fail})
    }
  }

  selectOption = event => {
    this.setState({select: event.target.value}, this.getData)
  }

  loadingView = () => (
    <div data-testid="loader" className="load">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  failureView = () => {
    const {select} = this.state

    return (
      <div>
        <nav className="nav-element">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </nav>
        <div className="main-container">
          <ul className="select-container">
            <select
              className="select-option"
              value={select}
              onChange={this.selectOption}
            >
              {categoriesList.map(each => (
                <option value={each.id} key={each.id}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </ul>

          <div className="fail-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
              className="image-fail"
              alt="failure view"
            />
            <h1 className="header-failure">Oops! Something Went Wrong</h1>
            <p className="para-failure">
              We cannot seem to find the page you are looking for
            </p>
            <button
              className="button-retry"
              type="button"
              onClick={this.getData}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  successView = () => {
    const {data} = this.state

    return (
      <div className="success-cont">
        <ul className="app-container">
          {data.map(each => (
            <ProjectsShowCase id={each.id} projectDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  finalRender = () => {
    const {api} = this.state

    switch (api) {
      case apiStatus.loading:
        return this.loadingView()
      case apiStatus.success:
        return this.successView()
      case apiStatus.fail:
        return this.failureView()

      default:
        return null
    }
  }

  render() {
    const {select} = this.state

    return (
      <div>
        <nav className="nav-element">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </nav>
        <div className="main-container">
          <ul className="select-container">
            <select
              className="select-option"
              value={select}
              onChange={this.selectOption}
            >
              {categoriesList.map(each => (
                <option value={each.id} key={each.id}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </ul>
          {this.finalRender}
        </div>
      </div>
    )
  }
}

export default App
