module.exports = {
  apps: [
    {
      name: 'JCWD-2102-02-FE', // Format JCWD-{batchcode}-{groupnumber}
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3202, //format groupnumber and batch ex: 3401
      },
    },
  ],
};
