import React from 'react'
import Link from 'next/link'
import 'isomorphic-unfetch'
import { capitalize } from 'lodash'
import SeasonEmoji from './season-emoji'
import SeasonImage from './season-image'

export default class CurrentSeason extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {},
      hemisphere: null,
      currentSeason: {}
    }
  }

  async componentDidMount() {
    const res  = await fetch('https://what-season-wdkgewighq.now.sh')
    const json = await res.json()

    await this.setState({ hemisphere: json.hemisphere, location: json.location, currentSeason: json.currentSeason })
  }

  render () {
    const { name } = this.state.currentSeason;

    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto my-0">
        <SeasonImage name={this.state.currentSeason.name}> </SeasonImage>
        <div className="px-6 py-4">
          <div className="font-bold text-5xl mb-2">
            <div>
              <p>Current Season is {capitalize(name)} <SeasonEmoji name={this.state.currentSeason.name}> </SeasonEmoji> </p>            
            </div>
          </div>
          <p className="text-grey-darker text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
        </div>
      </div>
    )
  }
}
