# Swiss Tchoukball CMS

The CMS of Swiss Tchoukball is using [Directus](https://directus.io).

Production is on [cms.tchoukball.ch](https://cms.tchoukball.ch)

Staging is on [staging.cms.tchoukball.ch](https://staging.cms.tchoukball.ch)

## Setup

Production and staging are hosted on an Infomaniak Managed Cloud Server.

Deployment is currently **not** automated.

To update the deployment, one has to SSH on the server and pull the latest version from origin.

### pm2 setup

Based on [Infomaniak documentation](https://www.infomaniak.com/fr/support/faq/2201/serveur-cloud-application-nodejs-fonctionnement-permanent).

[pm2 CLI doc](https://pm2.io/docs/runtime/reference/pm2-cli/)

To show the list of active crons: `crontab -l`.

## Development

After having cloned the repository:

- `npm install`
- Duplicate `.env.example` into `.env` and provide a value for the `SECRET` env variable (this only needs to be done the first time)
- `docker compose up` (to start the DB)
- Dump the production DB and import it to your local DB (this only needs to be done the first time, or if you want to get up to date schema or data)
- Copy the content of the `uploads` folder locally (this only needs to be done the first time, or if you want to get up to date uploaded files)
- `npm start`

## Dump production DB into staging DB

1. Make sure that both staging and production DB are on the same version of Directus
2. Backup the staging DB
3. TODO: instructions to dump production DB
4. TODO: instructions to restore staging DB from production DB dump

Possible references to come up with step 3 and 4.

- https://phoenixnap.com/kb/how-to-backup-restore-a-mysql-database
- https://dba.stackexchange.com/questions/8869/restore-mysql-database-with-different-name

TODO: Set up a Github Action to automate this.

## Updating Directus or other dependencies

This implies a downtime of Directus, and thus, of the website.

TODO: Set up a maintenance page on the frontend that can be used when updating the CMS.

1. Do a backup of the `sites/directus/` (including `node_modules`)

2. Disabled the cron so that it doesn't interfere with the update
   - Open the crontab config with `crontab -e`
   - Comment the line for the cron handling Directus
   - Save changes
3. Stop directus with `pm2 stop directus`

4. Apply the dependencies update
   - In production or staging, this should be done by pulling the latest state of `main` (as the update should have been tested first locally), and running `npm ci`.
   - If upgrading Directus: [Directus - upgrading a project](https://docs.directus.io/self-hosted/upgrades-migrations.html#upgrading-updating-a-project)
5. Restart directus with `pm2 restart directus`

6. Re-enable the cron
   - Open the crontab config with `crontab -e`
   - Uncomment the line for the cron handling Directus
   - Save changes

TODO: Automate the whole thing

## Troubleshooting

#### `pm2 list` returns an empty list

And a message saying `Current process list running is not in sync with saved list`

Running `pm2 update` should solve the issue.
