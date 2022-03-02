import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../localStorage';
import * as api from '../api';
import errorMessage from '../errorMessage';
import { setSessionStorage, getSessionStorage, removeSessionStorage } from '../sessionStorage';

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
    if (getLocalStorage('user')) {
      runInAction(() => {
        this.user = getLocalStorage('user');
      });
    } else if(getSessionStorage('user')) {
      runInAction(() => {
        this.user = getSessionStorage('user');
      });
    }
  }

  resetState() { 
    this.state = 'initial';
  }

  setProfile(user, rememberMe) {
    this.user = user;
    if(rememberMe) {
      setLocalStorage('user', user);
    } else {
      setSessionStorage('user', user);
    }
  };

  login = async (formData, rememberMe, onSuccess, onError) => {
    runInAction(() => {
      this.rootStore.loading = true;
      this.state = 'pending';
    });

    try {
      const { data } = await api.login(formData);
      this.setProfile(data, rememberMe);
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
    let user = getLocalStorage('user');
    if (!user) {
      if(getSessionStorage('user')) {
        user = getSessionStorage('user');
      }
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