const fs = require("fs")
const express = require("express")
const pms = express()
const port = 7208

const packageDir  = "./package/archived/"
const manifestDir = "./package/manifest/"

pms.get("/index", (req, res) => {
    packages = fs.readdirSync(packageDir)
    packages.forEach((pkgname, idx) => {
        packages[idx] = pkgname.replace(".zip", "")
    });
    res.json(packages)
})

pms.get("/packageinfo/:package", (req, res) => {
    info = fs.readFileSync(`${manifestDir}${req.params["package"]}.json`)
    res.json(JSON.parse(info))
})

pms.get("/downloadpackage/:package", (req, res) => {
    res.sendFile(packageDir + `${req.params["package"]}.zip`)
})

pms.listen(port, () => {
    console.log(`jspms started on ${port}`)
})