import React from "react";

class FilterPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            filterTitle: "All Posts"
        };
    }

    bindEventHandlers() {
        this.filterPosts = this.filterPosts.bind(this);
    }

    filterPosts(event) {
        event.preventDefault();

        const type = event.target.value;

        this.props.filter(type);

        this.setState({ filterTitle: type });
    }

    render() {
        const { filterTitle } = this.state;

        return (
            <div className="btn-group mt-3">
                <button
                    type="button"
                    className="btn buttonDark">
                    {filterTitle}
                </button>

                <button
                    type="button"
                    className="btn buttonDark dropdown-toggle dropdown-toggle-split"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                </button>

                <div className="dropdown-menu dropdown-menu-right">
                    <button
                        className="dropdown-item"
                        value="All Posts"
                        onClick={this.filterPosts}>
                        All Posts
                    </button>

                    <div className="dropdown-divider"></div>

                    <button
                        className="dropdown-item"
                        value="Videos"
                        onClick={this.filterPosts}>
                        Videos
                    </button>

                    <button
                        className="dropdown-item"
                        value="Images"
                        onClick={this.filterPosts}>
                        Images
                    </button>

                    <button
                        className="dropdown-item"
                        value="Text"
                        onClick={this.filterPosts}>
                        Text
                    </button>
                </div>
            </div>
        );
    }
}

export default FilterPosts;