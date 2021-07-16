module.exports = {
  apps: [
    {
      name: "directus",
      script: "npm",
      args: "start",
      watch: true,
      node_args: "",
      merge_logs: true,
      cwd: process.env.HOME + "sites/directus",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
