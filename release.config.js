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
                    "commitsSort": ["subject", "scope"],
                    "includeDetails": true,
                    "commitGroupsSort": ["Features", "Bug Fixes", "Maintenance"],
                    "transform": (commit, context) => {
                        const updatedCommit = { ...commit };
                        
                        // Ensure date is a proper Date object
                        if (updatedCommit.date) {
                            updatedCommit.date = new Date(updatedCommit.date);
                        }
                        
                        // Handle body lines
                        if (updatedCommit.body) {
                            updatedCommit.bodyLines = updatedCommit.body
                                .split('\n')
                                .map(line => line.trim())
                                .filter(Boolean);
                        }
                        
                        return updatedCommit;
                    },
                    "commitPartial": "* {{#if scope}}**{{scope}}:** {{/if}}{{subject}} ([{{shortHash}}]({{@root.host}}/{{@root.owner}}/{{@root.repository}}/commit/{{hash}}))\n{{#if bodyLines}}\n{{#each bodyLines}}\n    * {{this}}\n{{/each}}\n{{/if}}\n{{#if footer}}\n    * {{footer}}\n{{/if}}"
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
                "changelogTitle": "# Changelog",
                "changelogReleaseCount": 5
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