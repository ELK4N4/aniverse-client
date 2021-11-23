import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../localStorage';
import * as api from '../api';
import errorMessage from '../errorMessage';

class UserStore {
  rootStore = null;
  user = null;
  state = 'initial';
  errors = null;

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;

    this.checkCache();
  }

  checkCache() {
    this.fetchCurrentUser();
    const user = getLocalStorage('user');
    if (user) {
      runInAction(() => {
        this.user = user;
      });
    }
  }

  resetState() { 
    this.state = 'initial';
  }

  setProfile(user) {
    this.user = user;
    setLocalStorage('user', user);
  };

  login = async (formData, onSuccess, onError) => {
    runInAction(() => {
      this.rootStore.loading = true;
      this.state = 'pending';
    });

    try {
      const { data } = await api.login(formData);
      this.setProfile(data);
      runInAction(() => {
        this.state = 'done';
        onSuccess();
      });
    } catch (err) {
      console.error(err.response);
      runInAction(() => {
        this.errors = errorMessage(err);
        this.state = 'error';
        onError(this.errors);
      });
    } finally {
      runInAction(() => {
        this.rootStore.loading = false;
      });
    }
  };

  register = async (formData, onSuccess, onError) => {
    runInAction(() => {
      this.rootStore.loading = true;
      this.state = 'pending';
    });

    try {
      const { data } = await api.register(formData);
      runInAction(() => {
        this.state = 'done';
        onSuccess();
      });
    } catch (err) {
      console.error(err.response);
      runInAction(() => {
        this.errors = errorMessage(err);
        this.state = 'error';
        onError(this.errors);
      });
    } finally {
      runInAction(() => {
        this.rootStore.loading = false;
      });
    }
  };

  updateCurrentUser = async (formData, onSuccess, onError) => {
    runInAction(() => {
      this.rootStore.loading = true;
      this.state = 'pending';
    });

    try {
      const { data } = await api.updateCurrentUser(formData);
      this.setProfile({...this.user, user: data});
      runInAction(() => {
        this.state = 'done';
        onSuccess();
      });
    } catch (err) {
      console.error(err.response);
      runInAction(() => {
        this.errors = errorMessage(err);
        this.state = 'error';
        onError(this.errors);
      });
    } finally {
      runInAction(() => {
        this.rootStore.loading = false;
      });
    }
  };

  fetchCurrentUser = async () => {
    const user = getLocalStorage('user');
    if (!user) {
      return;
    }

    runInAction(() => {
      this.rootStore.loading = true;
      this.state = 'pending';
    });

    try {
      const { data } = await api.fetchCurrentUser();
      this.setProfile({...this.user, user: data});
      runInAction(() => {
        this.state = 'done';
      });
    } catch (err) {

      runInAction(() => {
        if(err.message !== "Network Error") {
          this.logout();
        }
        this.errors = err;
        this.state = 'error';
      });
    } finally {
      runInAction(() => {
        this.rootStore.loading = false;
      });
    }
  }

  logout() {
    removeLocalStorage('user');
    this.user = null;
  }

  followFansub(fansubId) {
    this.user.user.followingFansubs.push(fansubId);
  }

  unfollowFansub(fansubId) {
    this.user.user.followingFansubs = this.user.user.followingFansubs.filter((fansub) => fansub !== fansubId);
  }
}

export default UserStore;