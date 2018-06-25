import Head from '../components/head'
import Nav from '../components/nav'
import CurrentSeason from '../components/current-season'

const key    = process.env.UNSPLASH_API_KEY;
const secret = process.env.UNSPLASH_API_SECRET;

export default () => (
  <div>
    <Head title='Which Season I am?' />
    <Nav />
    <CurrentSeason apiKey={key} secret={secret} > </CurrentSeason>
  </div>
)
