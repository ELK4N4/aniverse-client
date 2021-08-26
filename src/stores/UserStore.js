import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../localStorage';
import * as api from '../api';

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

  login = async (formData) => {
    runInAction(() => {
      this.rootStore.loading = true;
      this.state = 'pending';
    });

    try {
      const { data } = await api.login(formData);
      this.setProfile(data);
      runInAction(() => {
        this.state = 'done';
      });
    } catch (err) {
      console.error(err.response);
      runInAction(() => {
        this.errors = err;
        this.state = 'error';
      });
    } finally {
      runInAction(() => {
        this.rootStore.loading = false;
      });
    }
  };

  register = async (formData) => {
    runInAction(() => {
      this.rootStore.loading = true;
      this.state = 'pending';
    });

    try {
      const { data } = await api.register(formData);
      this.setProfile(data);
      runInAction(() => {
        this.state = 'done';
      });
    } catch (err) {
      console.error(err.response);
      runInAction(() => {
        this.errors = err;
        this.state = 'error';
      });
    } finally {
      runInAction(() => {
        this.rootStore.loading = false;
      });
    }
  };

  updateData = async (formData) => {
    runInAction(() => {
      this.rootStore.loading = true;
      this.state = 'pending';
    });

    try {
      const { data } = await api.fetchCurrentUser();
      this.setProfile(data);
      runInAction(() => {
        this.state = 'done';
      });
    } catch (err) {
      console.error(err.response);
      runInAction(() => {
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

}

export default UserStore;