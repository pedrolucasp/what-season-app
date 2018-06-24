import React from 'react'
import Unsplash from 'unsplash-js';

const { UNSPLASH_API_KEY, UNSPLASH_API_SECRET } = process.env;

const unsplash = new Unsplash({
  applicationId: UNSPLASH_API_KEY,
  secret: UNSPLASH_API_SECRET,
});

export default class SeasonImage extends React.Component {
  constructor(props) {
    super(props);

    console.log(props, this.state);

    this.state = {
      name: "",
      image: "",
      imageDescription: ""
    }
  }

  async fetchImage(name) {
    unsplash.photos.getRandomPhoto({ width: 480, height: 293, query: name })
      .then((response) => response.json())
      .then(data => {
        this.setState({ 
          image: data.urls.custom, 
          imageDescription: data.description,
          ownerUsername: data.user.username, 
          ownerUrl: data.user.links.html,
        })
      });
  }

  async componentDidMount() {
    await this.setState({ image: this.fetchImage(this.state.name) });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.name != this.props.name) {
      this.setState({ image: this.fetchImage(this.props.name) })
    }
  }

  render () {
    const { image, ownerUsername, ownerUrl, imageDescription } = this.state;

    return (
      <div className="relative">  
        <img className="w-full" src={image} alt={imageDescription} />
        <a href={ownerUrl} className="absolute no-underline  pin-r rounded-full pin-b px-3 flex items-center mr-4 mb-4  bg-grey-lighter py-2">
          <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">@{ownerUsername} at Unsplash</span>
        </a>
      </div>
    )
  }
}