/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
    "tagFormat": "v${version}",
    "branches": [
        "main"
    ],
    "plugins": [
        "@semantic-release/commit-analyzer",
        [
            "@semantic-release/release-notes-generator",
            {
                "preset": "conventionalcommits",
                "writerOpts": {
                    "commitPartial": require('fs').readFileSync('.github/changelog-template.hbs', 'utf-8'),
                    "finalizeContext": (context) => {
                        for (const commitGroup of context.commitGroups) {
                            for (const commit of commitGroup.commits) {
                                commit.bodyLines = commit.body?.split('\n').filter((line) => line !== '') ?? [];
                            }
                        }
                        return context;
                    }
                },
                "presetConfig": {
                    "types": [
                        {"type": "feat", "section": "Features", "hidden": false},
                        {"type": "fix", "section": "Bug Fixes", "hidden": false},
                        {"type": "chore", "section": "Maintenance", "hidden": false}
                    ]
                }
            }
        ],
        [
            "@semantic-release/changelog",
            {
                "changelogFile": "open-webui/CHANGELOG.md",
                "changelogTitle": "# Changelog"
            }
        ],
        [
            "@semantic-release/git",
            {
                "assets": [
                    "open-webui/CHANGELOG.md"
                ],
                "message": "chore(release): ${nextRelease.version}\n\n${nextRelease.notes}"
            }
        ],
        "@semantic-release/github"
    ]
}; 