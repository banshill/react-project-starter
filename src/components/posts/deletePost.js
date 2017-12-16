import React from "react";

import Modal from "react-responsive-modal";

class DeletePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            modal: false
        };
    }

    bindEventHandlers() {
        this.deletePost = this.deletePost.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    deletePost() {
        this.props.deletePost(this.props.id);
    }

    toggleModal(event) {
        event.preventDefault();

        this.setState(prevState => {
            prevState.modal = !prevState.modal;
            return prevState;
        });
    }

    render() {
        const { modal } = this.state;

        return (
            <div>
                <i className="fa fa-trash deleteButton fa-lg" aria-hidden="true" onClick={this.toggleModal}></i>

                <Modal
                    open={modal}
                    onClose={this.toggleModal}
                    little
                    showCloseIcon={false}
                >

                    <div className="p-1">
                        <p>Are you sure you want to delete this post?</p>

                        <div className="float-right">
                            <button
                                onClick={this.deletePost}
                                className="btn buttonLight my-2 my-sm-0 mr-2"
                            >Yes
                            </button>

                            <button
                                onClick={this.toggleModal}
                                className="btn btn-outline-danger my-2 my-sm-0"
                            >No
                            </button>
                        </div>
                    </div>

                </Modal>
            </div>
        );
    }
}

export default DeletePost;