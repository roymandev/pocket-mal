/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ['main', 'test/configure-semantic-release'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: false,
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
