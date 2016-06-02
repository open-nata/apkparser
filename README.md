<p align="center"><a href="http://mclspace.com" target="_blank"><img width="400" src="http://7pun7p.com1.z0.glb.clouddn.com/image/nata-banner.png"></a></p>
<p align="center">
    <a href="https://travis-ci.org/open-nata/apkparser/branches"><img src="https://img.shields.io/travis/open-nata/apkparser.svg" alt="Build Status"></a>
</p>


Apkparser
=========
Apkparser is a tool to parse android apk file, specifically we leverage [apktool](https://ibotpeaches.github.io/Apktool/) as our parser and extract useful infomations from it.

```
console.log(manifest.permissions)
console.log(manifest.activities)
console.log(manifest.receivers)
console.log(manifest.packageName)
console.log(manifest.entry)

// outputs:

[ 'android.permission.READ_LOGS',
  'android.permission.WRITE_EXTERNAL_STORAGE',
  'android.permission.WAKE_LOCK',
  'android.permission.WRITE_EXTERNAL_STORAGE' ]
[ 'org.jtb.alogcat.LogActivity',
  'org.jtb.alogcat.PrefsActivity',
  'org.jtb.alogcat.EmmaInstrument.InstrumentedActivity' ]
[ 'org.jtb.alogcat.SaveReceiver',
  'org.jtb.alogcat.ShareReceiver',
  'org.jtb.alogcat.EmmaInstrument.SMSInstrumentedReceiver' ]
org.jtb.alogcat
org.jtb.alogcat.LogActivity
```

# Requirements
- Java 1.7
- Node 4.4

# Example 
```
import apkparser from 'apkparser'
const apkPath = 'path/to/apk'

Parser.parse(apkPath).then((manifest) => {
  console.log(manifest.permissions)
})

```

# API
### parseXML(MainfestFilePath) 
 * parse AndroidManifest.xml
 * @param  {String} MainfestFilePath path to AndroidManifest.xml
 * @return {Promise} resovle manifest,see below

### parseXML(MainfestFilePath)
 * parse AndroidManifest.xml
 * @param  {String} MainfestFilePath path to AndroidManifest.xml
 * @return {Promise} resovle manifest,see below

### Manifest
- receivers
- activities
- permissions
- entry
- packageName
