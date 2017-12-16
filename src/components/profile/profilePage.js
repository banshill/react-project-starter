import React from "react";

import Modal from "react-responsive-modal";

import { dataService } from "../services/serviceData";
import { redirect } from "../services/serviceRedirect";

import { Profile } from "../profile/profile";
import EditProfile from "./editProfile";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            profile: {
                name: "Loading...",
                email: "",
                aboutShort: "",
                about: "",
                avatarUrl: "../../assets/images/batman.jpg",
                postsCount: 0,
                commentsCount: 0
            },
            edit: {
                name: "",
                email: "",
                aboutShort: "",
                about: "",
                avatarUrl: ""
            },
            show: false,
            error: ""
        };
    }

    bindEventHandlers() {
        this.toggleModalShow = this.toggleModalShow.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    componentDidMount() {
        this.getProfile();
    }

    getProfile() {
        dataService.getProfile(profile => this.loadProfile(profile), error => this.handleNetworkRequestError(error));
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    loadProfile(profile) {
        this.setState({
            profile: profile,
            edit: {
                name: profile.name,
                email: profile.email,
                aboutShort: profile.aboutShort,
                about: profile.about,
                avatarUrl: profile.avatarUrl
            }
        });
    }

    toggleModalShow() {
        event.preventDefault();

        if (this.state.show === false) {
            this.setState({ show: true });
        } else {
            this.setState({ show: false });
        }
    }

    updateProfile(newData) {
        dataService.updateProfile(newData, profile => this.loadProfile(profile),
            error => this.handleNetworkRequestError(error));
        this.toggleModalShow();
    }

    uploadImage(imageUrl) {
        this.setState(prevState => {
            prevState.edit.avatarUrl = imageUrl;
            return prevState;
        });
        this.updateProfile(this.state.edit);
    }

    render() {

        const { name, email, aboutShort, about, avatarUrl, postsCount, commentsCount } = this.state.profile;
        const { show, error } = this.state;

        return (
            <main className="container-fluid">
                <div className="row w-75 mx-auto">

                    <p className="error">{error}</p>

                    <Profile user={this.state.profile} />

                    <div className="col-12">
                        <div className="text-center ">
                            <button className="btn buttonLight my-2 my-sm-0" onClick={this.toggleModalShow}>Edit Profile</button>
                        </div>
                    </div>

                    <Modal
                        open={show}
                        onClose={this.toggleModalShow}
                        showCloseIcon={false}
                        classNames={{ modal: "custom-modal" }}
                    >
                        <EditProfile
                            toggleModal={this.toggleModalShow}
                            updateProfile={this.updateProfile}
                            edit={this.state.edit}
                            uploadImage={this.uploadImage}
                        />
                    </Modal>

                </div>
            </main>
        );
    }
}

export default ProfilePage;