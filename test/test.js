import Parser from '../'
import assert from 'assert'
import path from 'path'
import os from 'os'

describe('testing apkparser', () => {
  const apkPath = path.join(__dirname, '../assets/app.apk')
  const target = `${os.tmpdir()}/apktoolDecodes`
  const MainfestFilePath = `${target}/AndroidManifest.xml`

  it('should return manifest by parse ', async done => {
    const manifest = await Parser.parse(apkPath)
    assert.notEqual(manifest.activities.length, 0)
    assert.notEqual(manifest.receivers.length, 0)
    assert.notEqual(manifest.permissions.length, 0)
    assert.equal('org.jtb.alogcat',manifest.packageName)
    assert.equal('org.jtb.alogcat.LogActivity', manifest.entry)
    done()
  })

  it('should return manifest by parseXML', async done => {
    const manifest = await Parser.parseXML(MainfestFilePath)
    assert.notEqual(manifest.activities.length, 0)
    assert.notEqual(manifest.receivers.length, 0)
    assert.notEqual(manifest.permissions.length, 0)
    assert.equal('org.jtb.alogcat', manifest.packageName)
    assert.equal('org.jtb.alogcat.LogActivity', manifest.entry)
    done()
  })
})