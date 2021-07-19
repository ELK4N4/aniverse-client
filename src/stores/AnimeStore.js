import { runInAction, makeAutoObservable, toJS, makeObservable, action } from 'mobx';
import * as api from '../api';

class AnimeStore {
  rootStore = null;
  animes = [];
  filter = '';
  state = 'initial';
  errors = null

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  get filteredAnimes() {
    return this.animes.filter(( { name: { english } }) => 
      english.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())
    );
  }

  resetState() {
    this.state = 'initial';
  }

  setFilter(filter) {
    this.filter = filter;
  }

  async fetchAnimes() {
    this.rootStore.loading = true;
    this.state = 'pending';

    try {
      const { data } = await api.fetchAnimes();
      runInAction(() => {
        this.animes = data;
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

  async addAnime(newAnime) {
    this.rootStore.loading = true;
    this.state = 'pending';

    try {
      const { data } = await api.addAnime(newAnime);
      runInAction(() => {
        this.animes.push(data);
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

}

export default AnimeStore;