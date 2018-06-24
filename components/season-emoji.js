import React from 'react'

export default class SeasonEmoji extends React.Component {
  constructor(props) {
    super(props);

    console.log(props, this.state);

    this.state = {
      name: "",
      emoji: ""
    }
  }

  fetchEmoji(name) {
    return {
      "WINTER": "⛄️",
      "SUMMER": "☀️",
      "FALL": "🍂",
      "SPRING": "🌻"
    }[name];
  }

  async componentDidMount() {
    await this.setState({ emoji: this.fetchEmoji(this.state.name) });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.name != this.props.name) {
      this.setState({ emoji: this.fetchEmoji(this.props.name) })
    }
  }

  render () {
    const { emoji } = this.state;

    return (<span>{emoji}</span>)
  }
}

