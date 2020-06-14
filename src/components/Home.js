import React, { useEffect } from 'react'
import {
  AppBar,
  Box,
  IconButton,
  Tabs,
  Tab,
  Typography,
  makeStyles,
  useTheme,
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import SwipeableViews from 'react-swipeable-views'
import axios from 'axios'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 'fit-content',
  },
}))

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

const Home = ({ userId }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)
  const [notes, setNotes] = React.useState()

  useEffect(() => {
    async function fetchNotes() {
      const response = await axios.get(`http://localhost:8090/users/${userId}`)
      console.log(response.data.notes)
      setNotes(response.data.notes)
    }

    fetchNotes()
  }, [userId])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  const onAddCategory = () => {
    console.log()
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {notes &&
            notes.map((note) => (
              <Tab label={note.title} {...a11yProps(notes.indexOf(note))} />
            ))}
          <IconButton aria-label="addTab" onClick={onAddCategory}>
            <AddCircleIcon />
          </IconButton>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {notes &&
          notes.map((note) => (
            <TabPanel
              value={value}
              index={notes.indexOf(note)}
              dir={theme.direction}
            >
              {note.text}
            </TabPanel>
          ))}
      </SwipeableViews>
    </div>
  )
}

export default Home
