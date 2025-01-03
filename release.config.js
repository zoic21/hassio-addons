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
                "preset": "angular",
                "writerOpts": {
                    "transform": (commit) => {
                        const updatedCommit = { ...commit };
                        if (updatedCommit.body) {
                            const lines = updatedCommit.body
                                .split('\n')
                                .map(line => line.trim())
                                .filter(Boolean);
                            updatedCommit.bodyLines = lines;
                        }
                        return updatedCommit;
                    },
                    "commitsSort": ["subject", "scope"],
                    "commitGroupsSort": ["Features", "Bug Fixes", "Maintenance"],
                    "noteGroupsSort": ["BREAKING CHANGE", "UPDATES", "FIXES"],
                    "mainTemplate": "{{> header}}\n\n{{#each commitGroups}}\n\n### {{title}}\n\n{{#each commits}}\n* {{#if scope}}**{{scope}}:** {{/if}}{{subject}} ([{{shortHash}}]({{@root.host}}/{{@root.owner}}/{{@root.repository}}/commit/{{hash}}))\n{{~#if bodyLines}}\n{{#each bodyLines}}\n    * {{this}}\n{{/each}}\n{{~/if}}\n{{/each}}\n{{/each}}\n\n{{> footer}}",
                    "headerPartial": "# {{version}}\n",
                    "footerPartial": ""
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