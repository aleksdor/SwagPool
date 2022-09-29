const express = require('express')
const router = require('express').Router()

router.use('/', express.static(__dirname + '/ui/'))

module.exports = router