import "./App.css"
import Header from "./components/common/header/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import About from "./components/about/About"
import CourseHome from "./components/allcourses/CourseHome"
import Contact from "./components/contact/Contact.jsx"
import Buchen from "./components/buchen/buchen.jsx"
import AGB from "./components/AGB/AGB.jsx"
import Impressum from "./components/impressum/impressum.jsx"
import Datenschutz from "./components/datenschutz/datenschutz.jsx"
import Footer from "./components/common/footer/Footer"
import Home from "./components/home/Home"
import Vorgang from "./components/vorgang/vorgang.jsx"
function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/vorgang' component={Vorgang} />
          <Route exact path='/courses' component={CourseHome} />
          <Route path='/contact' component={Contact} />
          <Route path='/buchen' component={Buchen} />
          <Route path='/AGB' component={AGB} />
          <Route path='/Impressum' component={Impressum} />
          <Route path='/Datenschutz' component={Datenschutz} />
        </Switch>
        <Footer />
      </Router>
    </>
  )
}

export default App
