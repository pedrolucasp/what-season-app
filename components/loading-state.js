import React from 'react'

export default class LoadingState extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="w-full h-full">
        <div className="loading-state">
        </div>
      </div>
    )
  }
}

