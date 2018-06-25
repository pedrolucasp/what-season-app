import React from 'react'
import Unsplash from 'unsplash-js';
import process from 'process';
import LoadingState from './loading-state';

let unsplash;

export default class SeasonImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      image: null,
      imageDescription: ""
    }

    unsplash = new Unsplash({
      applicationId: this.props.apiKey,
      secret: this.props.secret,
    });
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
    await this.setState({ image: null });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.name != this.props.name) {
      let imageResponse = await this.fetchImage(this.props.name);
      await this.setState({ image: imageResponse });
    }
  }

  render () {
    const { image, ownerUsername, ownerUrl, imageDescription } = this.state;
    
    if (!image) {
      console.log("we dont have a image");
      return (
        <div className="relative loader-container">
          <LoadingState />
        </div>
      )
    } else {
      console.log("we have a image");
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
}