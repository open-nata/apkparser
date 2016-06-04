import path from 'path'
import fs from 'fs'
import os from 'os'
import xmldom from 'xmldom'
import { exec } from 'child_process'
import Manifest from './Manifest.js'
import _ from 'lodash'

const apktoolPath = path.join(__dirname, '../assets/apktool.jar')

const parser = new xmldom.DOMParser({
  locator: {},
  errorHandler: {
    warning(w) {
      console.warn(w)
    },
  },
})

/**
 * Static
 * run shell command and get the output
 * @param  {String} cmd to run
 * @return {Promise} stdout || stderr
 */
function shell(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) reject(err)
      else resolve(stdout || stderr)
    })
  })
}


function parseDoc(doc) {
  const manifest = new Manifest()
  // packageName
  const manifestNode = doc.getElementsByTagName('manifest')[0]
  manifest.packageName = manifestNode.getAttribute('package')

  // permissions
  const permissionsNodes = doc.getElementsByTagName('uses-permission')
  _.forEach(permissionsNodes, permissionsNode => {
    manifest.addPermission(permissionsNode.getAttribute('android:name'))
  })

  // activities and main activity
  const applicationNode = doc.getElementsByTagName('application')[0]

  const activitiesNodes = applicationNode.getElementsByTagName('activity')
  _.forEach(activitiesNodes, activityNode => {
    const activityName = activityNode.getAttribute('android:name')


    if (activityNode.hasChildNodes()) {
      const actions = activityNode.getElementsByTagName('action')
      _.forEach(actions, node => {
        if (node.nodeName === 'action' &&
          node.getAttribute('android:name') === 'android.intent.action.MAIN') {
          manifest.entry = activityName
        }
      })
    }
    manifest.addActivity(activityName)
  })

  const receiversNodes = applicationNode.getElementsByTagName('receiver')
  _.forEach(receiversNodes, receiverNode => {
    manifest.addReceiver(receiverNode.getAttribute('android:name'))
  })

  return manifest
}

/**
 * parse the xml file using xmldom
 * @param  {String} target the local path of dumpfile.xml
 * @return {Promise}  the document instance of the dumpfile.xml
 */
function parseManifest(target) {
  return new Promise((resolve, reject) => {
    fs.readFile(target, (err, data) => {
      if (err) reject(err)
      const doc = parser.parseFromString(data.toString(), 'application/xml')
      resolve(doc)
    })
  })
}


/**
 * parse apk and return manifest
 * @param  {String} apkPath apk path
 * @param  {String} target target extract dir, default to ${os.tmpdir()}/apktoolDecodes
 * @return {Promise} resolve manifest
 */
async function parse(apkPath, target = `${os.tmpdir()}/apktoolDecodes`) {
  const cmd = `java -jar ${apktoolPath} d ${apkPath} -f -o ${target}`
  await shell(cmd)
  const MainfestFilePath = `${target}/AndroidManifest.xml`
  const doc = await parseManifest(MainfestFilePath)
  return parseDoc(doc)
}

/**
 * parse AndroidManifest.xml
 * @param  {String} MainfestFilePath path to AndroidManifest.xml
 * @return {Promise} resovle manifest
 */
async function parseXML(MainfestFilePath) {
  const doc = await parseManifest(MainfestFilePath)
  return parseDoc(doc)
}

export default {
  parse,
  parseXML,
}