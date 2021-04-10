# apm-analysis-microapp-3
New version of Analysis Microapp using angular10.

## Running app on local:
1. Clone the repository: 
```
git clone https://github.build.ge.com/PAE-Analysis/apm-analysis-microapp-3
```
2. Install all dependencies:

  Node modules
```
yarn install
```
  Bower components
```
bower install
```
3. Build app by executing command
```
yarn run build
```
OR build in watch mode
```
yarn run build:watch
```

4. Run app by executing 
```
./start_local_server.sh {SPACE}`
```

where SPACE can be any of the following `qa, rc, unified, perf, patch`.

5. If you need to point to a particular tenant in a SPACE, then you need to change tenant id in `localconfig.json.{SPACE}` file.  
All tenant details are mentioned in `tenantDetails` file in `local_dev_setup` folder.

 ### NOTE:
 Currently, tenant and user infomation is hardcoded in API calls. 
 To make application work, start server pointing to QA env and use this user credentials to login ``` analysis-v3-test/P@55wOrd ```
