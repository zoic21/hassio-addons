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
                "presetConfig": {
                    "types": [
                        {"type": "feat", "section": "Features", "hidden": false},
                        {"type": "fix", "section": "Bug Fixes", "hidden": false},
                        {"type": "chore", "section": "Maintenance", "hidden": false}
                    ]
                },
                "writerOpts": {
                    "commitsSort": ["subject", "scope"],
                    "commitGroupsSort": ["Features", "Bug Fixes", "Maintenance"],
                    "noteGroupsSort": ["BREAKING CHANGE", "UPDATES", "FIXES"],
                    "mainTemplate": "{{> header}}\n\n{{#each commitGroups}}\n\n### {{title}}\n\n{{#each commits}}\n* {{#if scope}}**{{scope}}:** {{/if}}{{subject}} ([{{shortHash}}]({{@root.host}}/{{@root.owner}}/{{@root.repository}}/commit/{{hash}}))\n{{~#if body}}\n{{#each (split body \"\n\")}}\n    * {{this}}\n{{/each}}\n{{~/if}}\n{{/each}}\n{{/each}}\n\n{{> footer}}",
                    "headerPartial": "# {{version}}\n\n{{#if date}}## {{date}}{{/if}}\n",
                    "footerPartial": ""
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