# Read me
## installation
### Start mongodb replicaset
### 1 with docker
use the docker compose to starte a local mongo server on port 27017 and an mongo express on 8081
```sh
$ docker-compose up
$ docker exec mongo /scripts/rs-init.sh
```
### 2 without docker
- Start mongodb as replicaset :  
Edit /etc/mongod.conf, find the line that reads #replication: towards the bottom of the file. It will look like this:
```conf
. . .
#replication:
. . . 
```
Uncomment this line by removing the pound sign (#). Then add a replSetName directive below this line followed by a name which MongoDB will use to identify the replica set:
```conf
. . .
replication:
  replSetName: "rs0"
. . .  
```
Restart the mongod server
```sh
$ sudo systemctl restart mongod
```
- connect to mongodb and initiate the replicaset
```sh
$ mongo
```
```mongo
mongo> rs.initiate()
```
Refferences :  
https://www.mongodb.com/docs/manual/tutorial/convert-standalone-to-replica-set/
https://www.mongodb.com/docs/manual/tutorial/deploy-replica-set/
https://www.digitalocean.com/community/tutorials/how-to-configure-a-mongodb-replica-set-on-ubuntu-20-04

## Create the database
- Step 1 : generete the database
```sh
$ npx prisma db push
```
- Step 2 : generate prisma model to node modules
```sh
$ npx prisma generate
```

# Start the app
```sh
$ npm run start:dev
```