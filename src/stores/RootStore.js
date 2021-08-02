import { makeAutoObservable, runInAction } from 'mobx';
import { setLocalStorage, getLocalStorage } from '../localStorage';
import AnimeStore from './AnimeStore';
import FansubStore from './FansubStore';
import userStore from './UserStore';
import { SnackbarProvider, useSnackbar } from 'notistack'

class RootStore {
    loading = false;

    constructor() {
        makeAutoObservable(this);
        this.userStore = new userStore(this);
        this.animeStore = new AnimeStore(this);
        this.fansubStore = new FansubStore(this);
        this.checkCache();
    }

    checkCache() {
        
    }

    startLoading() {
        this.loading = true;
    }

    stopLoading() {
        this.loading = false;
    }

}

export default RootStore;