import { BASE_URL } from "../../constants";
import { APIService } from "./serviceApi";
import ProfileDTO from "../models/profileDTO";

class ServiceData {
    constructor() { }

    getProfile(callback, errorCallback) {
        APIService.getFromAPI("/profile", response => {
            const { name, aboutShort, about, avatarUrl, postsCount, commentsCount } = response.data;
            const profile = new ProfileDTO(name, aboutShort, about, avatarUrl, postsCount, commentsCount);
            callback(profile);
        }, errorCallback);
    }
}

export const dataService = new ServiceData();