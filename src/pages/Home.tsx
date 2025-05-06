import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { PROFILE } from '../router/paths'

// Define styles for the Home component
const PREFIX = 'Home';
const classes = {
  logo: `${PREFIX}-logo`,
  logoReact: `${PREFIX}-logoReact`,
  card: `${PREFIX}-card`,
  readTheDocs: `${PREFIX}-readTheDocs`,
};

const Root = styled('div')({
  [`& .${classes.logo}`]: {
    height: '6em',
    padding: '1.5em',
    willChange: 'filter',
    transition: 'filter 300ms',
    '&:hover': {
      filter: 'drop-shadow(0 0 2em #646cffaa)',
    },
  },
  [`& .${classes.logoReact}`]: {
    '&:hover': {
      filter: 'drop-shadow(0 0 2em #61dafbaa)',
    },
  },
  [`& .${classes.card}`]: {
    padding: '2em',
  },
  [`& .${classes.readTheDocs}`]: {
    color: '#888',
  },
});

function Home() {
  const [count, setCount] = useState(0)

  return (
    <Root>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className={classes.logo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className={`${classes.logo} ${classes.logoReact}`} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className={classes.card}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/pages/Home.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={classes.readTheDocs}>
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <Link to={PROFILE}>Go to Profile</Link>
      </div>
    </Root>
  )
}

export default Home
