# Overview
Fantasy football web application, initially targeted at PAC-12 NCAAF.

# Technologies
* Flask
* Lodash
* React
* Redux/React-Redux
* Socket.io
* Webpack

# Set up dev environment
```
./init.sh
```

# Resources
* https://flask-socketio.readthedocs.org/en/latest/

# Server Development Setup
Create a [Python Virtual Environment](https://virtualenv.readthedocs.org/en/latest/)
```
cd server/
virtualenv venv
```

Activate the Virtual Environment and Install Requirements
```
source venv/bin/activate
pip install -r requirements.txt
```

Build the Develment Database
```
python manage.py db_rebuild
```

Start the development server.
```
python manage.py runserver
```

Test the service using HTTPie.
```
# command for authenticated api requests using HTTPie
http --json --auth <email>:<password> GET <api_endpoint>

# get request for authentication token
http --json --auth salim@gmail.com:password GET http://127.0.0.1:5000/api/token
http --json --auth alex@gmail.com:password GET http://127.0.0.1:5000/api/token

# get request for fantasy leagues
http --json --auth salim@gmail.com:password GET http://127.0.0.1:5000/api/fantasy_leagues/
http --json --auth alex@gmail.com:password GET http://127.0.0.1:5000/api/fantasy_leagues/
```

(Optional) Launch the Python Shell with Database Context for debugging
```
python manage.py shell
```

# Working on the client
While working on the client, it is helpful to view the page and get canned responses from the server. In order to set up a simple dev server and view your progress, follow these instructions (requires node and npm installed on your machine, http://blog.teamtreehouse.com/install-node-js-npm-mac):

One time setup: `./init.sh`

```
cd client
npm start
```
Navigate to http://localhost:4000. Note that any changes to the js app code will be picked up if you refresh the page in your browser. Any changes to devServer.js will require a server restart.

# Client tests

One time setup: `./init.sh`

```
cd client
npm test
```
