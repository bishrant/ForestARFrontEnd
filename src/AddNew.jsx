import React from 'react';
// import 'react-dropzone-uploader/dist/styles.css'
// import Dropzone from 'react-dropzone-uploader'

// export default function AddNew() {
//   // specify upload params and url for your files
// //   const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  
//   // called every time a file's `status` changes
//   const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
  
//   // receives array of files that are done uploading when submit button is clicked
//   const handleSubmit = (files, allFiles) => {
//     console.log(files.map((f) => f.meta))
//     allFiles.forEach((f) => f.remove())
//   }

//   return (
//     <Dropzone
//       multiple= {false}
//       maxFiles= {1}
//       accept="image/jpeg, image/png, image/jpg"
//       onChangeStatus={handleChangeStatus}
//       onSubmit={handleSubmit}
//     />
//   )
// }

export default class Upload extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      imageFile: null,
      imageFileKey: null,
      videoFileKey: null,
      videoFile: null
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      imageFile: URL.createObjectURL(event.target.files[0])
    })
  }
  playlocalVID =(event) => {
    if (this.state.videoFile !== null) {
      this.setState({
        videoFile: URL.createObjectURL(event.target.files[0])
      })
       var player = document.getElementById("videoPlayer");
      player.load();
    }
    if (event.target.files.length > 0) {
      this.setState({
        videoFile: URL.createObjectURL(event.target.files[0])
      })
    }
  }

  clearImage = (event) => {
    this.setState({
      imageFileKey: Date.now(),
      imageFile: null
    })
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleChange} accept="image/*" key={this.state.imageFileKey || '' } />
        <div style={{maxHeight: '200px', maxWidth:'300px', position: 'relative'}}>
        <img src={this.state.imageFile} style={{maxHeight:'200px', position:'relative'}} alt="img"/>
        {this.state.imageFile !== null && (<button onClick={this.clearImage} style={{position: 'absolute', zIndex:10, top:0}} >X</button>)}
       
       </div>
        
        <input size="50" maxLength="100000" accept="video/*" type="file" onChange= {this.playlocalVID}/>
      <React.Fragment>
      <div id="desiredresult">

       
   
      {this.state.videoFile !== null  &&
        <video muted controls id="videoPlayer" style={{maxHeight:'200px'}}>
          <source id="currentVID" src={this.state.videoFile}/>
        </video>
      }
    </div>
    </React.Fragment>
    </div>
    );
  }
}