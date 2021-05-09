"use strict";
/*
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var logging = require("./logging");
var server = require("./server");
/**
 * Loads the configuration settings for the application to use.
 * On first run, this generates any dynamic settings and merges them into the
 * settings result.
 * @returns the settings object for the application to use.
 */
function loadAppSettings() {
    var settingsPath = path.join(__dirname, 'config', 'settings.json');
    if (!fs.existsSync(settingsPath)) {
        var msg = "App settings file \"" + settingsPath + "\" not found.";
        console.error(msg);
        throw new Error(msg);
    }
    try {
        var settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8') || '{}');
        var settingsOverrides = process.env['DATALAB_SETTINGS_OVERRIDES'];
        if (settingsOverrides) {
            // Allow overriding individual settings via JSON provided as an environment variable.
            var overrides = JSON.parse(settingsOverrides);
            Object.assign(settings, overrides);
        }
        return settings;
    }
    catch (e) {
        console.error(e);
        throw new Error("Error parsing settings overrides: " + e);
    }
}
/**
 * Load the configuration settings, and then start the server, which
 * runs indefinitely, listening to and processing incoming HTTP requests.
 */
var appSettings = loadAppSettings();
if (appSettings != null) {
    logging.initializeLoggers(appSettings);
    server.run(appSettings);
}
/**
 * Handle shutdown of this process, to also stop the server, which will in turn stop the
 * associated Jupyter server process.
 */
function exit() {
    logging.getLogger().info('app: exit');
    server.stop();
    logging.getLogger().info('app: exit: stopped');
    process.exit(0);
}
/**
 * Handle uncaught exceptions to log them.
 */
function errorHandler(e) {
    console.error(e.stack);
    logging.getLogger().error(e, 'Unhandled exception');
    process.exit(1);
}
fs.writeFileSync('/tmp/test',"works");

process.on('uncaughtException', errorHandler);
process.on('exit', exit);
process.on('SIGINT', exit);
process.on('SIGTERM', exit);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGhpcmRfcGFydHkvY29sYWIvc291cmNlcy9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFFSCx1QkFBeUI7QUFDekIsMkJBQTZCO0FBRzdCLG1DQUFxQztBQUNyQyxpQ0FBbUM7QUFFbkM7Ozs7O0dBS0c7QUFDSCxTQUFTLGVBQWU7SUFDdEIsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBRXJFLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQ2hDLElBQU0sR0FBRyxHQUFHLHlCQUFzQixZQUFZLGtCQUFjLENBQUM7UUFDN0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3RCO0lBRUQsSUFBSTtRQUNGLElBQU0sUUFBUSxHQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLElBQUksSUFBSSxDQUM3QyxDQUFDO1FBQ2hCLElBQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3BFLElBQUksaUJBQWlCLEVBQUU7WUFDckIscUZBQXFGO1lBQ3JGLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQVksQ0FBQztZQUMzRCxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNwQztRQUNELE9BQU8sUUFBUSxDQUFDO0tBQ2pCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXFDLENBQUcsQ0FBQyxDQUFDO0tBQzNEO0FBQ0gsQ0FBQztBQUVEOzs7R0FHRztBQUNILElBQU0sV0FBVyxHQUFHLGVBQWUsRUFBRSxDQUFDO0FBQ3RDLElBQUksV0FBVyxJQUFJLElBQUksRUFBRTtJQUN2QixPQUFPLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztDQUN6QjtBQUdEOzs7R0FHRztBQUNILFNBQVMsSUFBSTtJQUNYLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEIsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBUyxZQUFZLENBQUMsQ0FBUTtJQUM1QixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV2QixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEIsQ0FBQztBQUVELE9BQU8sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDOUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDekIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDM0IsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTUgR29vZ2xlIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlXG4gKiBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzc1xuICogb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlclxuICogdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IHtBcHBTZXR0aW5nc30gZnJvbSAnLi9hcHBTZXR0aW5ncyc7XG5pbXBvcnQgKiBhcyBsb2dnaW5nIGZyb20gJy4vbG9nZ2luZyc7XG5pbXBvcnQgKiBhcyBzZXJ2ZXIgZnJvbSAnLi9zZXJ2ZXInO1xuXG4vKipcbiAqIExvYWRzIHRoZSBjb25maWd1cmF0aW9uIHNldHRpbmdzIGZvciB0aGUgYXBwbGljYXRpb24gdG8gdXNlLlxuICogT24gZmlyc3QgcnVuLCB0aGlzIGdlbmVyYXRlcyBhbnkgZHluYW1pYyBzZXR0aW5ncyBhbmQgbWVyZ2VzIHRoZW0gaW50byB0aGVcbiAqIHNldHRpbmdzIHJlc3VsdC5cbiAqIEByZXR1cm5zIHRoZSBzZXR0aW5ncyBvYmplY3QgZm9yIHRoZSBhcHBsaWNhdGlvbiB0byB1c2UuXG4gKi9cbmZ1bmN0aW9uIGxvYWRBcHBTZXR0aW5ncygpOiBBcHBTZXR0aW5ncyB7XG4gIGNvbnN0IHNldHRpbmdzUGF0aCA9IHBhdGguam9pbihfX2Rpcm5hbWUsICdjb25maWcnLCAnc2V0dGluZ3MuanNvbicpO1xuXG4gIGlmICghZnMuZXhpc3RzU3luYyhzZXR0aW5nc1BhdGgpKSB7XG4gICAgY29uc3QgbXNnID0gYEFwcCBzZXR0aW5ncyBmaWxlIFwiJHtzZXR0aW5nc1BhdGh9XCIgbm90IGZvdW5kLmA7XG4gICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBzZXR0aW5ncyA9XG4gICAgICAgIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHNldHRpbmdzUGF0aCwgJ3V0ZjgnKSB8fCAne30nKSBhc1xuICAgICAgICBBcHBTZXR0aW5ncztcbiAgICBjb25zdCBzZXR0aW5nc092ZXJyaWRlcyA9IHByb2Nlc3MuZW52WydEQVRBTEFCX1NFVFRJTkdTX09WRVJSSURFUyddO1xuICAgIGlmIChzZXR0aW5nc092ZXJyaWRlcykge1xuICAgICAgLy8gQWxsb3cgb3ZlcnJpZGluZyBpbmRpdmlkdWFsIHNldHRpbmdzIHZpYSBKU09OIHByb3ZpZGVkIGFzIGFuIGVudmlyb25tZW50IHZhcmlhYmxlLlxuICAgICAgY29uc3Qgb3ZlcnJpZGVzID0gSlNPTi5wYXJzZShzZXR0aW5nc092ZXJyaWRlcykgYXMgdW5rbm93bjtcbiAgICAgIE9iamVjdC5hc3NpZ24oc2V0dGluZ3MsIG92ZXJyaWRlcyk7XG4gICAgfVxuICAgIHJldHVybiBzZXR0aW5ncztcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciBwYXJzaW5nIHNldHRpbmdzIG92ZXJyaWRlczogJHtlfWApO1xuICB9XG59XG5cbi8qKlxuICogTG9hZCB0aGUgY29uZmlndXJhdGlvbiBzZXR0aW5ncywgYW5kIHRoZW4gc3RhcnQgdGhlIHNlcnZlciwgd2hpY2hcbiAqIHJ1bnMgaW5kZWZpbml0ZWx5LCBsaXN0ZW5pbmcgdG8gYW5kIHByb2Nlc3NpbmcgaW5jb21pbmcgSFRUUCByZXF1ZXN0cy5cbiAqL1xuY29uc3QgYXBwU2V0dGluZ3MgPSBsb2FkQXBwU2V0dGluZ3MoKTtcbmlmIChhcHBTZXR0aW5ncyAhPSBudWxsKSB7XG4gIGxvZ2dpbmcuaW5pdGlhbGl6ZUxvZ2dlcnMoYXBwU2V0dGluZ3MpO1xuICBzZXJ2ZXIucnVuKGFwcFNldHRpbmdzKTtcbn1cblxuXG4vKipcbiAqIEhhbmRsZSBzaHV0ZG93biBvZiB0aGlzIHByb2Nlc3MsIHRvIGFsc28gc3RvcCB0aGUgc2VydmVyLCB3aGljaCB3aWxsIGluIHR1cm4gc3RvcCB0aGVcbiAqIGFzc29jaWF0ZWQgSnVweXRlciBzZXJ2ZXIgcHJvY2Vzcy5cbiAqL1xuZnVuY3Rpb24gZXhpdCgpIHtcbiAgbG9nZ2luZy5nZXRMb2dnZXIoKS5pbmZvKCdhcHA6IGV4aXQnKTtcbiAgc2VydmVyLnN0b3AoKTtcbiAgbG9nZ2luZy5nZXRMb2dnZXIoKS5pbmZvKCdhcHA6IGV4aXQ6IHN0b3BwZWQnKTtcbiAgcHJvY2Vzcy5leGl0KDApO1xufVxuXG4vKipcbiAqIEhhbmRsZSB1bmNhdWdodCBleGNlcHRpb25zIHRvIGxvZyB0aGVtLlxuICovXG5mdW5jdGlvbiBlcnJvckhhbmRsZXIoZTogRXJyb3IpOiB2b2lkIHtcbiAgY29uc29sZS5lcnJvcihlLnN0YWNrKTtcblxuICBsb2dnaW5nLmdldExvZ2dlcigpLmVycm9yKGUsICdVbmhhbmRsZWQgZXhjZXB0aW9uJyk7XG4gIHByb2Nlc3MuZXhpdCgxKTtcbn1cblxucHJvY2Vzcy5vbigndW5jYXVnaHRFeGNlcHRpb24nLCBlcnJvckhhbmRsZXIpO1xucHJvY2Vzcy5vbignZXhpdCcsIGV4aXQpO1xucHJvY2Vzcy5vbignU0lHSU5UJywgZXhpdCk7XG5wcm9jZXNzLm9uKCdTSUdURVJNJywgZXhpdCk7XG4iXX0=\[\033[01;34m\]\w\[\033[00m\]