import { runInAction, makeAutoObservable, toJS, makeObservable, action } from 'mobx';
import * as api from '../api';
import errorMessage from '../errorMessage';

class FansubStore {
  rootStore = null;
  fansub = {};
  members = [];
  projects = [];
  state = 'initial';
  errors = null;

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  resetState() {
    this.state = 'initial';
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

  async addMember(username, onSuccess, onError) {
    this.rootStore.loading = true;
    this.state = 'pending';

    try {
      const { data } = await api.addMember(this.fansub._id, username);
      runInAction(() => {
        this.members.push(data);
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
  }

  async removeMember(userId, onSuccess, onError) {
    this.rootStore.loading = true;
    this.state = 'pending';

    try {
      const { data } = await api.removeMember(this.fansub._id, userId);
      runInAction(() => {
        this.members = this.members.filter((member) => member.user._id !== userId);
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
  }

  async fetchFansubProjects() {
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
  
  async addProject(newProject, onSuccess, onError) {
    this.rootStore.loading = true;
    this.state = 'pending';

    try {
      const { data } = await api.addProject(this.fansub._id, newProject);
      runInAction(() => {
        this.projects.push(data);
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
  }

  async deleteProject(projectId, onSuccess, onError) {
    this.rootStore.loading = true;
    this.state = 'pending';

    try {
      const { data } = await api.deleteProject(this.fansub._id, projectId);
      runInAction(() => {
        this.projects = this.projects.filter((project) => project._id !== projectId);
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
  }

  async updateProjectStatus(projectId, updatedStatus, onSuccess, onError) {
    this.rootStore.loading = true;
    this.state = 'pending';
    try {
      const { data } = await api.updateProjectStatus(this.fansub._id, projectId, {status: updatedStatus});
      runInAction(() => {
        const index = this.projects.findIndex((project) => project._id === projectId);
        this.projects[index] = data;
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
  }

  async updateFansub(updatedFansub, onSuccess, onError) {
    this.rootStore.loading = true;
    this.state = 'pending';

    try {
      const { data } = await api.updateFansub(this.fansub._id, updatedFansub);
      runInAction(() => {
        this.fansub = data;
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
  }

  async followFansub(onSuccess, onError) {
    this.rootStore.loading = true;
    this.state = 'pending';

    try {
      const { data } = await api.followFansub(this.fansub._id);
      runInAction(() => {
        this.fansub.followers++;
        this.rootStore.userStore.followFansub(this.fansub._id);
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
  }

  async unfollowFansub(onSuccess, onError) {
    this.rootStore.loading = true;
    this.state = 'pending';

    try {
      const { data } = await api.unfollowFansub(this.fansub._id);
      runInAction(() => {
        this.fansub.followers--;
        this.rootStore.userStore.unfollowFansub(this.fansub._id);
        this.state = 'done';
        onSuccess()
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
  }

  get fansubAnimes() {
    const animes = [];
    this.projects.forEach(project => {
      animes.push(project.anime);
    })
    return animes;
  }

  get followers() {
    return this.fansub.followers;
  }

  fansubAnimesByStatus(status) {
    const animes = [];
    this.projects.forEach(project => {
      if(status === 'הכל' || project.status === status) {
        animes.push(project.anime);
      }
    })
    return animes;
  }

  updateMember(userId, updatedMember) {
    const memberIndex = this.members.findIndex((member) => member.user._id === userId);
    const helper = [...this.members];
    helper[memberIndex] = updatedMember;
    runInAction(() => {
      this.members = helper;
    });
  }

  get currentMember() {
    const currentUser = this.rootStore.userStore.user.user;
    return this.members.find((member) => member.user._id === currentUser._id);
  }

}

export default FansubStore;