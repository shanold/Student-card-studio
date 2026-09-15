import { defineConfig } from 'vite';

// Docker/local builds are served from /. GitHub Pages project sites are
// served from /<repository-name>/, so derive that automatically in Actions.
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true';
const isUserOrOrgPagesRepo = repository.toLowerCase().endsWith('.github.io');

const base = isGitHubPagesBuild && repository && !isUserOrOrgPagesRepo
  ? `/${repository}/`
  : '/';

export default defineConfig({ base });
