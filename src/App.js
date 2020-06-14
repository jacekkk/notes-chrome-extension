import React from 'react'
import './App.css'
import { Container, CssBaseline, makeStyles } from '@material-ui/core'
import Home from './components/Home'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}))

const App = () => {
  const classes = useStyles()
  const [userId, setUserId] = React.useState()

  /* global chrome */
  // chrome.runtime.sendMessage({ message: 'userIdRequired' }, function (
  //   response
  // ) {
  //   setUserId(response.userId)
  // })

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm" className={classes.root}>
        <Home userId={1235} />
      </Container>
    </div>
  )
}

export default App
