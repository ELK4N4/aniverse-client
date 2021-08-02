import { runInAction, makeAutoObservable, toJS, makeObservable, action } from 'mobx';
import * as api from '../api';

class FansubStore {
  rootStore = null;
  fansub = {};
  members = [];
  projects = [];
  state = 'initial';
  errors = null

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  async fetchFansub(fansubId) {
    this.rootStore.loading = true;
    this.state = 'pending';

    try {
      const fansubData = await api.fetchFansub(fansubId);
      const membersData = await api.fetchFansubMembers(fansubId);
      const projectsData = await api.fetchFansubProjects(fansubId);
      runInAction(() => {
        this.fansub = fansubData.data;
        this.members = membersData.data;
        this.projects = projectsData.data;
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

  async fetchFansubMembers(fansubId) {
    this.rootStore.loading = true;
    this.state = 'pending';

    try {
      const { data } = await api.fetchFansubMembers(fansubId);
      runInAction(() => {
        this.members = data;
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

  async addMember(username) {
    this.rootStore.loading = true;
    this.state = 'pending';

    try {
      const { data } = await api.addMember(this.fansub._id, username);
      runInAction(() => {
        this.members.push(data);
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

  async removeMember(userId) {
    this.rootStore.loading = true;
    this.state = 'pending';

    try {
      const { data } = await api.removeMember(this.fansub._id, userId);
      runInAction(() => {
        this.members = this.members.filter((member) => member.user._id !== userId);
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

  async fetchFansubProjects(userId) {
    this.rootStore.loading = true;
    this.state = 'pending';

    try {
      const { data } = await api.fetchFansubProjects(this.fansub._id);
      runInAction(() => {
        this.projects = data;
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

  async fetchFansubProjects(userId) {
    this.rootStore.loading = true;
    this.state = 'pending';

    try {
      const { data } = await api.fetchFansubProjects(this.fansub._id);
      runInAction(() => {
        this.projects = data;
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

  async addProject(newProject) {
    this.rootStore.loading = true;
    this.state = 'pending';

    try {
      const { data } = await api.addProject(this.fansub._id, newProject);
      runInAction(() => {
        this.projects.push(data);
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

  async deleteProject(projectId) {
    this.rootStore.loading = true;
    this.state = 'pending';

    try {
      const { data } = await api.deleteProject(this.fansub._id, projectId);
      runInAction(() => {
        this.projects = this.projects.filter((project) => project._id !== projectId);
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

  async updateFansub(updatedFansub) {
    this.rootStore.loading = true;
    this.state = 'pending';

    try {
      const { data } = await api.updateFansub(this.fansub._id, updatedFansub);
      runInAction(() => {
        this.fansub = data;
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

export default FansubStore;