import React from "react";

import FormData from "form-data";

import { dataService } from "../services/serviceData";

class UploadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            image: "",
            previewImage: "../../assets/images/placeholder.png",
            showCloseButton: this.props.showCloseButton,
            validationError: ""
        };
    }

    bindEventHandlers() {
        this.previewImage = this.previewImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    handleError(error) {
        if (error.response) {
            this.setState({ validationError: error.response.data.error });
        } else if (error.request) {
            this.setState({ validationError: "There is no response from server." });
        }
    }

    previewImage(event) {
        const image = event.target.files[0];

        if (image && image.type.startsWith("image/")) {
            this.setState({
                image: image,
                previewImage: window.URL.createObjectURL(image),
                validationError: ""
            });
        } else {
            this.setState({ validationError: "Invalid file type! Please select an image file." });
        }
    }

    uploadImage(event) {
        event.preventDefault();

        const image = this.state.image;

        let postData = new FormData();
        postData.append("file", image);

        dataService.uploadImage(postData, imageUrl => {
            this.props.uploadImage(imageUrl);
        }, error => this.handleError(error));
    }

    render() {
        const { image, previewImage, showCloseButton, validationError } = this.state;
        const previewStyle = showCloseButton
            ? {
                maxWidth: 25 + "rem",
                maxHeight: 25 + "rem"
            }
            : {
                maxWidth: 18 + "rem",
                maxHeight: 18 + "rem"
            };

        return (
            <div className="position-relative">
                <label>Select image for upload:</label>
                <input
                    type="file"
                    onChange={this.previewImage}
                    className="d-block"
                />

                <div className="error">
                    {validationError
                        ? <p>{validationError}</p>
                        : <p></p>
                    }
                </div>

                <img
                    src={previewImage}
                    style={previewStyle}
                    className="d-block mx-auto mb-3 w-100"
                />

                <div className="text-right">
                    <button onClick={this.uploadImage} className="btn buttonLight my-2 my-sm-0">Upload</button>
                    {showCloseButton
                        ? <button className="btn btn-outline-danger my-2 my-sm-0 ml-2" onClick={this.props.toggleModal}>
                            Close
                        </button>
                        : <p></p>
                    }
                </div>
            </div>
        );
    }
}

export default UploadImage;